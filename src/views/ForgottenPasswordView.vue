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
        <div id="wrapper">
          <h2>Tilbakestill passord</h2>
          <label for="username">E-post:</label>
          <input type="text" id="username" />
          <div class="btn-wrapper">
            <button class="exit">Avbryt</button>
            <button class="submit">Tilbakestill passord</button>
          </div>
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

#wrapper {
  display: flex;
  flex-direction: column;
}

.exit {
  margin: 10px 5px 10px 0px;
  border: none;
  border-radius: 5px;
  background-color: #dcdcdc;
  width: fit-content;
  height: 30px;
  color: black;
  padding: 5px;
}

.exit:hover {
  text-decoration: underline;
}

.btn-wrapper {
  display: flex;
  flex-direction: row;
}
</style>
