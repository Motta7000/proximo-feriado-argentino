<script setup>
import { defineProps } from "vue"
import { RouterLink } from "vue-router"
const { feriado } = defineProps(['feriado'])
console.log(feriado)

</script>

<template>
    <RouterLink class="link" :to="`${feriado.id}`" href="">
        <div class="card">

            <img :src="feriado.img" @error="$event.target.src = 'https://i.ibb.co/HTx2DB8/icono-c.jpg'"
                :alt="feriado.alt" />

            <div class="card-text">
                <p>{{ feriado.queSeCelebra }}</p>
                <div class="days-left">
                    <p>{{ feriado.fecha.getDate() + '/' + (feriado.fecha.getMonth() + 1) + '/' +
                        (feriado.fecha.getFullYear())
                    }}</p>
                    <p>Faltan <b>{{ feriado.dias }} </b> días</p>
                </div>
            </div>
        </div>
    </RouterLink>
</template>

<style scoped>
.link {
    text-decoration: none;
    color: inherit
}

.days-left {
    float: left;
    margin-top: auto;
}

img {
    width: 100%;
    height: 130px;
    border-bottom: #d2d2d2 solid 1px;
}

.card-text {
    padding: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.card {
    min-width: 160px;
    max-width: 220px;
    height: 100%;
}

p {
    margin: 0;
}
</style>