<script setup>
import NavBar from '@/components/NavBarLoggedIn.vue'
import '@/assets/main.css'
import { ref, onMounted } from 'vue'
import router from '@/router/index.js'
import axios from 'axios'
import { useTokenStore } from '@/stores/token.js'
import Chart from 'primevue/chart'

const tokenStore = useTokenStore()

const numOfTasks = ref('30')
const species = ref('Hele pensum')
const quizMode = ref('Artsbestemmelse og normlistestatus')
const answerMode = ref('Søk og valg')
const advancedSettings = ref(false)
const tenScores = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
const firstname = ref('')
const lastname = ref('')

;(async () => {
  const settingsResponse = await axios.get(
    'http://localhost:8080/usersettings/user/' + tokenStore.getUser(),
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
      'http://localhost:8080/quizzes/result/tenlast/user/' + tokenStore.getUser(),
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
    'http://localhost:8080/users/' + tokenStore.getUser(),
    tokenStore.getAuthorizationConfig(),
  )
  firstname.value = userResponse.data.firstName
  lastname.value = userResponse.data.lastName
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

const toggleSettings = () => {
  advancedSettings.value = !advancedSettings.value
}

async function onStart() {
  try {
    await axios.post(
      'http://localhost:8080/quizzes/user/' + tokenStore.getUser(),
      {
        nrOfTasks: parseInt(numOfTasks.value),
        quizContent: 'HELE_PENSUM',
        quizMode: 'STANDARD',
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
</script>

<template>
  <div class="flex-container">
    <div class="header">
      <NavBar></NavBar>
    </div>
    <div class="main">
      <div class="content-box" id="left">
        <div class="wrapper">
          <h3>Antall oppgaver: {{ numOfTasks }}</h3>
          <h3>Arter: {{ species }}</h3>
          <h3>Quizmodus: {{ quizMode }}</h3>
          <h3>Svarmodus: {{ answerMode }}</h3>
          <button id="startquiz" @click="onStart">Start quiz</button>
          <div id="avansert-wrapper" @click="toggleSettings">
            <v-icon name="bi-caret-down-fill" v-if="!advancedSettings" />
            <v-icon name="bi-caret-up-fill" v-if="advancedSettings" />
            <h3>Avanserte innstillinger</h3>
          </div>
          <div id="innstillinger-wrapper" v-if="advancedSettings">
            <label for="nr-of-tasks">Antall oppgaver:</label>
            <div id="radio-wrapper">
              <input type="radio" id="ten" name="nr-of-tasks" v-model="numOfTasks" value="10" />
              <label for="ten">10</label>
              <input type="radio" id="twenty" name="nr-of-tasks" v-model="numOfTasks" value="20" />
              <label for="twenty">20</label>
              <input type="radio" id="thirty" name="nr-of-tasks" v-model="numOfTasks" value="30" />
              <label for="thirty">30</label>
              <input type="radio" id="fourty" name="nr-of-tasks" v-model="numOfTasks" value="40" />
              <label for="fourty">40</label>
              <input type="radio" id="fifty" name="nr-of-tasks" v-model="numOfTasks" value="50" />
              <label for="fifty">50</label>
            </div>
            <label for="species">Sopparter:</label>
            <select name="species" id="species" v-model="species" disabled>
              <option value="Hele pensum">Hele pensum</option>
              <option value="Spiselige">Spiselige</option>
              <option value="Ikke matsopp">Ikke matsopp</option>
              <option value="Giftige">Giftige</option>
            </select>
            <label for="quiz-mode">Quizmodus:</label>
            <select name="quiz-mode" id="quiz-mode" v-model="quizMode" disabled>
              <option selected value="Standard">Standard</option>
              <option value="Kun artsbestemmelse">Kun artsbestemmelse</option>
              <option value="Kun normlistestatus">Kun normlistestatus</option>
              <option disabled value="Forgiftningsforløp">Forgiftningsforløp</option>
            </select>
            <label for="answer-mode">Svarmodus:</label>
            <select name="answer-mode" id="answer-mode" v-model="answerMode" disabled>
              <option selected value="Search">Søk og valg</option>
              <option value="Flervalg (4 alternativer)">Flervalg (4 alternativer)</option>
              <option value="Fritekst">Fritekst</option>
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
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
}

#bottom {
  background-color: #9c914f;
  height: 50%;
  margin-bottom: 10px;
  justify-content: center;
}

.wrapper {
  align-items: center;
}

h3 {
  margin-top: 0px;
  margin-bottom: 5px;
  font-family: Arial, Helvetica, sans-serif;
}

#startquiz {
  margin: 10px 0px;
  border: solid black 2px;
  border-radius: 25px;
  background-color: #9c914f;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-weight: normal;
  width: 100%;
  font-size: 25px;
  padding: 10px 0px;
}

#avansert-wrapper {
  display: flex;
  flex-direction: row;
}

#avansert-wrapper:hover {
  cursor: pointer;
}

svg {
  margin-right: 5px;
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
  margin: 3px 3px 3px 20px;
  accent-color: black;
}

label {
  margin: 5px;
}

select {
  width: 100%;
  font-size: 15px;
  border-radius: 5px;
  border: none;
  height: 25px;
}

#welcome {
  font-weight: normal;
  margin-top: 20px;
  margin-bottom: 20px;
}

#info-text {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
}
</style>
