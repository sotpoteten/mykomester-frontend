<script setup>
import NavBar from '@/components/NavBarLoggedIn.vue'
import '@/assets/main.css'
</script>

<template>
  <div class="flex-container">
    <div class="header">
      <NavBar></NavBar>
    </div>
    <div class="main">
      <div class="content-box" id="left"></div>
      <div id="right">
        <div class="content-box" id="top"></div>
        <div class="content-box" id="bottom"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#left {
  background-color: #553739;
  width: 60%;
  margin-bottom: 10px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

#right {
  display: flex;
  flex-direction: column;
  width: 40%;
}

#top {
  background-color: #955e42;
  height: 50%;
}

#bottom {
  background-color: #9c914f;
  height: 50%;
  margin-bottom: 10px;
}
</style>
