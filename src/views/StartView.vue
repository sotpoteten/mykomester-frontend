<script setup>
import NavBar from '@/components/NavBarLoggedIn.vue'
import '@/assets/main.css'
</script>

<template>
  <div class="flex-container">
    <div class="header">
      <NavBar></NavBar>
    </div>
    <div class="main">
      <div class="content-box" id="left">
        <div class="wrapper">
          <h3>Antall oppgaver: {{ 30 }}</h3>
          <h3>Arter: {{ 'Hele pensum' }}</h3>
          <h3>Quizmodus: {{ 'Standard' }}</h3>
          <h3>Svarmodus: {{ 'Standard' }}</h3>
          <button id="startquiz">Start quiz</button>
          <div id="avansert-wrapper">
            <v-icon name="bi-caret-down-fill" />
            <h3>Avanserte innstillinger</h3>
          </div>
          <div id="innstillinger-wrapper">
            <label for="nr-of-tasks">Antall oppgaver:</label>
            <div id="radio-wrapper">
              <input class="radio" type="radio" id="ten" name="nr-of-tasks" />
              <label for="ten">10</label>
              <input type="radio" id="twenty" name="nr-of-tasks" />
              <label for="twenty">20</label>
              <input type="radio" id="thirty" name="nr-of-tasks" />
              <label for="thirty">30</label>
              <input type="radio" id="fourty" name="nr-of-tasks" />
              <label for="fourty">40</label>
              <input type="radio" id="fifty" name="nr-of-tasks" />
              <label for="fifty">50</label>
            </div>
            <label for="species">Sopparter</label>
            <select name="species" id="species">
              <option value="volvo">Hele pensum</option>
              <option value="saab">Spiselige</option>
              <option value="opel">Matsopp</option>
              <option value="opel">Giftige</option>
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
  width: 125%;
  font-size: 25px;
  padding: 10px 0px;
}

#avansert-wrapper {
  display: flex;
  flex-direction: row;
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
}

label {
  margin: 5px;
}
</style>
