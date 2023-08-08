<script setup>
import { ref, onMounted } from 'vue';
import feriados from '../data/feriados.json'
let time = ref('');
let dias = ref('');
let horas = ref('');
let minutos = ref('');
let segundos = ref('')
let esHoy = ref(false);
import { toIso8601 } from '../functions/functions';

var queSeCelebra = ref('')
onMounted(() => {
  var rightNow = new Date()
  //console.log(rightNow)
  let isoDates = toIso8601(rightNow.getMonth() + 1, rightNow.getDate(), rightNow.getHours(), rightNow.getMinutes(), rightNow.getSeconds())
  rightNow = new Date(rightNow.getFullYear() + '-' + (isoDates.month) + '-' + isoDates.day + 'T' + isoDates.hour + ":" + isoDates.minute + ":" + isoDates.second + "Z")
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
        /*    console.log(date)
            console.log(esteMes['mes'])
            console.log(mapMonth(esteMes['mes']) + ' VS ' +rightNow.getMonth())
            */

        if (mapMonth(esteMes['mes']) == rightNow.getMonth() && date == rightNow.getDate()) {
          esHoy.value = true;
          queSeCelebraAux = esteMes[date]
          console.log(queSeCelebraAux)
          return { launchDate: 0, queSeCelebraAux }
        }
        // Si el mes el cual estamos recorriendo es igual al mes actual y el dia es mas alto que el dia del presente entonces esteMes[date] tiene el proximo feriado mas cercano
        if (mapMonth(esteMes['mes']) == rightNow.getMonth() && date > rightNow.getDate()) {
          esHoy.value = false;
          launchDate = new Date(esteMes['mes'] + ' ' + date + ', ' + rightNow.getFullYear() + ' ' + +' ' + 0 + ":" + 0 + ":" + 0)
          //      console.log(launchDate)

          queSeCelebraAux = esteMes[date]
          //        console.log(rightNow)
          //         console.log(queSeCelebraAux)

          return { launchDate, queSeCelebraAux }
        }
        //   console.log(mapMonth(esteMes['mes']) + ' VS ' + rightNow.getMonth())
        //Si el mes el cual estamos recorriendo es mas alto que el mes actual entonces el primer feriado de ese mes es el proximo feriado mas cercano
        if (mapMonth(esteMes['mes']) > rightNow.getMonth()) {
          esHoy.value = false;
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
  queSeCelebra.value[1] = queSeCelebra.value[1] + "/" + rightNow.getFullYear()
  console.log(queSeCelebra.value)
  //  console.log(launchDateTime)
  if (esHoy.value == false) {
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
    console.log(queSeCelebra.value)

    // Update the timer every second
    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);
  }

});
</script>

<template>
  <h1 v-if="!esHoy" class="display-4 text-white">¿Cuánto falta para el próximo feriado?</h1>
  <h1 v-else class="display-4 text-white">¡Feliz Feriado!</h1>
  <div v-if="!esHoy" title="Días, Horas, Minutos, Segundos" class="timer">
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
.helpText {
  position: static;
  margin-left: 70px;

  font-size: 12px;
  float: left
}

.flex-calendar {
  display: flex;
  flex-direction: column;
}

img {
  max-width: 100px;
}

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
  margin: auto;
  position: relative;
  width: min-content;
}

li {
  list-style-type: none;
}

a {
  color: #fff
}

h1,
a {
  font-family: Arial, Helvetica, sans-serif;
  text-shadow: 2px 1px 2px rgb(0, 0, 0, 0.8);
}

a:hover {
  color: #fff;
  background-color: #fff0;
}
</style>