<script setup>
import NavBar from '@/components/NavBarLoggedIn.vue'
import '@/assets/main.css'
import Chart from 'primevue/chart'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useTokenStore } from '@/stores/token.js'
import { ip } from '@/utils/httputils.js'

const tokenStore = useTokenStore()
const result = ref(null)
const answers = ref([])
const tenScores = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
const score = ref(0)
const maxScore = ref(0)
const percent = ref(0)
const wrongPercent = ref(0)

;(async () => {
  try {
    const resultResponse = await axios.get(
      `http://${ip}:8080/quizzes/result/latest/user/` + tokenStore.getUser(),
      tokenStore.getAuthorizationConfig(),
    )
    result.value = resultResponse.data
    answers.value = result.value.answers
    score.value = result.value.score
    maxScore.value = result.value.maxScore
    percent.value = (score.value / maxScore.value) * 100
    wrongPercent.value = 100 - percent.value
  } catch (error) {
    console.error(error)
  }
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

onMounted(() => {
  doughnutData.value = setDoughnutData()
  doughnutOptions.value = setDoughnutOptions()
  barData.value = setBarData()
  barOptions.value = setBarOptions()
})

const doughnutData = ref()
const doughnutOptions = ref(null)

const setDoughnutData = () => {
  return {
    labels: ['Riktig%', 'Feil%'],
    datasets: [
      {
        data: [percent, wrongPercent],
        backgroundColor: ['#748e54', '#553739'],
        hoverBackgroundColor: ['#5d7243', '#442c2e'],
      },
    ],
  }
}

const setDoughnutOptions = () => {
  return {
    plugins: {
      legend: {
        labels: {
          cutout: '60%',
          color: '#000000',
        },
      },
    },
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

function formatString(input) {
  if (input === null) return null
  input = String(input).toLowerCase()
  input = String(input).replaceAll('_', ' ')
  input = String(input).charAt(0).toUpperCase() + String(input).slice(1)
  return input
}

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
      <div class="content-box" id="left">
        <div class="title-wrapper">
          <h1 id="result">Resultater:</h1>
          <h1 id="score">
            {{ score }}/{{ maxScore }} poeng - {{ parseFloat(percent).toFixed(2) }}%
          </h1>
        </div>
        <div class="table-wrapper">
          <table class="result-table">
            <thead>
              <tr>
                <th>Nr</th>
                <th>Ditt svar</th>
                <th></th>
                <th>Fasit</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(answer, index) in answers" :key="answer">
                <td>{{ index + 1 }}</td>
                <td :class="{ green: answer.speciesCorrect, red: !answer.speciesCorrect }">
                  {{ capitalizeFirstLetter(answer.answeredSpecies) }}
                </td>
                <td :class="{ green: answer.categoryCorrect, red: !answer.categoryCorrect }">
                  {{ formatString(answer.answeredCategory) }}
                </td>
                <td>{{ capitalizeFirstLetter(answer.correctSpecies) }}</td>
                <td>{{ formatString(answer.correctCategory) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="right">
        <div class="content-box" id="top">
          <Chart
            type="doughnut"
            :data="doughnutData"
            :options="doughnutOptions"
            class="w-full md:w-[30rem]"
          />
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
  flex-direction: column;
}

#right {
  display: flex;
  flex-direction: column;
  width: 40%;
  padding-bottom: 10px !important;
}

#top {
  background-color: #955e42;
  height: 50%;
  padding: 10px;
  justify-content: center;
}

#bottom {
  background-color: #9c914f;
  height: 50% !important;
  justify-content: center;
}

table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  text-align: center;
}

.result-table {
  thead th {
    background-color: #748e54;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  th {
    padding-left: 5px;
  }

  td {
    font-size: small;
  }

  tr {
    height: 2.5em;
  }
}

.title-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 95%;
  margin: 10px 2.5% 0px;
}

.table-wrapper {
  overflow-y: scroll;
  margin: 10px 2.5%;
  width: 95%;
  background-color: #dcdcdc;
  color: black;
  border: 2px solid black;
}

h1 {
  font-weight: normal;
  margin: 0;
}

#result {
  width: 40%;
}

#score {
  width: 60%;
  text-align: right;
}

.green {
  color: green;
}

.red {
  color: red;
}
</style>
