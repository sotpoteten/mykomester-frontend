<script setup>
import '@/assets/main.css'
import Paginator from 'primevue/paginator'
import { ref, computed } from 'vue'
import Dialog from 'primevue/dialog'
import router from '@/router/index.js'
import axios from 'axios'
import { useTokenStore } from '@/stores/token.js'
import { ip } from '@/utils/httputils.js'
import { onKeyStroke } from '@vueuse/core'
import Popover from 'primevue/popover'

const tokenStore = useTokenStore()
const tasks = ref([])
const imgurls = ref([])
const photographers = ref([])
const taskNr = ref(1)
const first = ref(0)
const currentTask = ref(1)
const speciesAnswer = ref('')
const statusAnswer = ref(null)
const noteAnswer = ref(null)
const quizData = ref(null)
const nrOfTasks = ref(0)
const onlySpecies = ref(false)
const onlyNormlist = ref(false)
const speciesName = ref('')
taskNr.value = computed(() => (first.value + 10) / 10)
let allSpecies = []
const radioRefs = ref([])
const radioFocus = ref(0)

;(async () => {
  try {
    await router.push('/quiz')
    const quizResponse = await axios.get(
      `http://${ip}:8080/quizzes/user/latest/` + tokenStore.getUser(),
      tokenStore.getAuthorizationConfig(),
    )

    quizData.value = quizResponse.data
    nrOfTasks.value = quizData.value.nrOfTasks
    tasks.value = quizData.value.tasks

    imgurls.value = tasks.value[taskNr.value.value - 1].pictureUrls.split(',')
    photographers.value = tasks.value[taskNr.value.value - 1].photographers.split(',')
    speciesName.value = tasks.value[taskNr.value.value - 1].speciesName

    if (quizData.value.quizMode == 'ARTSBESTEMMELSE') onlySpecies.value = true
    else if (quizData.value.quizMode == 'NORMLISTESTATUS') onlyNormlist.value = true

    if (tasks.value[0].answeredSpecies == null) {
      speciesAnswer.value = ''
      selected.value = false
    } else {
      speciesAnswer.value = tasks.value[0].answeredSpecies
      selected.value = true
    }
    if (tasks.value[0].answeredCategory == null) {
      statusAnswer.value = ''
    } else {
      statusAnswer.value = tasks.value[0].answeredCategory
    }
    if (tasks.value[0].answeredNote == null) {
      noteAnswer.value = ''
    } else {
      noteAnswer.value = tasks.value[0].answeredNote
    }

    if (!onlyNormlist.value) {
      speciesField.value.focus()
    }

    for (let i = 0; i < 5; i++) {
      radioRefs.value.push(ref())
    }
  } catch (error) {
    console.error(error)
  }
})()
;(async () => {
  try {
    const speciesResponse = await axios.get(
      `http://${ip}:8080/species_names`,
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
  gap: '10',
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
      width: '40px',
      height: '24px',
      border: {
        radius: '5px',
      },
    },
  },
})

const searchResults = computed(() => allSpecies.filter(checkOccurance))
const searchList = computed(() => {
  if (searchResults.value.length > 4) {
    return searchResults.value.slice(0, 4)
  } else {
    return searchResults.value
  }
})

const twoTerms = computed(() => speciesAnswer.value.length > 1)
const selected = ref(true)

function checkOccurance(mush) {
  var filter = speciesAnswer.value.toUpperCase()
  return mush.toUpperCase().indexOf(filter) > -1
}

function updateTask() {
  //save answers in task array
  if (speciesAnswer.value == '') {
    tasks.value[currentTask.value - 1].answeredSpecies = null
  } else {
    tasks.value[currentTask.value - 1].answeredSpecies = speciesAnswer.value
  }
  if (statusAnswer.value == '') {
    tasks.value[currentTask.value - 1].answeredCategory = null
  } else {
    tasks.value[currentTask.value - 1].answeredCategory = statusAnswer.value
  }
  if (noteAnswer.value == '') {
    tasks.value[currentTask.value - 1].answeredNote = null
  } else {
    tasks.value[currentTask.value - 1].answeredNote = noteAnswer.value
  }

  //Get image-info for new task
  imgurls.value = tasks.value[taskNr.value.value - 1].pictureUrls.split(',')
  photographers.value = tasks.value[taskNr.value.value - 1].photographers.split(',')
  speciesName.value = tasks.value[taskNr.value.value - 1].speciesName

  //Get saved values for answers
  currentTask.value = taskNr.value.value
  if (tasks.value[currentTask.value - 1].answeredSpecies == null) {
    speciesAnswer.value = ''
    selected.value = false
  } else {
    speciesAnswer.value = tasks.value[currentTask.value - 1].answeredSpecies
    selected.value = true
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

  if (!onlyNormlist.value) {
    speciesField.value.focus()
    selectedIndex.value = -1
  }
}

async function onFinish() {
  updateTask()
  quizData.value.timeFinished = new Date()

  await axios.put(
    `http://${ip}:8080/quizzes/` + quizData.value.id,
    quizData.value,
    tokenStore.getAuthorizationConfig(),
  )

  router.push('/resultater')
}

function capitalizeFirstLetter(input) {
  return String(input).charAt(0).toUpperCase() + String(input).slice(1)
}

const selectedIndex = ref(-1)
const speciesField = ref()

const scrollListDown = (event) => {
  event.preventDefault
  if (selectedIndex.value == -1 || selectedIndex.value == 3) selectedIndex.value = 0
  else selectedIndex.value++
}

const scrollListUp = (event) => {
  event.preventDefault
  if (selectedIndex.value == -1 || selectedIndex.value == 0) selectedIndex.value = 3
  else selectedIndex.value--
}

const selectByEnter = (event) => {
  event.preventDefault
  speciesAnswer.value = searchList.value[selectedIndex.value]
  selected.value = true
}

onKeyStroke(['PageDown'], (e) => {
  if (e.key === 'PageDown') {
    e.preventDefault()
  }
  if (first.value == nrOfTasks.value * 10 - 10) {
    return
  }
  first.value += 10
  updateTask()
})

onKeyStroke(['l'], (e) => {
  if (selected.value == false) return
  if (e.key === 'l') {
    e.preventDefault()
  }
  if (first.value == nrOfTasks.value * 10 - 10) {
    return
  }
  first.value += 10
  updateTask()
})

onKeyStroke(['PageUp'], (e) => {
  if (e.key === 'PageUp') {
    e.preventDefault()
  }
  if (first.value == 0) {
    return
  }
  first.value -= 10
  updateTask()
})

onKeyStroke(['h'], (e) => {
  if (selected.value == false) return
  if (e.key === 'h') {
    e.preventDefault()
  }
  if (first.value == 0) {
    return
  }
  first.value -= 10
  updateTask()
})

onKeyStroke(['End'], (e) => {
  if (e.key === 'End') {
    e.preventDefault()
  }
  showExitDialog.value = true
})

onKeyStroke(['k'], (e) => {
  if (selected.value == false) return
  if (e.key === 'k') {
    e.preventDefault()
  }
  if (radioFocus.value == 4) radioFocus.value = 0
  else radioFocus.value++
  radioRefs.value[radioFocus.value].value.focus()
  statusAnswer.value = radioRefs.value[radioFocus.value].value.value
})

onKeyStroke(['j'], (e) => {
  if (selected.value == false) return
  if (e.key === 'j') {
    e.preventDefault()
  }
  if (radioFocus.value == 0) radioFocus.value = 4
  else radioFocus.value--
  radioRefs.value[radioFocus.value].value.focus()
  statusAnswer.value = radioRefs.value[radioFocus.value].value.value
})

onKeyStroke(['Tab'], (e) => {
  if (selected.value == false || statusAnswer.value != '') return
  if (e.key === 'Tab') {
    e.preventDefault()
  }
  radioRefs.value[radioFocus.value].value.focus()
  statusAnswer.value = radioRefs.value[radioFocus.value].value.value
})

const tips = ref()

const toggleTips = (event) => {
  tips.value.toggle(event)
}

const zoomImgs = ref([false, false, false])
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
      <button class="submit" id="exit" @click="onFinish">Avslutt</button>
    </div>
  </Dialog>
  <Dialog v-model:visible="showSaveDialog" modal header="Vil du lagre?" :style="{ width: '25rem' }">
    <p>Du blir nå sendt ut av quizen, men svarene lagres til senere.</p>
    <div class="button-wrapper">
      <button class="submit" id="return" @click="showSaveDialog = false">Tilbake</button>
      <button class="submit" id="exit" @click="router.push('/start')">Avslutt</button>
    </div>
  </Dialog>
  <Popover ref="tips">
    <div class="tips">
      <h4>Klikk på bildet for å zoome.</h4>
      <h4>Bruk tastatursnarveier for enkel navigasjon:</h4>
      <p><b>TAB</b> for å gå til neste input-felt</p>
      <p><b>SHIFT</b>+<b>TAB</b> for å gå tilbake til forrige input-felt</p>
      <p>
        <b>OPP</b> eller <b>J</b> & <b>NED</b> eller <b>K</b> for å bla mellom normlistestatuser
      </p>
      <p><b>PAGEDOWN</b> eller <b>L</b> for å gå til neste oppgave</p>
      <p><b>PAGEUP</b> eller <b>H</b> for å gå til forrige oppgave</p>
      <p><b>END</b> for å avslutte quizzen</p>
    </div>
  </Popover>
  <div class="flex-container">
    <div class="main">
      <div class="content-box" id="center">
        <div id="header-wrapper">
          <div class="tips-icon" style="visibility: hidden">
            <v-icon name="md-tipsandupdates" scale="2" />
          </div>
          <div id="header">
            <h1>Oppgave {{ taskNr }}</h1>
            <h1 v-if="onlyNormlist">: {{ capitalizeFirstLetter(speciesName) }}</h1>
          </div>
          <div class="tips-icon" @mouseenter="toggleTips" @mouseleave="toggleTips">
            <v-icon name="md-tipsandupdates" scale="2" />
          </div>
        </div>
        <div id="img-container">
          <div class="img-wrapper" v-for="(url, index) in imgurls" :key="url">
            <img
              v-bind:src="url"
              alt="Soppbilde"
              @click="zoomImgs[index] = !zoomImgs[index]"
              id="smallImg"
              :class="{ hidden: zoomImgs[index] }"
            />
            <img
              v-bind:src="url"
              alt="Soppbilde_stort"
              @click="zoomImgs[index] = !zoomImgs[index]"
              class="imgZoom"
              :id="'imgZoom' + index.toString()"
              v-if="zoomImgs[index]"
            />
            <div class="image-info" ref="imgInfo" :class="{ hidden: zoomImgs[index] }">
              Foto: {{ photographers[index] }}. Gjenbruk iht.
              <a href="https://creativecommons.org/licenses/by/4.0/" tabindex="-1">CC BY 4.0</a>
            </div>
          </div>
        </div>
        <div id="container-wrapper">
          <div class="answer-container" id="species" v-if="!onlyNormlist">
            <h2>Velg soppart:</h2>
            <input
              type="search"
              size="30"
              v-model="speciesAnswer"
              @keyup="searchFilter"
              @click="selected = false"
              @keydown.down="scrollListDown"
              @keydown.up="scrollListUp"
              @keydown.enter="selectByEnter"
              @keydown.backspace="selected = false"
              ref="speciesField"
            />
            <ul id="search-list" v-if="twoTerms && !selected">
              <li
                v-for="(shroom, index) in searchList"
                :key="shroom.id"
                @click="
                  () => {
                    speciesAnswer = shroom
                    selected = true
                  }
                "
                :class="{ selected: selectedIndex == index }"
              >
                {{ capitalizeFirstLetter(shroom) }}
              </li>
            </ul>
            <p id="search-info" v-if="!(twoTerms && !selected)">Skriv inn to tegn for å søke</p>
          </div>
          <div class="answer-container" id="normlist" v-if="!onlySpecies">
            <div class="radio-wrapper">
              <input
                type="radio"
                id="spiselig"
                value="SPISELIG"
                name="normlist"
                v-model="statusAnswer"
                :ref="radioRefs[0]"
              />
              <label for="spiselig">Spiselig</label>
            </div>
            <div class="radio-wrapper">
              <input
                type="radio"
                id="spiselig-merknad"
                value="SPISELIG_MED_MERKNAD"
                name="normlist"
                v-model="statusAnswer"
                :ref="radioRefs[1]"
              />
              <label for="spiselig-merknad">Spiselig med merknad</label>
            </div>
            <div class="radio-wrapper">
              <input
                type="radio"
                id="ikke-matsopp"
                value="IKKE_MATSOPP"
                name="normlist"
                v-model="statusAnswer"
                :ref="radioRefs[2]"
              />
              <label for="ikke-matsopp">Ikke matsopp</label>
            </div>
            <div class="radio-wrapper">
              <input
                type="radio"
                id="giftig"
                value="GIFTIG"
                name="normlist"
                v-model="statusAnswer"
                :ref="radioRefs[3]"
              />
              <label for="giftig">Giftig</label>
            </div>
            <div class="radio-wrapper">
              <input
                type="radio"
                id="meget-giftig"
                value="MEGET_GIFTIG"
                name="normlist"
                v-model="statusAnswer"
                :ref="radioRefs[4]"
              />
              <label for="meget-giftig">Meget giftig</label>
            </div>
          </div>
          <div class="answer-container" id="note" v-if="!onlySpecies">
            <h2>Angi merknad:</h2>
            <textarea
              name="merknad"
              id="merknad"
              cols="30"
              rows="4"
              v-model="noteAnswer"
              :disabled="statusAnswer != 'SPISELIG_MED_MERKNAD'"
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
            :rows="10"
            :totalRecords="nrOfTasks * 10"
            :dt="paginatorStyle"
            @click="updateTask"
          >
            <template #previcon> Forrige oppgave </template>
            <template #nexticon> Neste oppgave </template>
          </Paginator>
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
  margin: 10px 0px 10px 0px;
}

#header-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}

#img-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 50%;
  justify-content: center;
  align-items: center;
}

.img-wrapper {
  display: flex;
  justify-content: center;
  height: 100%;
  margin-bottom: 10px;
  position: relative;
  margin: 0px 5px 0px 5px;
  /*max-width: 32%;*/
}

img {
  display: flex;
  height: 100%;
  border-radius: 10px;
  box-shadow: 2px 2px 2px black;
  max-width: 100%;
  aspect-ratio: initial;
}

img:hover {
  cursor: zoom-in;
}

.imgZoom {
  height: 97vh;
  position: fixed;
  top: 10px;
  margin-bottom: 10px;
  z-index: 1;
}

.imgZoom:hover {
  cursor: zoom-out;
}

#imgZoom0 {
  left: 10px;
}

#imgZoom2 {
  right: 10px;
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
  background-color: #ddd;
  cursor: pointer;
}

::v-global(.p-dialog) {
  font-family: Arial, Helvetica, sans-serif;
}

::v-global(.p-paginator-page),
::v-global(.p-paginator-next),
::v-global(.p-paginator-prev),
::v-global(.p-paginator-last),
::v-global(.p-paginator-first) {
  margin: 3px !important;
}

::v-global(.p-paginator-next),
::v-global(.p-paginator-prev) {
  padding-left: 5px !important;
  padding-right: 5px !important;
  font-weight: bold;
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
  padding: 1px;

  a {
    color: white;
  }
}

#search-info {
  margin-top: 5px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: small;
}

#search-list {
  .selected {
    background-color: #ddd;
  }
}

.tips-icon {
  margin: 10px;
}

.tips {
  font-family: Arial, Helvetica, sans-serif;
  display: block;

  h4 {
    margin-top: 5px;
  }
}

.hidden {
  visibility: hidden;
}

#header {
  display: flex;
  flex-direction: row;
}
</style>
