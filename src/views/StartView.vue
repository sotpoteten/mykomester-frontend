<script setup>
import NavBar from '@/components/NavBarLoggedIn.vue'
import '@/assets/main.css'
import { ref, onMounted } from 'vue'
import router from '@/router/index.js'
import axios from 'axios'
import { useTokenStore } from '@/stores/token.js'
import Chart from 'primevue/chart'
import { ip } from '@/utils/httputils.js'
import Popover from 'primevue/popover'

const tokenStore = useTokenStore()

const numOfTasks = ref('30')
const species = ref('Hele pensum')
const quizMode = ref('Standard')
const answerMode = ref('Søk og valg')
const advancedSettings = ref(false)
const tenScores = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
const firstname = ref('')
const lastname = ref('')
const specials = ref('')
const nrOfSpecies = ref(0)
const loading = ref(false)
const info = ref()

;(async () => {
  const settingsResponse = await axios.get(
    `http://${ip}:8080/usersettings/user/` + tokenStore.getUser(),
    tokenStore.getAuthorizationConfig(),
  )
  numOfTasks.value = settingsResponse.data.nrOfTasks
  species.value = formatString(settingsResponse.data.quizContent)
  quizMode.value = formatString(settingsResponse.data.quizMode)
  answerMode.value = formatString(settingsResponse.data.answerMode)
})()
;(async () => {
  try {
    const tenResultsResponse = await axios.get(
      `http://${ip}:8080/quizzes/result/tenlast/user/` + tokenStore.getUser(),
      tokenStore.getAuthorizationConfig(),
    )
    for (var i = 0; i < tenResultsResponse.data.length; i++) {
      tenScores.value[i] =
        (tenResultsResponse.data[i].score / tenResultsResponse.data[i].maxScore) * 100
    }
  } catch (error) {
    console.error(error)
  }
})()
;(async () => {
  const userResponse = await axios.get(
    `http://${ip}:8080/users/` + tokenStore.getUser(),
    tokenStore.getAuthorizationConfig(),
  )
  firstname.value = userResponse.data.firstName
  lastname.value = userResponse.data.lastName
})()
;(async () => {
  const nrOfSpeciesResponse = await axios.get(
    `http://${ip}:8080/stats/nrofspecies/user/` + tokenStore.getUser(),
    tokenStore.getAuthorizationConfig(),
  )
  nrOfSpecies.value = nrOfSpeciesResponse.data
})()

onMounted(() => {
  barData.value = setBarData()
  barOptions.value = setBarOptions()
})

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

const toggleSettings = () => {
  advancedSettings.value = !advancedSettings.value
}

async function onStart() {
  try {
    loading.value = true
    let spec = ''
    if (specials.value == '') {
      spec = 'x'
    } else {
      spec = specials.value
    }
    await axios.post(
      `http://${ip}:8080/quizzes/user/` + tokenStore.getUser() + '/' + spec,
      {
        nrOfTasks: parseInt(numOfTasks.value),
        quizContent: reverseFormatString(species.value),
        quizMode: reverseFormatString(quizMode.value),
        answerMode: 'SEARCH',
      },
      tokenStore.getAuthorizationConfig(),
    )
    router.push('/quiz')
  } catch (error) {
    console.error(error.response.data)
  }
}

const barData = ref()
const barOptions = ref()

const setBarData = () => {
  return {
    labels: ['', '', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        label: 'Score i %',
        data: tenScores,
        backgroundColor: ['#748e54', '#553739', '#955e42'],
        borderColor: ['#ffffff'],
        borderWidth: 1,
      },
    ],
  }
}
const setBarOptions = () => {
  return {
    plugins: {
      legend: {
        labels: {
          color: '#00',
        },
      },
      title: {
        text: 'Siste 10 quizer',
        display: true,
        position: 'bottom',
        padding: {
          bottom: 5,
        },
        color: '#00',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#00',
        },
        grid: {
          color: '#00',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#00',
        },
        grid: {
          color: '#00',
        },
        title: {
          display: true,
          text: 'Oppnådd poengsscore (%)',
          color: '#00',
        },
      },
    },
    aspectRatio: 3,
    maintainAspectRatio: false,
    layout: {
      padding: 0,
    },
  }
}

const updateRefs = () => {
  species.value = 'Hele pensum'
  if (specials.value == 'Alle pensumarter') {
    numOfTasks.value = 148
  } else {
    numOfTasks.value = 30
  }
}

const toggleInfo = (event) => {
  info.value.toggle(event)
}
</script>

<template>
  <Popover ref="info">
    <div class="popover-info">
      <p>Hver oppgave gir 2 poeng for riktig artsbestemmelse og 1 poeng for riktig normlistestatus. Arten må være riktig for å få poeng for riktig normlistestatus.</p>
      <p>Hver oppgave viser 3 bilder av samme art, men <b>IKKE</b> nødvendigvis samme eksemplar.</p>
      <p>Bildene er hentet fra <a href="https://artsobservasjoner.no">artsobservasjoner.no</a> så vi tar forbehold om feil i rapporteringen derfra.</p>
      <p>Kvaliteten på noen bilder kan være for dårlig for en sikker artsbestemmelse, men så kan være greit å ha i bakhodet at dette er et øvingsverktøy, ikke et testverktøy.</p>
      <p>Spesialquiz med dine dårligste arter låses opp når du har testet deg i minst 50 ulike arter.</p>
    </div>
  </Popover>
  <div class="flex-container">
    <div class="header">
      <NavBar></NavBar>
    </div>
    <div class="main">
      <div class="content-box" id="left">
        <div class="info-bar">
          <div @mouseenter="toggleInfo" @mouseleave="toggleInfo">
            <v-icon id="info-icon" name="bi-info-circle-fill" scale="10" />
          </div>
        </div>
        <div class="wrapper">
          <h3>Antall oppgaver: {{ numOfTasks }}</h3>
          <h3 v-if="specials == ''">Arter: {{ species }}</h3>
          <h3>Quizmodus: {{ quizMode }}</h3>
          <h3 v-if="false">Svarmodus: {{ answerMode }}</h3>
          <h3 v-if="specials != ''">Spesialquiz: {{ specials }}</h3>
          <button id="startquiz" @click="onStart" :disabled="loading">
            Start quiz
            <v-icon id="loading-icon" name="ri-loader-2-fill" animation="spin" speed="slow" v-if="loading" />
          </button>
          <div id="avansert-wrapper" @click="toggleSettings">
            <v-icon id="caret-icon" name="bi-caret-down-fill" v-if="!advancedSettings" />
            <v-icon id="caret-icon" name="bi-caret-up-fill" v-if="advancedSettings" />
            <h3>Avanserte innstillinger</h3>
          </div>
          <div id="innstillinger-wrapper" v-if="advancedSettings">
            <label for="nr-of-tasks">Antall oppgaver:</label>
            <div id="radio-wrapper">
              <input
                type="radio"
                id="ten"
                name="nr-of-tasks"
                v-model="numOfTasks"
                value="10"
                :disabled="specials == 'Alle pensumarter'"
              />
              <label for="ten">10</label>
              <input
                type="radio"
                id="twenty"
                name="nr-of-tasks"
                v-model="numOfTasks"
                value="20"
                :disabled="specials == 'Alle pensumarter'"
              />
              <label for="twenty">20</label>
              <input
                type="radio"
                id="thirty"
                name="nr-of-tasks"
                v-model="numOfTasks"
                value="30"
                :disabled="specials == 'Alle pensumarter'"
              />
              <label for="thirty">30</label>
              <input
                type="radio"
                id="fourty"
                name="nr-of-tasks"
                v-model="numOfTasks"
                value="40"
                :disabled="specials == 'Alle pensumarter'"
              />
              <label for="fourty">40</label>
              <input
                type="radio"
                id="fifty"
                name="nr-of-tasks"
                v-model="numOfTasks"
                value="50"
                :disabled="specials == 'Alle pensumarter'"
              />
              <label for="fifty">50</label>
            </div>
            <label for="species">Sopparter:</label>
            <select name="species" id="species" v-model="species" :disabled="specials != ''">
              <option value="Hele pensum">Hele pensum</option>
              <option value="Spiselige">Spiselige</option>
              <option value="Ikke matsopp">Ikke matsopp</option>
              <option value="Giftige">Giftige</option>
            </select>
            <label for="quiz-mode">Quizmodus:</label>
            <select name="quiz-mode" id="quiz-mode" v-model="quizMode">
              <option selected value="Standard">Standard</option>
              <option value="Artsbestemmelse">Artsbestemmelse</option>
              <option value="Normlistestatus">Normlistestatus</option>
            </select>
            <label for="answer-mode" v-if="false">Svarmodus:</label>
            <select name="answer-mode" id="answer-mode" v-model="answerMode" v-if="false">
              <option selected value="Search">Søk og valg</option>
              <option value="Flervalg (4 alternativer)">Flervalg (4 alternativer)</option>
              <option value="Fritekst">Fritekst</option>
            </select>
            <label for="specials">Velg en spesialquiz:</label>
            <select name="specials" id="specials" v-model="specials" @change="updateRefs">
              <option value=""></option>
              <option value="Dine dårligste arter" :disabled="nrOfSpecies < 50">
                Dine dårligste arter
              </option>
              <option value="Alle pensumarter">Alle pensumarter</option>
            </select>
          </div>
        </div>
      </div>
      <div id="right">
        <div class="content-box" id="top">
          <h1 id="welcome">Velkommen {{ firstname }} {{ lastname }}!</h1>
          <p id="info-text">
            Her kan du gjennomføre quizer for å forbedre din kunnskap om sopp på normlisten. Alle
            bilder brukt i applikasjonen er hentet fra
            <a href="https://artsobservasjoner.no">artsobservasjoner.no</a>. Husk at arten må være
            riktig for å få poeng for riktig normlistestatus.
          </p>
          <h2 id="good-luck">Lykke til!</h2>
        </div>
        <div class="content-box" id="bottom">
          <Chart type="bar" :data="barData" :options="barOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#left {
  background-color: #553739;
  width: 60%;
  margin-bottom: 0.5em;
  margin-left: 0.5em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: white;
  flex-direction: column;
}

#right {
  display: flex;
  flex-direction: column;
  width: 40%;
}

#top {
  background-color: #955e42;
  height: 50%;
  flex-direction: column;
  padding-left: 1em;
  padding-right: 1em;
}

#bottom {
  background-color: #9c914f;
  height: 50%;
  margin-bottom: 0.5em;
  justify-content: center;
}

.wrapper {
  align-items: center;
  height: 90%;
  width: fit-content;
}

h3 {
  margin-top: 0;
  margin-bottom: 0.25em;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3vh;
}

#startquiz {
  margin: 0.5em 0;
  border: solid black 0.1em;
  border-radius: 1.2em;
  background-color: #9c914f;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-weight: normal;
  width: 100%;
  font-size: 4vh;
  padding: 0.5em 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

#avansert-wrapper {
  display: flex;
  flex-direction: row;
}

#avansert-wrapper:hover {
  cursor: pointer;
}

#radio-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#innstillinger-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

input[type='radio'] {
  margin: 0.15em 0.15em 0.15em 1em;
  accent-color: black;
}

label {
  margin: 5px;
}

select {
  width: 100%;
  font-size: 2.5vh;
  border-radius: 0.25em;
  border: none;
  height: 4vh;
}

#welcome {
  font-weight: normal;
  margin-top: 0.6em;
  margin-bottom: 0.6em;
  font-size: 5vh;
}

#info-text {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 2.5vh;
}

#good-luck {
  font-size: 3.8vh;
}

.info-bar {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  justify-self: flex-start;
  height: fit-content;
  padding: 2%;
}

.popover-info {
  width: 40vw;
  font-family: Arial, Helvetica, sans-serif;
}

#info-icon {
  margin-right: 0.1em;
  height: 8vh;
  width: 8vh;
}

#caret-icon {
  margin-right: 0.25em;
  height: 3vh;
  width: 3vh;
}

#loading-icon {
  margin-left: 0.25em;
  height: 3vh;
  width: 3vh;
}

</style>
