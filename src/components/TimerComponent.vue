<script setup>
import { ref, onMounted } from 'vue';
import feriadosRaw from '../data/feriados.json'
let time = ref('');
let dias = ref('');
let horas = ref('');
let minutos = ref('');
let segundos = ref('')
let esHoy = ref(false);
let DiaDeHoy = ref(new Date())

import { toIso8601 } from '../functions/functions';
import { db } from '@/firebase'
import { collection, onSnapshot } from "firebase/firestore"

var queSeCelebra = ref('')
let feriados = ref([]);
onMounted(() => {
  onSnapshot(collection(db, "feriados"), (querySnapshot) => {

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      const feriado = {
        id: doc.id,
        alt: doc.data().alt,
        fecha: doc.data().fecha,
        img: doc.data().img,
        queSeCelebra: doc.data().queSeCelebra,
        dias: null
      }
      feriado.fecha = feriado.fecha.toDate()
      let rightNow = new Date()
      feriado.dias = Math.floor((feriado.fecha.getTime() - rightNow.getTime()) / (1000 * 3600 * 24))
      if (feriado.dias >= -1 && feriado.dias < 0) {
        esHoy.value = true;
        feriados.value.push(feriado)
      }
      if (feriado.dias >= 0) {
        feriados.value.push(feriado)
      }
    });
    feriados.value.sort(function (x, y) {
      return x.fecha - y.fecha
    })

    console.log(feriados.value);
    //console.log(getProximoFeriado(rightNow.getMonth()))

    // const launchDateTime = launchDate.getTime()

    // console.log(proxFeriado)
    const launchDateTime = feriados.value[0].fecha

    // queSeCelebra.value[1] = queSeCelebra.value[1] + "/" + rightNow.getFullYear()
    //console.log(queSeCelebra.value)
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
      // console.log(queSeCelebra.value)

      // Update the timer every second
      updateTimer();
      const intervalId = setInterval(updateTimer, 1000);
    }

  })


})
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

  <ol v-if="feriados.length > 0">
    <li class=" text-white">
      <h1>{{ feriados[0].queSeCelebra }}</h1>
      <h1>{{ feriados[0].fecha.getDate() + '/' + (feriados[0].fecha.getMonth() + 1) + '/' + DiaDeHoy.getFullYear() }}</h1>

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