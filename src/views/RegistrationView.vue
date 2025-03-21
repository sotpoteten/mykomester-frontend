<script setup>
import NavBar from '@/components/NavBar.vue'
import '@/assets/main.css'
import { ref } from 'vue'
import axios from 'axios'
import { useTokenStore } from '@/stores/token.js'
import router from '@/router/index.js'
import { ip } from '@/utils/httputils.js'

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')

const tokenStore = useTokenStore()
tokenStore.getAuthorizationConfig()

async function onSubmit() {
  try {
    await axios.post(`http://${ip}:8080/users`, {
      firstName: firstname.value,
      lastName: lastname.value,
      email: email.value,
      password: password.value,
    })

    const loginResponse = await axios.post(`http://${ip}:8080/login`, {
      email: email.value,
      password: password.value,
    })
    tokenStore.saveInStore(email.value, loginResponse.data)
    router.push('/start')
  } catch (error) {
    console.error(error.response.data)
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
          <h2>Registrer deg:</h2>
          <label for="firstname">Fornavn:</label>
          <input type="text" id="firstname" v-model="firstname" />
          <label for="lastname">Etternavn:</label>
          <input type="text" id="lastname" v-model="lastname" />
          <label for="email">*E-post:</label>
          <input type="text" id="email" v-model="email" />
          <label for="password">*Passord:</label>
          <input type="password" id="password" v-model="password" />
          <button class="submit" @click="onSubmit">Registrer deg</button>
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
