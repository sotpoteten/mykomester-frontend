<script setup>
import '@/assets/main.css'
import Paginator from 'primevue/paginator'
import { ref, computed } from 'vue'
import Dialog from 'primevue/dialog'
import router from '@/router/index.js'
import axios from 'axios'
import { useTokenStore } from '@/stores/token.js'

const tokenStore = useTokenStore()
const tasks = ref([])
const imgurl = ref('')
const photographer = ref('')
const taskNr = ref(1)
const first = ref(0)
const currentTask = ref(1)
const speciesAnswer = ref('')
const statusAnswer = ref('')
const noteAnswer = ref('')
taskNr.value = computed(() => (first.value + 10) / 10)
let allSpecies = []
;(async () => {
  try {
    await router.push('/quiz')
    const quizResponse = await axios.get(
      'http://localhost:8080/quizzes/user/latest/' + tokenStore.getUser(),
      tokenStore.getAuthorizationConfig(),
    )

    const quizData = quizResponse.data
    tasks.value = quizData.tasks
    imgurl.value = tasks.value[taskNr.value.value - 1].pictureUrl
    photographer.value = tasks.value[taskNr.value.value - 1].photographer
  } catch (error) {
    console.error(error.response.data)
  }
})()
;(async () => {
  try {
    const speciesResponse = await axios.get(
      'http://localhost:8080/species_names',
      tokenStore.getAuthorizationConfig(),
    )

    allSpecies = speciesResponse.data
  } catch (error) {
    console.error(error.response.data)
  }
})()

const showExitDialog = ref(false)
const showSaveDialog = ref(false)

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

const searchList = computed(() => allSpecies.filter(checkOccurance))

const twoTerms = computed(() => speciesAnswer.value.length > 1)
const selected = ref(false)

function checkOccurance(mush) {
  var filter = speciesAnswer.value.toUpperCase()
  return mush.toUpperCase().indexOf(filter) > -1
}

function updateTask() {
  //save answers in task array
  tasks.value[currentTask.value - 1].answeredSpecies = speciesAnswer.value
  tasks.value[currentTask.value - 1].answeredCategory = statusAnswer.value
  tasks.value[currentTask.value - 1].answeredNote = noteAnswer.value

  //Get image-info for new task
  imgurl.value = tasks.value[taskNr.value.value - 1].pictureUrl
  photographer.value = tasks.value[taskNr.value.value - 1].photographer

  //Get saved values for answers
  currentTask.value = taskNr.value.value
  if (tasks.value[currentTask.value - 1].answeredSpecies == null) {
    speciesAnswer.value = ''
  } else {
    speciesAnswer.value = tasks.value[currentTask.value - 1].answeredSpecies
  }
  if (tasks.value[currentTask.value - 1].answeredCategory == null) {
    statusAnswer.value = ''
  } else {
    statusAnswer.value = tasks.value[currentTask.value - 1].answeredCategory
  }
  if (tasks.value[currentTask.value - 1].answeredNote == null) {
    noteAnswer.value = ''
  } else {
    noteAnswer.value = tasks.value[currentTask.value - 1].answeredNote
  }
}
</script>

<template>
  <Dialog
    v-model:visible="showExitDialog"
    modal
    header="Vil du avslutte?"
    :style="{ width: '25rem' }"
  >
    <p>Denne handlingen kan ikke angres.</p>
    <div class="button-wrapper">
      <button class="submit" id="return" @click="showExitDialog = false">Tilbake</button>
      <button class="submit" id="exit" @click="router.push('/resultater')">Avslutt</button>
    </div>
  </Dialog>
  <Dialog v-model:visible="showSaveDialog" modal header="Vil du lagre?" :style="{ width: '25rem' }">
    <p>Du blir nå sendt ut av quizen, men svarene lagres til senere.</p>
    <div class="button-wrapper">
      <button class="submit" id="return" @click="showSaveDialog = false">Tilbake</button>
      <button class="submit" id="exit" @click="router.push('/start')">Avslutt</button>
    </div>
  </Dialog>
  <div class="flex-container">
    <div class="main">
      <div class="content-box" id="center">
        <div id="header-wrapper">
          <h1>Oppgave {{ taskNr }}</h1>
        </div>
        <div id="img-wrapper">
          <img v-bind:src="imgurl" alt="Soppbilde" />
          <div class="image-info">
            Foto: {{ photographer }}. Gjenbruk iht.
            <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
          </div>
        </div>
        <div id="container-wrapper">
          <div class="answer-container" id="species">
            <h2>Velg soppart:</h2>
            <input
              type="search"
              size="30"
              v-model="speciesAnswer"
              @keyup="searchFilter"
              @click="selected = false"
            />
            <ul id="search-list" v-if="twoTerms && !selected">
              <li
                v-for="shroom in searchList"
                :key="shroom.id"
                @click="
                  () => {
                    speciesAnswer = shroom
                    selected = true
                  }
                "
              >
                {{ shroom }}
              </li>
            </ul>
          </div>
          <div class="answer-container" id="normlist">
            <div class="radio-wrapper">
              <input
                type="radio"
                id="spiselig"
                value="Spiselig"
                name="normlist"
                v-model="statusAnswer"
              />
              <label for="spiselig">Spiselig</label>
            </div>
            <div class="radio-wrapper">
              <input
                type="radio"
                id="spiselig-merknad"
                value="Spiselig med merknad"
                name="normlist"
                v-model="statusAnswer"
              />
              <label for="spiselig-merknad">Spiselig med merknad</label>
            </div>
            <div class="radio-wrapper">
              <input
                type="radio"
                id="ikke-matsopp"
                value="Ikke matsopp"
                name="normlist"
                v-model="statusAnswer"
              />
              <label for="ikke-matsopp">Ikke matsopp</label>
            </div>
            <div class="radio-wrapper">
              <input
                type="radio"
                id="giftig"
                value="Giftig"
                name="normlist"
                v-model="statusAnswer"
              />
              <label for="giftig">Giftig</label>
            </div>
            <div class="radio-wrapper">
              <input
                type="radio"
                id="meget-giftig"
                value="Meget giftig"
                name="normlist"
                v-model="statusAnswer"
              />
              <label for="meget-giftig">Meget giftig</label>
            </div>
          </div>
          <div class="answer-container" id="note">
            <h2>Angi merknad:</h2>
            <textarea
              name="merknad"
              id="merknad"
              cols="30"
              rows="4"
              v-model="noteAnswer"
            ></textarea>
          </div>
        </div>
        <div id="navigation-wrapper">
          <button class="submit" id="save" @click="showSaveDialog = true" disabled>
            <v-icon name="md-save-round" id="save-icon" />
            Lagre quiz til senere
          </button>
          <Paginator
            v-model:first="first"
            rows="10"
            totalRecords="300"
            :dt="paginatorStyle"
            @click="updateTask"
          />
          <button class="submit" id="finish" @click="showExitDialog = true">
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
  position: relative;
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
  width: 276px;
}

#search-list li:hover {
  background-color: #eee;
  cursor: pointer;
}

::v-global(.p-dialog) {
  font-family: Arial, Helvetica, sans-serif;
}

p {
  margin-top: 0;
}

#return {
  margin: 10px 5px 10px 0px;
  border: none;
  border-radius: 5px;
  background-color: #dcdcdc;
  width: fit-content;
  height: 30px;
  color: black;
  padding: 5px;
}

#exit {
  width: fit-content;
}

.button-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.image-info {
  position: absolute;
  bottom: 0px;
  right: 0px;
  font-family: Arial, Helvetica, sans-serif;
  background-color: gray;
  opacity: 0.8;
  border-radius: inherit;
  font-size: 10px;

  a {
    color: white;
  }
}
</style>
