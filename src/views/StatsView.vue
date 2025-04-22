<script setup>
import NavBar from '@/components/NavBarLoggedIn.vue'
import '@/assets/main.css'
import { ref } from 'vue'
import axios from 'axios'
import { useTokenStore } from '@/stores/token'
import { ip } from '@/utils/httputils.js'

const tokenStore = useTokenStore()
const stats = ref(null)
const tenLastResults = ref([])
const tenScores = ref([])
const nrOfQuizzes = ref(0)
const totalScore = ref(0)
const totalMaxScore = ref(0)
const percentage = ref(0)
const bestSpecies = ref([])
const worstSpecies = ref([])

;(async () => {
  try {
    const statsResponse = await axios.get(
      `http://${ip}:8080/stats/user/` + tokenStore.getUser(),
      tokenStore.getAuthorizationConfig(),
    )
    stats.value = statsResponse.data
    nrOfQuizzes.value = stats.value.nrOfQuizzes
    totalScore.value = stats.value.totalScore
    totalMaxScore.value = stats.value.totalMaxScore
    percentage.value = (totalScore.value / totalMaxScore.value) * 100
    bestSpecies.value = stats.value.bestSpeciesOverall
    worstSpecies.value = stats.value.worstSpeciesOverall
  } catch (error) {
    console.error(error.response)
  }
})()
;(async () => {
  try {
    const tenResultsResponse = await axios.get(
      `http://${ip}:8080/quizzes/result/tenlast/user/` + tokenStore.getUser(),
      tokenStore.getAuthorizationConfig(),
    )
    tenLastResults.value = tenResultsResponse.data
    for (var i = 0; i < tenLastResults.value.length; i++) {
      tenScores.value.push((tenLastResults.value[i].score / tenLastResults.value[i].maxScore) * 100)
    }
  } catch (error) {
    console.error(error.response)
  }
})()

function capitalizeFirstLetter(input) {
  return String(input).charAt(0).toUpperCase() + String(input).slice(1)
}
</script>

<template>
  <div class="flex-container">
    <div class="header">
      <NavBar></NavBar>
    </div>
    <div class="main">
      <div id="left">
        <div class="content-box" id="left-top">
          <div id="stats">
            <div class="stat-wrapper">
              <h2>Gjennomførte quizer:</h2>
              <h1>{{ nrOfQuizzes }}</h1>
            </div>
            <div class="stat-wrapper">
              <h2>Oppnådd poengssum totalt:</h2>
              <h1>{{ totalScore }}</h1>
            </div>
            <div class="stat-wrapper">
              <h2>Maksimal poengsum totalt:</h2>
              <h1>{{ totalMaxScore }}</h1>
            </div>
            <div class="stat-wrapper">
              <h2>Gjennomsnittsscore:</h2>
              <h1>{{ parseFloat(percentage).toFixed(2) }}%</h1>
            </div>
          </div>
          <div id="icon-wrapper">
            <v-icon id="trophy-icon" name="bi-trophy-fill" animation="pulse" scale="10" fill="#FFFFFF" />
          </div>
        </div>
        <div class="content-box" id="left-bottom">
          <h2>Resultater siste 10 quizer:</h2>
          <table class="result-table">
            <tr>
              <th>Tidspunkt</th>
              <th>Oppnådd poengsum</th>
              <th>Maksimal poengsum</th>
              <th>Prosentvis poensum</th>
            </tr>
            <tr v-for="result in tenLastResults" :key="result">
              <td>{{ result.dateFinished }}</td>
              <td>{{ result.score }} poeng</td>
              <td>{{ result.maxScore }} poeng</td>
              <td>{{ parseFloat((result.score / result.maxScore) * 100).toFixed(2) }} %</td>
            </tr>
          </table>
        </div>
      </div>
      <div id="right">
        <div class="content-box" id="right-top">
          <div class="header-wrapper">
            <div class="headers">
              <h3>Topp 10</h3>
              <h3 id="best">beste</h3>
              <h3>arter:</h3>
            </div>
            <div class="dropdown-wrapper">
              <select name="dropdown-best" id="dropdown-best" v-if="false">
                <option value="Totalt">Totalt</option>
                <option value="Kun artsbestemmelse">Kun artsbestemmelse</option>
                <option value="Kun normlistestatus">Kun normlistestatus</option>
              </select>
            </div>
          </div>
          <table class="species-table">
            <tr>
              <th>Artsnavn</th>
              <th>Prosentvis riktig</th>
            </tr>
            <tr v-for="species in bestSpecies" :key="species">
              <td>{{ capitalizeFirstLetter(species.speciesName) }}</td>
              <td>{{ parseFloat(species.percentage).toFixed(1) }}%</td>
            </tr>
          </table>
        </div>
        <div class="content-box" id="right-bottom">
          <div class="header-wrapper">
            <div class="headers">
              <h3>Topp 10</h3>
              <h3 id="worst">dårligste</h3>
              <h3>arter:</h3>
            </div>
            <div class="dropdown-wrapper">
              <select name="dropdown-worst" id="dropdown-worst" v-if="false">
                <option value="Totalt">Totalt</option>
                <option value="Kun artsbestemmelse">Kun artsbestemmelse</option>
                <option value="Kun normlistestatus">Kun normlistestatus</option>
              </select>
            </div>
          </div>
          <table class="species-table">
            <tr>
              <th>Artsnavn</th>
              <th id="percent">Prosentvis riktig</th>
            </tr>
            <tr v-for="species in worstSpecies" :key="species">
              <td>{{ capitalizeFirstLetter(species.speciesName) }}</td>
              <td>{{ parseFloat(species.percentage).toFixed(1) }}%</td>
            </tr>
          </table>
        </div>
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
  margin-left: 0.5em;
  display: flex;
  flex-direction: row;
  padding: 0.5em;
}

#stats {
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

#left-bottom {
  background-color: #955e42;
  height: 60%;
  margin-bottom: 0.5em;
  margin-left: 0.5em;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

h2 {
  margin: 0.2em 2.5%;
  font-size: 4vh;
}

h3 {
  margin: 0.2em 2.5%;
  font-size: 3.5vh;
}

#right {
  display: flex;
  flex-direction: column;
  width: 45%;
}

#right-top {
  background-color: #9c914f;
  height: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

#right-bottom {
  background-color: #748e54;
  height: 50%;
  margin-bottom: 0.5em;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

table {
  font-family: Arial, Helvetica, sans-serif;
  width: 95%;
  border: 0.25em solid black;
  border-collapse: collapse;
  margin: 0 2.5% 0.25em;
}

.result-table {
  border: 0.2em solid black;
  font-size: 2.5vh;
  th {
    border: 0.2em solid black;
    background-color: #748e54;
    margin-left: 2px;
    text-align: left;
  }
}

.species-table {
  font-size: 2vh;
  th {
    border: 0.25em solid black;
    background-color: #955e42;
    margin-left: 2px;
    text-align: left;
  }
}

td {
  border: 0.1em solid black;
  margin-left: 0.5em;
}

.header-wrapper {
  display: flex;
  flex-direction: row;
  margin: 0.25em 2.5%;
  width: 95%;
  align-items: center;

  h3 {
    margin-right: 0;
    margin-left: 0;
  }
}

#best {
  color: #00ff00;
  margin-left: 0.2em;
  margin-right: 0.2em;
}

#worst {
  color: red;
  margin-left: 0.2em;
  margin-right: 0.2em;
}

.headers {
  display: flex;
  flex-direction: row;
  width: 50%;
}

.dropdown-wrapper {
  width: 50%;
  display: flex;
  justify-content: flex-end;
}

select {
  width: fit-content;
  font-size: 15px;
  border-radius: 5px;
  border: none;
  height: 25px;
}

.stat-wrapper {
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;

  h1 {
    margin: 0 0.2em;
    font-weight: normal;
    font-size: 5.5vh;
  }

  h2 {
    margin: 0 0.2em;
    font-size: 4vh;
  }
}

#icon-wrapper {
  width: 30%;
  display: flex;
  justify-content: center;
}

#trophy-icon {
  height: 25vh;
  width: 25vh;
  margin-top: 3vh;
}
</style>
