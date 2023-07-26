<script setup>
import { ref, onMounted } from 'vue';
import feriados from '../data/feriados.json'
let time = ref('');
let dias = ref('');
let horas = ref('');
let minutos = ref('');
let segundos = ref('')

var queSeCelebra = ref('')
onMounted(() => {
  var rightNow = new Date()
  //console.log(rightNow)
  rightNow = new Date((rightNow.getMonth() + 1) + ' ' + rightNow.getDate() + ', ' + rightNow.getFullYear() + ' ' + +' ' + rightNow.getHours() + ":" + rightNow.getMinutes() + ":" + rightNow.getSeconds())
  // console.log(rightNow.getMonth())

  // console.log(feriados[rightNow.getMonth()])
  var esteMes = feriados[rightNow.getMonth()]
  var launchDate = null;
  var queSeCelebraAux;
  const getProximoFeriado = (start) => {


    for (var i = start; i < feriados.length; i++) {
      esteMes = feriados[i]
      console.log(esteMes)

      for (const date in esteMes) {
        //    console.log(date)
        /*    console.log(date)
            console.log(esteMes['mes'])
            console.log(mapMonth(esteMes['mes']) + ' VS ' +rightNow.getMonth())
            */
        if (mapMonth(esteMes['mes']) == rightNow.getMonth() && date > rightNow.getDate()) {
          launchDate = new Date(esteMes['mes'] + ' ' + date + ', ' + rightNow.getFullYear() + ' ' + +' ' + 0 + ":" + 0 + ":" + 0)
          //      console.log(launchDate)

          queSeCelebraAux = esteMes[date]
          //        console.log(rightNow)
          //         console.log(queSeCelebraAux)

          return { launchDate, queSeCelebraAux }
        }
        //   console.log(mapMonth(esteMes['mes']) + ' VS ' + rightNow.getMonth())
        if (mapMonth(esteMes['mes']) > rightNow.getMonth()) {
          //       console.log(esteMes['mes'] + ' ' + date + ', ' + rightNow.getFullYear() + ' ' + +' ' + 0 + ":" + 0 + ":" + 0)
          launchDate = new Date(esteMes['mes'] + ' ' + date + ', ' + rightNow.getFullYear() + ' ' + +' ' + 0 + ":" + 0 + ":" + 0)
          console.log(date)
          //       console.log(launchDate)
          queSeCelebraAux = esteMes[date]
          //        console.log(rightNow)
          //         console.log(queSeCelebraAux)
          return { launchDate, queSeCelebraAux }
        }
      }
    }
  }

  function mapMonth(mes) {
    switch (mes) {
      case 'january':
        return 0;
        break;
      case 'february':
        return 1;
        break;
      case 'march':
        return 2;
        break;
      case 'april':
        return 3;
        break;
      case 'may':
        return 4;
        break;
      case 'june':
        return 5;
        break;
      case 'july':
        return 6;
        break;
      case 'august':
        return 7;
        break;
      case 'september':
        return 8;
        break;
      case 'october':
        return 9;
        break;
      case 'november':
        return 10;
        break;
      case 'december':
        return 11;
        break;
    }
  }
  //console.log(getProximoFeriado(rightNow.getMonth()))

  // const launchDateTime = launchDate.getTime()
  var proxFeriado = getProximoFeriado(rightNow.getMonth())

  if (proxFeriado == null) {
    proxFeriado = { launchDate: new Date(1 + ' ' + 1 + ', ' + (rightNow.getFullYear() + 1) + ' ' + +' ' + 0 + ":" + 0 + ":" + 0), queSeCelebraAux: "Año nuevo" }
  }
  // console.log(proxFeriado)
  const launchDateTime = proxFeriado.launchDate
  queSeCelebra.value = proxFeriado.queSeCelebraAux
  //  console.log(launchDateTime)
  const updateTimer = () => {
    const now = new Date().getTime();
    const t = launchDateTime - now;

    if (t > 0) {
      let days = Math.floor(t / (1000 * 60 * 60 * 24));
      if (days < 10) {
        days = '0' + days;
      }

      let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      if (hours < 10) {
        hours = '0' + hours;
      }

      let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      if (mins < 10) {
        mins = '0' + mins;
      }

      let secs = Math.floor((t % (1000 * 60)) / 1000);
      if (secs < 10) {
        secs = '0' + secs;
      }

      time.value = `${days} : ${hours} : ${mins} : ${secs}`;
      dias.value = days;
      horas.value = hours;
      minutos.value = mins;
      segundos.value = secs;


      //    console.log(time.value);
    } else {
      clearInterval(intervalId);
    }
  };

  // Update the timer every second
  updateTimer();
  const intervalId = setInterval(updateTimer, 1000);
});
</script>

<template>
  <h1 class="display-4 text-white">¿Cuánto falta para el próximo feriado?</h1>
  <div title="Días, Horas, Minutos, Segundos" class="timer">
    <h1 class="timer-text display-4 text-white text-nowrap">
      {{ time }}
    </h1>
    <!-- <h1 class="timer-text timer-explained text-white text-nowrap">Días</h1>-->
  </div>

  <ol>
    <li class=" text-white">
      <h1>{{ queSeCelebra[0] }}</h1>
      <h1>{{ queSeCelebra[1] }}</h1>
    </li>
  </ol>
</template>

<style scoped>
.units {
  position: absolute;
  top: 1px
}

div {
  text-align: center;
}

.timer {
  border-radius: 15px;
  border: 1px solid rgb(255, 255, 255);
  margin: 1rem;
  box-shadow: 10px 5px 5px rgb(0, 0, 0, 0.5);
  position: relative;
}

.timer-explained {
  font-size: 15px;
  position: absolute;
  left: 27%;
  bottom: -5px;
}

.timer-text {
  margin: 0;
  position: relative;
}

li {
  list-style-type: none;
}

h1 {
  font-family: Arial, Helvetica, sans-serif;
  text-shadow: 2px 1px 2px rgb(0, 0, 0, 0.8);
}
</style>