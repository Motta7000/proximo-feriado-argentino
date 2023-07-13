<script setup>
import { useDark, useToggle } from "@vueuse/core"
import Timer from "../components/timer.vue";
import Card from "../components/Card.vue"
import { ref } from 'vue';
import feriados from "../data/feriados.json"
let r = ref([]);

console.log(feriados)

function daysUntil(date) {
  var rightNow = new Date();
  rightNow = new Date((rightNow.getMonth() + 1) + ' ' + rightNow.getDate() + ', ' + rightNow.getFullYear() + ' ' + +' ' + rightNow.getHours() + ":" + rightNow.getMinutes() + ":" + rightNow.getSeconds())

  var esteMes = feriados[rightNow.getMonth()]
  console.log(esteMes)
  var count = 0;
  var i = 0;
  while (count < 10 && i <= 10) {
    i = rightNow.getMonth() + count; // 0 <= i <= 10

    esteMes = feriados[i]
    console.log(esteMes)
    for (const date in esteMes) {
      if (date != 'mes' && date != 'calculated') {
        console.log(esteMes[date])
        var launchDate = new Date(esteMes['mes'] + ' ' + date + ', ' + rightNow.getFullYear() + ' ' + +' ' + 0 + ":" + 0 + ":" + 0)
        console.log(esteMes['mes'] + ' ' + date + ', ' + rightNow.getFullYear() + ' ' + +' ' + 0 + ":" + 0 + ":" + 0)
        console.log(launchDate)
        var DifferenceInDays = Math.floor((launchDate.getTime() - rightNow.getTime()) / (1000 * 3600 * 24))
        if (DifferenceInDays > 0)
          r.value.push({ 'days': DifferenceInDays, 'queSeCelebra': esteMes[date][0], 'date': esteMes[date][1] })
        console.log(r.value)
      }

    }
    count++;
  }
  /*
  if (i > 10 && count < 10) {
    while(i < feriados.length)
    {
      while(j < feriados[i])
      {
        if (date !=)
        j++
      }
      i++
    }

    count++;
  }
  */
  function mapMonth(mes) {
    switch (mes) {
      case 'enero':
        return 0;
        break;
      case 'febrero':
        return 1;
        break;
      case 'marzo':
        return 2;
        break;
      case 'abril':
        return 3;
        break;
      case 'mayo':
        return 4;
        break;
      case 'junio':
        return 5;
        break;
      case 'julio':
        return 6;
        break;
      case 'august':
        return 7;
        break;
      case 'septiembre':
        return 8;
        break;
      case 'octubre':
        return 9;
        break;
      case 'noviembre':
        return 10;
        break;
      case 'december':
        return 11;
        break;
    }
  }
}
daysUntil("a");
</script>

<template>
  <main>
    <!-- <span class="dark:text-white">
     {{ isDark ? "Dark" : "Light" }} Mode
    </span> 
    <button
      @click="toggleDark()"
    >

    </button>
    -->
    <!-- HERO -->
    <div class="hero vh d-flex align-items-center">
      <div class="container-hero">
        <div class="row">
          <div class="col-lg-7 mx-auto text-center">
            <Timer />
          </div>
        </div>
      </div>
    </div>
    <div class=" body d-flex align-items-center">
      <div class="container-body">
        <h1 class="py-2">Proximos feriados</h1>
        <div class="grid-container px-2">
          <Card v-for="feriado in r" :feriado="feriado" />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@700&display=swap');

h1 {
  text-align: center;
}

.grid-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-template-columns: repeat(auto-fill, minmax(15rem,1fr));*/
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}

@media screen and (max-width: 600px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 300px) {
  .grid-container {
    grid-template-columns: repeat(1, 1fr);
  }
}


.vh {
  height: 80vh;
}

.hero {
  background-image: url('../img/argentina.jpg');
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  position: relative;
  z-index: 2;
  justify-content: center;
}

.body {
  justify-content: center;

}

.hero::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(34, 100, 136, 0.671);
  z-index: -1;

}

img {
  max-height: 600px;
}

/* Container holding the image and the text */
.container-hero {
  overflow: hidden;
}

.container {
  position: relative;
  text-align: center;
  color: white;
  width: 100vw;
  margin: 0;
  margin-right: 0;
  padding: 0;
}

/* Bottom left text */
.bottom-left {
  position: absolute;
  bottom: 8px;
  left: 16px;
}

/* Top left text */
.top-left {
  position: absolute;
  top: 8px;
  left: 16px;
}

/* Top right text */
.top-right {
  position: absolute;
  top: 8px;
  right: 16px;
}

/* Bottom right text */
.bottom-right {
  position: absolute;
  bottom: 8px;
  right: 16px;
}

/* Centered text */
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.timer {
  align-items: center;
}
</style>