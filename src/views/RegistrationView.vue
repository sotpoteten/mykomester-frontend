<script setup>
import NavBar from '@/components/NavBar.vue'
import '@/assets/main.css'
</script>

<template>
  <div class="flex-container">
    <div class="header">
      <NavBar></NavBar>
    </div>
    <div class="main">
      <div class="content-box" id="center">
        <div class="wrapper">
          <h2>Registrer deg:</h2>
          <label for="firstname">Fornavn:</label>
          <input type="text" id="firstname" />
          <label for="lastname">Etternavn:</label>
          <input type="text" id="lastname" />
          <label for="email">*E-post:</label>
          <input type="text" id="email" />
          <label for="password">*Passord:</label>
          <input type="password" id="password" />
          <button class="submit">Registrer deg</button>
          <p>Felter merket med * må fylles ut.</p>
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
}
</style>
