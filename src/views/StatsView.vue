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
      <div id="left">
        <div class="content-box" id="left-top"></div>
        <div class="content-box" id="left-bottom"></div>
      </div>
      <div id="right">
        <div class="content-box" id="right-top"></div>
        <div class="content-box" id="right-bottom"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#left {
  display: flex;
  flex-direction: column;
  width: 55%;
}

#left-top {
  background-color: #553739;
  height: 40%;
  margin-left: 10px;
}

#left-bottom {
  background-color: #955e42;
  height: 60%;
  margin-bottom: 10px;
  margin-left: 10px;
}

#right {
  display: flex;
  flex-direction: column;
  width: 45%;
}

#right-top {
  background-color: #9c914f;
  height: 50%;
}

#right-bottom {
  background-color: #748e54;
  height: 50%;
  margin-bottom: 10px;
}
</style>
