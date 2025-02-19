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
      <div class="content-box" id="left"></div>
      <div id="right">
        <div class="content-box" id="top"></div>
        <div class="content-box" id="mid"></div>
        <div class="content-box" id="bottom"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#left {
  background-color: #9c914f;
  flex-grow: 2;
  margin-bottom: 10px;
  margin-left: 10px;
}

#right {
  display: flex;
  flex-direction: column;
  flex-grow: 3;
  height: 100%;
}

#top {
  background-color: #553739;
  height: 40%;
}

#mid {
  background-color: #955e42;
  height: 40%;
}

#bottom {
  background-color: #748e54;
  height: 20%;
  margin-bottom: 10px;
}
</style>
