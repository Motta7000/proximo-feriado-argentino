<script setup>
import { useRoute } from "vue-router";
import { ref, toRaw } from "vue";
import { Icon } from "@iconify/vue";
//import { feriados } from "Card.vue"
const route = useRoute();
console.log(route.params);
let feriados = ref([]);
let fecha = ref()
feriados.value = JSON.parse(localStorage.feriados);
let aux = toRaw(feriados.value)
console.log(aux)
let feriado = aux.find((feriado) => feriado.id === route.params.id)
console.log(feriado)
fecha.value = feriado.fecha.split('T')[0].split('-')

</script>

<template>
    <title>Feriado</title>
    <div class="back-container mt-4 mx-5">
        <!--   <RouterLink class="link" :to="`/`" href="">
            Atras
        </RouterLink>

  <a @click="$router.go(-1)">back</a>
        <Icon class="ml-2" icon="pajamas:go-back" />-->
    </div>
    <div class="grid-container my-5">
        <article>
            <div class="article-container">
                <a @click="$router.go(-1)">Volver</a>
                <h1 class="que-se-celebra-text">{{ feriado.queSeCelebra }}</h1>
                <p>{{ fecha[2] + '/' + fecha[1] + '/' + fecha[0] }}</p>

                <p v-if="feriado.dias > 0">Días Restantes: <b>{{ feriado.dias }}</b></p>
                <div class="tipo-feriado-container mb-2">
                    <p class="m-0">Tipo de Feriado: {{ feriado.tipo }}</p>
                    <div v-if="feriado.tipo == 'Trasladable'" class="icono green"></div>
                    <div v-if="feriado.tipo == 'Inamovible'" class="icono blue"></div>
                    <div v-if="feriado.tipo == 'Turistico'" class="icono purple"></div>
                </div>
                <p class="descripcion" v-for="d in feriado.descripcion">{{ d }}</p>
                <img :alt="feriado.alt" :src="feriado.img">
                <div>
                </div>
            </div>
        </article>
        <!--
        <aside>
            <div class="aside-container">
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus eius aut delectus officia nam,
                    distinctio
                    sequi esse unde quasi debitis itaque facilis dolores rerum accusamus excepturi deleniti dolore et
                    alias.
                </p>
            </div>
        </aside>
        -->
    </div>
</template>

<style scoped>
a {
    color: #fff
}

a {
    font-family: Arial, Helvetica, sans-serif;
    text-decoration: underline !important;
}

a:hover {
    color: #fff;
    background-color: #fff0;
    cursor: pointer;
}

.descripcion {
    text-align: center;
}

.que-se-celebra-text {
    text-align: center;
}

img {
    width: 100%;
    max-width: 500px;
}

.tipo-feriado-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.icono {
    height: 20px;
    width: 20px;

    border-radius: 10px;
}

.green {
    background-color: #2e7d33;
}

.blue {
    background-color: #0072bb;
}

.purple {
    background-color: #6a1b99;
}

aside {
    border-left: #c0aba4 solid 1px;
}

.link {
    text-decoration: none;
    color: inherit;
}

.back-container {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.grid-container {
    display: block;
    grid-template-columns: 4fr 1fr;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 1rem;
}

article {}

.aside-container {
    max-width: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
}

.article-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
    max-width: 700px;
}
</style>