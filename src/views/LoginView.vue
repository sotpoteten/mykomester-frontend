<script setup>
import NavBar from '@/components/NavBar.vue'
import '@/assets/main.css'
import router from '@/router/index.js'
import { useTokenStore } from '@/stores/token'
import axios from 'axios'
import { ref } from 'vue'
import { ip } from '@/utils/httputils.js'

const tokenStore = useTokenStore()
tokenStore.getAuthorizationConfig()

const email = ref(null)
const password = ref(null)

async function onSumbit() {
  try {
    const response = await axios.post(`http://${ip}:8080/login`, {
      email: email.value,
      password: password.value,
    })
    tokenStore.saveInStore(email.value, response.data)
    router.push('/start')
  } catch (error) {
    console.error('Login failed:', error)
  }
}
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
          <input type="text" id="email" v-model="email" />
          <label>Passord:</label>
          <input type="password" id="password" v-model="password" />
          <button class="submit" @click="onSumbit">
            Logg inn
            <v-icon name="md-login-round" />
          </button>
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

svg {
  margin-left: 10px;
}
</style>
