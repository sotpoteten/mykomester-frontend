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
      <div class="content-box" id="center"></div>
    </div>
  </div>
</template>

<style scoped>
#center {
  background-color: #955e42;
  width: 100%;
  margin-left: 10px;
  margin-bottom: 10px;
}
</style>
