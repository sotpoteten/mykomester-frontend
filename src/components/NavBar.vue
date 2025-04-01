<script setup>
import { ref } from 'vue'
import app_logo from '@/assets/mushroom-drawing-6.png'
import router from '@/router/index.js'

const logo = ref(app_logo)
</script>

<template>
  <div class="navbar">
    <img :src="logo" alt="logo" />
    <h1 class="title" @click="router.push('/')">MykoMester</h1>
    <div class="buttons">
      <button type="button" id="login" class="menubutton" @click="router.push('/login')">
        <h3>Logg inn</h3>
      </button>
      <button type="button" id="register" class="menubutton" @click="router.push('/registrer')">
        <h3>Registrer deg</h3>
      </button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 50px;
  font-weight: normal;
  margin: 20px 20px;
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
  box-shadow: 0px 3px 3px rgb(117, 117, 117);
}

.buttons {
  justify-content: flex-end;
  display: flex;
  align-items: flex-end;
  width: -webkit-fill-available;
  height: fit-content;
}

img {
  height: 80px;
  margin: 10px 0px 10px 20px;
}
</style>
