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
        <h2>Logg inn</h2>
        <label for="username">E-post:</label>
        <input type="text" id="username" />
        <label for="password">Passord:</label>
        <input type="password" id="password" />
        <button class="submit">Logg inn</button>
        <p>Glemt passord?</p>
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

input {
  font-size: 15px;
  border-radius: 5px;
  border: none;
}

label {
  margin: 10px;
  font-family: Arial, Helvetica, sans-serif;
}

.submit {
  margin: 10px;
  border: none;
  border-radius: 3px;
  background-color: #748e54;
  width: 220px;
  height: 30px;
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
