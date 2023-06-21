<script setup>
import { ref, onMounted } from 'vue';
import feriados from '../data/feriados.json'
let time = ref('');
var queSeCelebra = ref('')
onMounted(() => {
    var rightNow = new Date()
    console.log(rightNow)
    rightNow = new Date((rightNow.getMonth() + 1) + ' ' + rightNow.getDate() + ', ' + rightNow.getFullYear() + ' ' + +' ' + rightNow.getHours() + ":" + rightNow.getMinutes() + ":" + rightNow.getSeconds())
    console.log(rightNow.getMonth())

    console.log(feriados[rightNow.getMonth()])
    var esteMes = feriados[rightNow.getMonth()]
    const getProximoFeriado = (start) => {
        var launchDate = null;

        for (var i = start; i < feriados.length; i++) {
            esteMes = feriados[i]
            console.log(esteMes)
            var queSeCelebraAux;
            for (const date in esteMes) {
                console.log(date)
                /*    console.log(date)
                    console.log(esteMes['mes'])
                    console.log(mapMonth(esteMes['mes']) + ' VS ' +rightNow.getMonth())
                    */
                if (mapMonth(esteMes['mes']) == rightNow.getMonth() && date > rightNow.getDate()) {
                    launchDate = new Date(esteMes['mes'] + ' ' + date + ', ' + rightNow.getFullYear() + ' ' + +' ' + 0 + ":" + 0 + ":" + 0)
                    console.log(launchDate)
                    queSeCelebraAux = esteMes[date]
                    console.log(rightNow)
                    return { launchDate, queSeCelebraAux }
                }
                //   console.log(mapMonth(esteMes['mes']) + ' VS ' + rightNow.getMonth())
                if (mapMonth(esteMes['mes']) > rightNow.getMonth()) {
                    launchDate = new Date(esteMes['mes'] + ' ' + date + ', ' + rightNow.getFullYear() + ' ' + +' ' + 0 + ":" + 0 + ":" + 0)

                    console.log(launchDate)
                    queSeCelebraAux = esteMes[date]
                    console.log(rightNow)
                    return { launchDate, queSeCelebraAux }
                }
            }
        }
    }

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
            case 'agosto':
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
            case 'diciembre':
                return 11;
                break;
        }
    }
    console.log(getProximoFeriado(rightNow.getMonth()))

    // const launchDateTime = launchDate.getTime()
    var proxFeriado = getProximoFeriado(rightNow.getMonth())

    if (proxFeriado == null) {
        proxFeriado = { launchDate: new Date(1 + ' ' + 1 + ', ' + (rightNow.getFullYear() + 1) + ' ' + +' ' + 0 + ":" + 0 + ":" + 0), queSeCelebraAux: "Año nuevo" }
    }
    console.log(proxFeriado)
    const launchDateTime = proxFeriado.launchDate
    queSeCelebra = proxFeriado.queSeCelebraAux
    console.log(launchDateTime)
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
            console.log(time.value);
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
    <div>
        {{ time }}
      
    </div>
    <div>
        {{ queSeCelebra }}
    </div>
</template>

<style scoped>
div {
   text-align: center;
}
</style>