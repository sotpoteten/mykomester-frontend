<script setup>
import '@/assets/main.css'
import Paginator from 'primevue/paginator'
import { ref, computed } from 'vue'

const first = ref(0)
let taskNr = computed(() => (first.value + 10) / 10)
const paginatorStyle = ref({
  padding: '3px',
  background: '#748e54',
  nav: {
    button: {
      color: '#000000',
      hover: {
        background: '#495836',
        color: '#ffffff',
      },
      selected: {
        background: '#353f27',
        color: '#ffffff',
      },
      width: '24px',
      height: '24px',
    },
  },
})

const shrooms = ['Bispelue', 'Fluesopp', 'Kantarell', 'Traktkantarell', 'Champingjog', 'Hattetatt']

const searchList = computed(() => shrooms.filter(checkOccurance))

const search = ref('')

const twoTerms = computed(() => search.value.length > 1)

function checkOccurance(mush) {
  var filter = search.value.toUpperCase()
  return mush.toUpperCase().indexOf(filter) > -1
}
</script>

<template>
  <div class="flex-container">
    <div class="main">
      <div class="content-box" id="center">
        <div id="header-wrapper">
          <h1>Oppgave {{ taskNr }}</h1>
        </div>
        <div id="img-wrapper">
          <img
            src="https://artsobservasjoner.no/MediaLibrary/2024/9/579a19a5-59c2-4ccb-9cb9-fb4234c2f663_image.jpg"
            alt="Soppbilde"
          />
        </div>
        <div id="container-wrapper">
          <div class="answer-container" id="species">
            <h2>Velg soppart:</h2>
            <input type="search" size="30" v-model="search" @keyup="searchFilter" />
            <ul id="search-list" v-if="twoTerms">
              <li v-for="shroom in searchList" :key="shroom.id">{{ shroom }}</li>
            </ul>
          </div>
          <div class="answer-container" id="normlist">
            <div class="radio-wrapper">
              <input type="radio" id="spiselig" value="Spiselig" name="normlist" />
              <label for="spiselig">Spiselig</label>
            </div>
            <div class="radio-wrapper">
              <input
                type="radio"
                id="spiselig-merknad"
                value="Spiselig med merknad"
                name="normlist"
              />
              <label for="spiselig-merknad">Spiselig med merknad</label>
            </div>
            <div class="radio-wrapper">
              <input type="radio" id="matsopp" value="Matsopp" name="normlist" />
              <label for="matsopp">Matsopp</label>
            </div>
            <div class="radio-wrapper">
              <input type="radio" id="giftig" value="Giftig" name="normlist" />
              <label for="giftig">Giftig</label>
            </div>
            <div class="radio-wrapper">
              <input type="radio" id="meget-giftig" value="Meget giftig" name="normlist" />
              <label for="meget-giftig">Meget giftig</label>
            </div>
          </div>
          <div class="answer-container" id="note">
            <h2>Angi merknad:</h2>
            <textarea name="merknad" id="merknad" cols="30" rows="4"></textarea>
          </div>
        </div>
        <div id="navigation-wrapper">
          <button class="submit" id="save">
            <v-icon name="md-save-round" id="save-icon" />
            Lagre quiz til senere
          </button>
          <Paginator v-model:first="first" rows="10" totalRecords="300" :dt="paginatorStyle" />
          <button class="submit" id="finish">
            Avslutt quiz
            <v-icon name="bi-send-check-fill" id="finish-icon" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#center {
  background-color: #553739;
  width: 100%;
  margin-left: 10px;
  margin-bottom: 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: white;
}

h1 {
  font-weight: normal;
  margin: 10px;
}

#img-wrapper {
  display: flex;
  justify-content: center;
  height: 50%;
  margin-bottom: 10px;
}

img {
  display: flex;
  height: 100%;
  border-radius: 10px;
  box-shadow: 2px 2px 2px black;
}

#container-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30%;
}

.answer-container {
  display: flex;
  margin: 2.5% 10px 2.5% 0px;
  border-radius: 10px;
  box-shadow: 2px 2px 2px black;
  background-color: #955e42;
  height: 95%;
  width: fit-content;
  flex-direction: column;
}

#species {
  padding: 0px 10px;
}

#normlist {
  width: fit-content;
  padding: 0px 5px;
  justify-content: space-between;
}

input[type='radio'] {
  margin: 3px;
  accent-color: black;
}

label {
  margin: 5px;
}

.radio-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}

#note {
  padding: 0px 10px;
}

textarea {
  font-size: 15px;
  border-radius: 5px;
  border: none;
  resize: none;
}

#navigation-wrapper {
  display: flex;
  flex-direction: row;
  width: 95%;
  justify-content: space-between;
  align-items: center;
  margin: 0px 2.5% 10px;
}

#save {
  width: fit-content;
}

#finish {
  width: fit-content;
}

#save-icon {
  margin-right: 5px;
}

#finish-icon {
  margin-left: 5px;
}

nav {
  box-shadow: 2px 2px 2px black;
  border-radius: 6px;
}

#search-list {
  /* Remove default list styling */
  list-style-type: none;
  padding: 0;
  margin: 0;
}

#search-list li {
  border: 1px solid #ddd;
  margin-top: -1px;
  background-color: #f6f6f6;
  padding: 2px;
  font-size: 15px;
  color: black;
  display: block;
  font-family: Arial, Helvetica, sans-serif;
}

#search-list li:hover {
  background-color: #eee;
}
</style>
