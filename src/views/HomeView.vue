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

// Función para obtener el valor inicial de las variables desde el almacenamiento local
const obtenerValorInicial = (nombreVariable, valorPorDefecto) => {
  const valorAlmacenado = localStorage.getItem(nombreVariable);
  return valorAlmacenado !== null ? JSON.parse(valorAlmacenado) : valorPorDefecto;
};

// Define tus variables con los valores iniciales obtenidos del almacenamiento local
const filtrarInamovibles = ref(obtenerValorInicial('filtrarInamovibles', false));
const filtrarTransladables = ref(obtenerValorInicial('filtrarTransladables', false));
const filtrarTuristicos = ref(obtenerValorInicial('filtrarTuristicos', false));
const search = ref(obtenerValorInicial('search', null));
var cargando = ref(true);

// Función para guardar el valor de una variable en el almacenamiento local
const guardarEnLocalStorage = (nombreVariable, valor) => {
  localStorage.setItem(nombreVariable, JSON.stringify(valor));
};

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
        dias: null,
        descripcion: doc.data().descripcion,
        tipo: doc.data().tipo
      }
      feriado.fecha = feriado.fecha.toDate()
      let rightNow = new Date()
      console.log(feriado)

      feriado.dias = Math.floor((feriado.fecha.getTime() - rightNow.getTime()) / (1000 * 3600 * 24))
      if (feriado.dias >= -1) {
        feriados.value.push(feriado)
      }
      console.log(feriados)
    });
    feriados.value.sort(function (x, y) {
      return x.fecha - y.fecha
    })
    console.log(feriados.value);
    localStorage.feriados = JSON.stringify(feriados.value)
    if (feriados.value[0].dias >= -1 && feriados.value[0].dias < 0) {
      feriados.value.shift() //Ya se que el else y el if hacen lo mismo pero estoy muy dormido como para seguir ahora con esto
    }
    else {
      feriados.value.shift()
    }

    rAux.value = feriados.value
    filtrarBusqueda()
    cargando.value = false;
  })


  console.log(feriados.value)
})

function filtrarBusqueda() {
  let filtro = [];
  let feriadosFinal = [];
  console.log(filtrarInamovibles.value)
  if (filtrarInamovibles.value === true) {
    filtro.push('Inamovible');
  }
  if (filtrarTransladables.value === true) {
    filtro.push('Trasladable');
  }
  if (filtrarTuristicos.value === true) {
    filtro.push('Turistico');
  }
  if (filtrarInamovibles.value === false && filtrarTransladables.value === false && filtrarTuristicos.value === false) {
    filtro.push('Turistico');
    filtro.push('Trasladable');
    filtro.push('Inamovible');
  }
  console.log(filtro)
  console.log(rAux.value)
  for (let i = 0; i < rAux.value.length; i++) {
    console.log(rAux.value[i])
    for (let j = 0; j < filtro.length; j++) {
      console.log(rAux.value[i].tipo)
      console.log(rAux.value[i].tipo + " VS " + filtro[j])
      if (rAux.value[i].tipo == filtro[j]) {
        feriadosFinal.push(rAux.value[i])
        break;
      }
    }
  }
  console.log(feriadosFinal);
  feriados.value = feriadosFinal.filter(f => f.queSeCelebra.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.value.toLowerCase()))
}
watchArray([filtrarInamovibles], () => {
  guardarEnLocalStorage('filtrarInamovibles', filtrarInamovibles.value);
})
watchArray([filtrarTransladables], () => {
  guardarEnLocalStorage('filtrarTransladables', filtrarTransladables.value);
})
watchArray([filtrarTuristicos], () => {
  guardarEnLocalStorage('filtrarTuristicos', filtrarTuristicos.value);
})
watchArray([search], () => {
  guardarEnLocalStorage('search', search.value);
})
watchArray([search, filtrarInamovibles, filtrarTransladables, filtrarTuristicos], () => {
  console.log("Hello from watch")
  filtrarBusqueda()
  //feriados.value = rAux.value.filter(f => f.queSeCelebra.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(search.value.toLowerCase())) //f de feriado
  /*if (feriadosFinal.length != 0) {
    feriados.value = feriados.value.filter()
    for (let i = 0; i < feriados.value.length; i++) {
      if (feriados.value[i])
    }
  }*/
  /*
    if (filtrarInamovibles.value == true) {
      feriados.value = feriados.value.filter(f => f.tipo === "Inamovible")
  
    }
    filtrarTransladables
  */
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
          <div class="col-lg-7 mx-auto text-center timer-container">
            <Timer />
          </div>
        </div>
      </div>
    </div>
    <div class=" body d-flex align-items-center ">
      <div class="py-2 container-body">
        <h1 class="pb-2">Próximos feriados</h1>
        <div class="search-container pb-1 px-2">
          <input v-model.trim="search" type="search" id="search" class="input form-control"
            placeholder="Nombre del feriado">
          <Icon class="icon-search" icon="material-symbols:search" width="40" height="40"></Icon>
        </div>
        <div class="pb-1 px-2 flex-filters">
          <div class="filter-item">
            <input type="checkbox" id="inamovibles" v-model="filtrarInamovibles">
            <label for="inamovibles">Inamovible</label>
          </div>
          <div class="filter-item">
            <input type="checkbox" id="trasladable" v-model="filtrarTransladables">
            <label for="trasladable">Trasladable</label>
          </div>
          <div class="filter-item">
            <input type="checkbox" id="turisticos" v-model="filtrarTuristicos">
            <label for="turisticos">Turistico</label>
          </div>
        </div>

        <div v-if="feriados.length > 0">
          <div class="grid-container px-2">
            <!--   <Card v-for="feriado in r" :feriado="feriado" />-->
            <Card v-for="feriado in feriados" :feriado="feriado" />
          </div>
        </div>
        <div v-else>
          <div class="grid-container-empty px-2" v-if="cargando == false">
            <div> </div>
            <div class="flex-item pt-3">
              <p class="mb-1"><i>No se Encontraron Feriados...</i></p>
              <Icon height="30" width="30" icon="subway:missing" />
            </div>
            <div></div>
          </div>
          <div v-else>
            <div> </div>
            <div class="flex-item pt-3">
              <p class="mb-1"><i>Cargando...</i></p>
              <Icon height="30" width="30" icon="subway:missing" />
            </div>
            <div></div>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@700&display=swap');

.container-body {
  min-width: 700px;
}

@media screen and (max-width:700px) {
  .container-body {
    min-width: 0;
  }

  .search-container {
    width: 90vw;
    margin: auto;
  }
}

.filter-item {
  align-items: center;
  display: flex;
}

label {
  padding-left: 5px;
}

.flex-filters {
  display: flex;
  gap: 10px;
  align-items: center;
  text-align: center;
  justify-content: center;

}

.timer-container {
  max-width: 100vw;
  padding: 0;
}

.input {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-right: none;
}

.icon-search {
  border: 1px solid #ced4da;
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}

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