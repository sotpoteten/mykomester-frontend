<script setup>
import { ref } from 'vue'
import app_logo from '@/assets/mushroom-drawing-6.png'

const logo = ref(app_logo)
</script>

<template>
  <div class="navbar">
    <img :src="logo" alt="logo" />
    <h1 class="title">MykoMester</h1>
    <div class="buttons">
      <button type="button" id="login" class="btn">
        <h3>Logg inn</h3>
      </button>
      <button type="button" id="login" class="btn">
        <h3>Registrer deg</h3>
      </button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 50px;
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
  height: 100%;
  z-index: 999;
}

.btn {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 10px 20px 10px 20px;
  height: 100%;
  border: none;
  background-color: #748e54;
}

.buttons {
  justify-content: flex-end;
  display: flex;
  align-items: flex-end;
  width: -webkit-fill-available;
}

img {
  height: 100px;
  margin: 10px;
}
</style>
