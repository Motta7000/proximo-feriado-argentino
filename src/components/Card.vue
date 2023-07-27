<script setup>
import { defineProps } from "vue"

const { feriado } = defineProps(['feriado'])
console.log(feriado)


</script>

<template>
    <div class="card">
        <img :src="feriado.img" @error="$event.target.src = 'https://i.ibb.co/HTx2DB8/icono-c.jpg'"
            :alt="feriado.queSeCelebra" />
        <div class="card-text">
            <p>{{ feriado.queSeCelebra }}</p>
            <div class="days-left">
                <p>{{ feriado.date }}</p>
                <p>Faltan <b>{{ feriado.days }} </b> días</p>
            </div>

        </div>
    </div>
</template>

<style scoped>
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
}

p {
    margin: 0;
}
</style>