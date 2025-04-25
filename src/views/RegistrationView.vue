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
const loading = ref(false)
const errorMsg = ref('')

const tokenStore = useTokenStore()
tokenStore.getAuthorizationConfig()

async function onSubmit() {
  try {
    loading.value = true
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
    loading.value = false
    errorMsg.value = error.response.data
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
          <input type="password" id="password" v-model="password" @keyup.enter="onSubmit"/>
          <button class="submit" @click="onSubmit" :disabled="loading">
            Registrer deg
            <v-icon id="loading-icon" name="ri-loader-2-fill" animation="spin" speed="slow" v-if="loading"/>
          </button>
          <p class="error">{{ errorMsg }}</p>
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
  margin-left: 0.5em;
  margin-bottom: 0.5em;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

p {
  margin: 0.2em 0px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 2.5vh;
}

.error {
  color: red;
  font-weight: bold;
}

h2 {
  font-size: 4vh;
}
</style>
