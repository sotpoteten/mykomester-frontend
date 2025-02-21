<script setup>
import NavBar from '@/components/NavBarLoggedIn.vue'
import '@/assets/main.css'
import Chart from 'primevue/chart'
import { ref, onMounted } from 'vue'

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
    labels: ['Riktig', 'Ikke besvart', 'Feil'],
    datasets: [
      {
        data: [73.3, 17.4, 13.3],
        backgroundColor: ['#748e54', '#9c914f', '#553739'],
        hoverBackgroundColor: ['#5d7243', '#7d743f', '#442c2e'],
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
        label: 'Score',
        data: [51.8, 61.0, 74.9, 61.0, 64.4, 53.6, 85.4, 76.9, 82.0, 73.0],
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
          text: 'Oppnådd poengsscore',
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
        <div class="title-wrapper">
          <h1 id="result">Resultater:</h1>
          <h1 id="score">66/90 poeng - 73.3%</h1>
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
              <tr>
                <td>1</td>
                <td style="color: green">Bispelue (Gyromitra infula)</td>
                <td style="color: green">Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>2</td>
                <td style="color: green">Bjørkevokssopp (Hygrophorus hedrychii)</td>
                <td style="color: green">Spiselig med merknad</td>
                <td>Bjørkevokssopp (Hygrophorus hedrychii)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>3</td>
                <td style="color: red">Bispelue (Gyromitra infula)</td>
                <td style="color: green">Spiselig</td>
                <td>Bjørkevokssopp (Hygrophorus hedrychii)</td>
                <td>Spiselig</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
                <td>Bispelue (Gyromitra infula)</td>
                <td>Spiselig med merknad</td>
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
</style>
