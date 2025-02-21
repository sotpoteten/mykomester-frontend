<script setup>
import NavBar from '@/components/NavBar.vue'
import '@/assets/main.css'
import { ref } from 'vue'
import router from '@/router/index.js'
import Dialog from 'primevue/dialog'

const email = ref('')
const visible = ref(false)
const dialogStyle = ref({
  content: {
    padding: {
      top: 0,
    },
  },
  header: {
    padding: {
      bottom: 0,
    },
  },
})
</script>

<template>
  <Dialog
    :dt="dialogStyle"
    v-model:visible="visible"
    modal
    header="Bekreftelse"
    :style="{ width: '25rem' }"
  >
    <p>
      Nytt passord er sendt på e-post til {{ email }}. Sjekk spam-filter om du ikke finner e-posten
    </p>
    <button class="submit" id="back-to-login" @click="router.push('/login')">
      Tilbake til innlogging
    </button>
  </Dialog>
  <div class="flex-container">
    <div class="header">
      <NavBar></NavBar>
    </div>
    <div class="main">
      <div class="content-box" id="center">
        <div id="wrapper">
          <h2>Tilbakestill passord</h2>
          <label for="username">E-post:</label>
          <input type="text" id="username" v-model="email" />
          <div class="btn-wrapper">
            <button class="submit" id="exit">Avbryt</button>
            <button class="submit" @click="visible = true">Tilbakestill passord</button>
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

#exit {
  margin: 10px 5px 10px 0px;
  border: none;
  border-radius: 5px;
  background-color: #dcdcdc;
  width: fit-content;
  height: 30px;
  color: black;
  padding: 5px;
}

.btn-wrapper {
  display: flex;
  flex-direction: row;
}

p {
  margin-top: 0;
}

#back-to-login {
  width: fit-content;
}

::v-global(.p-dialog) {
  font-family: Arial, Helvetica, sans-serif;
}

::v-global(.p-dialog-close-button) {
  visibility: hidden;
}
</style>
