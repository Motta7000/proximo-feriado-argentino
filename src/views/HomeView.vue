<script setup>

import Timer from "../components/TimerComponent.vue";
import Card from "../components/Card.vue"
import { ref } from 'vue';
import { watchArray } from "@vueuse/core";
import { Icon } from '@iconify/vue';
import { db } from '@/firebase'
import { collection, onSnapshot } from "firebase/firestore"
import { onMounted } from "vue";

const rAux = ref([]);
const search = ref("");
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
      console.log(feriados)
      feriado.dias = Math.floor((feriado.fecha.getTime() - rightNow.getTime()) / (1000 * 3600 * 24))
      if (feriado.dias > 0) {
        feriados.value.push(feriado)
      }

    });
    feriados.value.sort(function (x, y) {
      return x.fecha - y.fecha
    })
    console.log(feriados);
    feriados.value.shift()
    rAux.value = feriados.value
  })
})

watchArray(search, () => {
  // console.log("Hello from watch")
  feriados.value = rAux.value.filter(f => f.queSeCelebra.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.value.toLowerCase())) //f de feriado

})

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
    <div class=" body d-flex align-items-center ">
      <div class="py-2 container-body">
        <h1 class="pb-2">Próximos feriados</h1>
        <div class="search-container pb-3 px-3">
          <input v-model.trim="search" type="search" id="search" class="form-control" placeholder="Nombre del feriado">
          <Icon icon="material-symbols:search" width="40" height="40"></Icon>
        </div>
        <div v-if="feriados.length > 0">
          <div class="grid-container px-2">
            <!--   <Card v-for="feriado in r" :feriado="feriado" />-->
            <Card v-for="feriado in feriados" :feriado="feriado" />
          </div>
        </div>
        <div class="grid-container-empty px-2" v-else>
          <div> </div>
          <div class="flex-item pt-3">
            <p class="mb-1"><i>No se Encontraron Feriados...</i></p>
            <Icon height="30" width="30" icon="subway:missing" />
          </div>
          <div>

          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@700&display=swap');

.flex-item {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
}

Icon {
  height: 300px;
}

.search-container {
  display: flex;
}

.boton {
  margin: auto;
}

h1 {
  text-align: center;
}

.grid-container-empty {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  /* grid-template-columns: repeat(auto-fill, minmax(15rem,1fr));*/
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  margin-bottom: 2rem;
}

.grid-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* grid-template-columns: repeat(auto-fill, minmax(15rem,1fr));*/
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  margin-bottom: 2rem;
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
  background-image: url('../assets/img/argentina.jpg');
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