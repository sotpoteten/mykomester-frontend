<script setup>
import NavBar from '@/components/NavBar.vue'
import '@/assets/main.css'
import router from '@/router/index.js'
</script>

<template>
  <div class="flex-container">
    <div class="header">
      <NavBar></NavBar>
    </div>
    <div class="main">
      <div class="content-box" id="center">
        <div class="wrapper">
          <h2>Logg inn</h2>
          <label for="email">E-post:</label>
          <input type="text" id="email" />
          <label>Passord:</label>
          <input type="password" id="password" />
          <button class="submit">Logg inn</button>
          <p @click="router.push('/glemtpassord')">Glemt passord?</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#center {
  background-color: #955e42;
  width: 100%;
  margin-left: 10px;
  margin-bottom: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

p {
  margin: 0px;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: underline;
}

p:hover {
  cursor: pointer;
}
</style>
