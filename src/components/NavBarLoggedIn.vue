<script setup>
import { ref } from 'vue'
import app_logo from '@/assets/mushroom-drawing-6.png'
import router from '@/router/index.js'

const logo = ref(app_logo)
</script>

<template>
  <div class="navbar">
    <img :src="logo" alt="logo" />
    <h1 class="title" @click="router.push('/start')">MykoMester</h1>
    <div class="buttons">
      <button type="button" id="start" class="menubutton" @click="router.push('/start')">
        <h3>Start</h3>
      </button>
      <button type="button" id="stats" class="menubutton" @click="router.push('/statistikk')">
        <h3>Statistikk</h3>
      </button>
      <button type="button" id="profil" class="menubutton" @click="router.push('/profil')">
        <h3>Min profil</h3>
      </button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 8vh;
  font-weight: normal;
  margin: 0.4em 0.4em;
}

h1:hover {
  cursor: pointer;
}

.navbar {
  justify-content: flex-start;
  display: flex;
  align-items: center;
  flex-direction: row;
  text-align: center;
  position: relative;
  top: 0;
  background-color: #748e54;
  width: 100%;
  height: fit-content;
  z-index: 999;
  box-shadow: 0 0.2em 0.2em rgb(117, 117, 117);
}

.buttons {
  justify-content: flex-end;
  display: flex;
  align-items: flex-end;
  width: -webkit-fill-available;
  height: fit-content;
}

img {
  height: 12vh;
  margin: 0.8em 0 0.8em 1.5em;
}
</style>
