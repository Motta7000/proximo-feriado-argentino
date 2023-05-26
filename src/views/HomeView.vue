<script setup>
import {useDark, useToggle} from "@vueuse/core"
import Timer from "../components/timer.vue";
const isDark = useDark({
  selector:"body",
  attribute:"color-scheme",
  valueDark:"dark",
  valueLight:"light",
});
const toggleDark = useToggle(isDark);
console.log(isDark)
</script>

<template>
  <main>
    <span class="dark:text-white">
      {{ isDark ? "Dark" : "Light" }} Mode
    </span>
    <button
      @click="toggleDark()"
    >

    </button>
    <Timer/>
  </main>
</template>

