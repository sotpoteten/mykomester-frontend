<script setup>
import NavBar from '@/components/NavBarLoggedIn.vue'
import '@/assets/main.css'
import { ref } from 'vue'

const numOfTasks = ref('30')
const species = ref('Hele pensum')
const quizMode = ref('Artsbestemmelse og normlistestatus')
const answerMode = ref('Søk og valg')
const settings = ref(false)

const toggleSettings = () => {
  settings.value = !settings.value
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
          <button id="startquiz">Start quiz</button>
          <div id="avansert-wrapper" @click="toggleSettings">
            <v-icon name="bi-caret-down-fill" v-if="!settings" />
            <v-icon name="bi-caret-up-fill" v-if="settings" />
            <h3>Avanserte innstillinger</h3>
          </div>
          <div id="innstillinger-wrapper" v-if="settings">
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
            <select name="species" id="species" v-model="species">
              <option value="Hele pensum">Hele pensum</option>
              <option value="Spiselige">Spiselige</option>
              <option value="Matsopp">Matsopp</option>
              <option value="Giftige">Giftige</option>
            </select>
            <label for="quiz-mode">Quizmodus:</label>
            <select name="quiz-mode" id="quiz-mode" v-model="quizMode">
              <option value="Artsbestemmelse og normlistestatus">
                Artsbestemmelse og normlistestatus
              </option>
              <option selected="Kun artsbestemmelse">Kun artsbestemmelse</option>
              <option value="Kun normlistestatus">Kun normlistestatus</option>
              <option value="Forgiftningsforløp">Forgiftningsforløp</option>
            </select>
            <label for="answer-mode">Svarmodus:</label>
            <select name="answer-mode" id="answer-mode" v-model="answerMode">
              <option selected="Søk og valg">Søk og valg</option>
              <option value="Flervalg (4 alternativer)">Flervalg (4 alternativer)</option>
              <option value="Fritekst">Fritekst</option>
            </select>
          </div>
        </div>
      </div>
      <div id="right">
        <div class="content-box" id="top"></div>
        <div class="content-box" id="bottom"></div>
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
}

#bottom {
  background-color: #9c914f;
  height: 50%;
  margin-bottom: 10px;
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
</style>
