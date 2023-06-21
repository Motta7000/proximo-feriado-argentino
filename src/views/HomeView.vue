<script setup>
import { useDark, useToggle } from "@vueuse/core"
import Timer from "../components/timer.vue";
const isDark = useDark({
  selector: "body",
  attribute: "color-scheme",
  valueDark: "dark",
  valueLight: "light",
});
const toggleDark = useToggle(isDark);
console.log(isDark)
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
    <div class="container">
      <img src="../img/argentina.jpg" alt="Snow" style="width:100vw;">
      <div class="bottom-left">Bottom Left</div>
      <div class="top-left">Top Left</div>
      <div class="top-right">Top Right</div>
      <div class="bottom-right">Bottom Right</div>
      <div class="centered">Centered</div>
    </div>
    <!-- HERO -->
    <div class="hero">
      <div class ="container-hero">
        <div class="row">
          <div class="col-lg-7">
            <h1 class="display-4">Build robust</h1>
          </div>
        </div>
      </div>
    </div>
    <Timer />
  </main>
</template>

<style scoped>
img {
  max-height: 600px;
}

/* Container holding the image and the text */
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