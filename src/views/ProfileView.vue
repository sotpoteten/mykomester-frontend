<script setup>
import NavBar from '@/components/NavBarLoggedIn.vue'
import '@/assets/main.css'
import { ref } from 'vue'
import axios from 'axios'
import { useTokenStore } from '@/stores/token.js'
import Dialog from 'primevue/dialog'
import router from '@/router/index.js'
import { ip } from '@/utils/httputils.js'

const tokenStore = useTokenStore()

const firstname = ref('')
const lastname = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const nrOfTasks = ref('')
const species = ref('')
const quizMode = ref('')
const answerMode = ref('')

;(async () => {
  try {
    const userResponse = await axios.get(
      `http://${ip}:8080/users/` + tokenStore.getUser(),
      tokenStore.getAuthorizationConfig(),
    )
    firstname.value = userResponse.data.firstName
    lastname.value = userResponse.data.lastName
    email.value = userResponse.data.email
  } catch (error) {
    console.error(error)
  }
})()
;(async () => {
  try {
    const settingsResponse = await axios.get(
      `http://${ip}:8080/usersettings/user/` + tokenStore.getUser(),
      tokenStore.getAuthorizationConfig(),
    )
    nrOfTasks.value = settingsResponse.data.nrOfTasks
    species.value = formatString(settingsResponse.data.quizContent)
    quizMode.value = formatString(settingsResponse.data.quizMode)
    answerMode.value = formatString(settingsResponse.data.answerMode)
  } catch (error) {
    console.error(error)
  }
})()

function formatString(input) {
  input = String(input).toLowerCase()
  input = String(input).replace('_', ' ')
  input = String(input).charAt(0).toUpperCase() + String(input).slice(1)
  return input
}

function reverseFormatString(input) {
  input = String(input).toUpperCase()
  input = String(input).replace(' ', '_')
  return input
}

const visibleDialogUser = ref(false)
const visibleDialogQuiz = ref(false)
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

async function onSaveUserSettings() {
  try {
    if (password.value !== '') {
      if (password.value == confirmPassword.value) {
        await axios.put(
          `http://${ip}:8080/users/` + tokenStore.getUser(),
          {
            firstName: firstname.value,
            lastName: lastname.value,
            email: email.value,
            password: password.value,
          },
          tokenStore.getAuthorizationConfig(),
        )
      } else {
        return
      }
    } else {
      await axios.put(
        `http://${ip}:8080/users/` + tokenStore.getUser(),
        {
          firstName: firstname.value,
          lastName: lastname.value,
          email: email.value,
        },
        tokenStore.getAuthorizationConfig(),
      )
    }
    visibleDialogUser.value = true
    password.value = ''
    confirmPassword.value = ''
  } catch (error) {
    console.error(error)
  }
}

async function onSaveQuizSettings() {
  try {
    await axios.put(
      `http://${ip}:8080/usersettings/user/` + tokenStore.getUser(),
      {
        nrOfTasks: nrOfTasks.value,
        quizContent: reverseFormatString(species.value),
        quizMode: reverseFormatString(quizMode.value),
        answerMode: reverseFormatString(answerMode.value),
      },
      tokenStore.getAuthorizationConfig(),
    )
    visibleDialogQuiz.value = true
  } catch (error) {
    console.error(error)
  }
}

function onLogout() {
  tokenStore.clearStore()
  router.push('/')
}
</script>

<template>
  <div class="flex-container">
    <Dialog
      :dt="dialogStyle"
      v-model:visible="visibleDialogUser"
      modal
      header="Brukerprofilen er oppdatert"
      :style="{ width: '25rem' }"
    >
      <button class="submit" id="close" @click="visibleDialogUser = false">Lukk</button>
    </Dialog>
    <Dialog
      :dt="dialogStyle"
      v-model:visible="visibleDialogQuiz"
      modal
      header="Quizinnstillingene er lagret"
      :style="{ width: '25rem' }"
    >
      <button class="submit" id="close" @click="visibleDialogQuiz = false">Lukk</button>
    </Dialog>
    <div class="header">
      <NavBar></NavBar>
    </div>
    <div class="main">
      <div class="content-box" id="left">
        <div class="wrapper">
          <h2>Oppdater brukerprofil:</h2>
          <label for="firstname">Fornavn:</label>
          <input v-model="firstname" type="text" id="firstname" />
          <label for="lastname">Etternavn:</label>
          <input v-model="lastname" type="text" id="lastname" />
          <label for="email">*E-post:</label>
          <input v-model="email" type="text" id="email" />
          <label for="password">*Passord:</label>
          <input v-model="password" type="password" id="password" />
          <label for="confirm-password">*Bekreft passord:</label>
          <input v-model="confirmPassword" type="password" id="confirm-password" />
          <button class="submit" @click="onSaveUserSettings">
            Lagre brukerprofil
            <v-icon id="icon" name="md-save-round" />
          </button>
          <p>Felter merket med * må fylles ut.</p>
        </div>
      </div>
      <div id="right">
        <div class="content-box" id="top">
          <div id="innstillinger-wrapper">
            <h2>Standard quizinnstillinger:</h2>
            <label for="nr-of-tasks">Antall oppgaver:</label>
            <div id="radio-wrapper">
              <input type="radio" id="ten" name="nr-of-tasks" value="10" v-model="nrOfTasks" />
              <label for="ten">10</label>
              <input type="radio" id="twenty" name="nr-of-tasks" value="20" v-model="nrOfTasks" />
              <label for="twenty">20</label>
              <input type="radio" id="thirty" name="nr-of-tasks" value="30" v-model="nrOfTasks" />
              <label for="thirty">30</label>
              <input type="radio" id="fourty" name="nr-of-tasks" value="40" v-model="nrOfTasks" />
              <label for="fourty">40</label>
              <input type="radio" id="fifty" name="nr-of-tasks" value="50" v-model="nrOfTasks" />
              <label for="fifty">50</label>
            </div>
            <label for="species">Sopparter:</label>
            <select name="species" id="species" v-model="species">
              <option value="Hele pensum">Hele pensum</option>
              <option value="Spiselige">Spiselige</option>
              <option value="Matsopp">Matsopp</option>
              <option value="Giftige">Giftige</option>
            </select>
            <label for="quiz-mode">Quizmodus:</label>
            <select name="quiz-mode" id="quiz-mode" v-model="quizMode">
              <option value="Standard">Standard</option>
              <option selected value="Artsbestemmelse">Artsbestemmelse</option>
              <option value="Normlistestatus">Normlistestatus</option>
            </select>
            <label for="answer-mode" v-if="false">Svarmodus:</label>
            <select name="answer-mode" id="answer-mode" v-model="answerMode" v-if="false">
              <option value="Search">Søk og valg</option>
              <option value="Flervalg (4 alternativer)">Flervalg (4 alternativer)</option>
              <option value="Fritekst">Fritekst</option>
            </select>
            <button class="submit" id="save" @click="onSaveQuizSettings">
              Lagre innstillinger
              <v-icon id="icon" name="md-save-round" />
            </button>
          </div>
        </div>
        <div class="content-box" id="bottom">
          <button class="submit" id="logout" @click="onLogout">
            Logg ut
            <v-icon id="icon" name="md-logout-round" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#left {
  background-color: #955e42;
  width: 60%;
  margin-bottom: 0.5em;
  margin-left: 0.5em;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

#right {
  display: flex;
  flex-direction: column;
  width: 60%;
}

#top {
  background-color: #9c914f;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#bottom {
  background-color: #553739;
  height: 20%;
  margin-bottom: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  font-size: 4vh;
  margin-bottom: 0.3em;
}

p {
  margin: 0px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 2.5vh;
}

#innstillinger-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  label {
    margin: 0.25em;
  }
}

input[type='radio'] {
  margin: 0.15em 0.15em 0.15em 1em;
  accent-color: black;
}

select {
  width: 100%;
  font-size: 2.5vh;
  border-radius: 0.25em;
  border: none;
  height: 4vh;
}

#radio-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#save {
  background-color: #553739;
  color: white;
}

#logout {
  width: 50%;
}

#icon {
  margin-left: 10px;
  height: 3vh;
  width: 3vh;
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
