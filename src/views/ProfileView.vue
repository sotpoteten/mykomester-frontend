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
          <h2>Oppdater brukerprofil:</h2>
          <label for="firstname">Fornavn:</label>
          <input type="text" id="firstname" />
          <label for="lastname">Etternavn:</label>
          <input type="text" id="lastname" />
          <label for="email">*E-post:</label>
          <input type="text" id="email" />
          <label for="password">*Passord:</label>
          <input type="password" id="password" />
          <button class="submit">
            Lagre brukerprofil
            <v-icon name="md-save-round" />
          </button>
          <p>Felter merket med * må fylles ut.</p>
        </div>
      </div>
      <div id="right">
        <div class="content-box" id="top">
          <div id="innstillinger-wrapper">
            <h2>Standard quizinnstillinger:</h2>
            <label for="nr-of-tasks">Antall oppgaver:</label>
            <div id="radio-wrapper">
              <input type="radio" id="ten" name="nr-of-tasks" value="10" />
              <label for="ten">10</label>
              <input type="radio" id="twenty" name="nr-of-tasks" value="20" />
              <label for="twenty">20</label>
              <input type="radio" id="thirty" name="nr-of-tasks" value="30" checked />
              <label for="thirty">30</label>
              <input type="radio" id="fourty" name="nr-of-tasks" value="40" />
              <label for="fourty">40</label>
              <input type="radio" id="fifty" name="nr-of-tasks" value="50" />
              <label for="fifty">50</label>
            </div>
            <label for="species">Sopparter:</label>
            <select name="species" id="species">
              <option value="Hele pensum">Hele pensum</option>
              <option value="Spiselige">Spiselige</option>
              <option value="Matsopp">Matsopp</option>
              <option value="Giftige">Giftige</option>
            </select>
            <label for="quiz-mode">Quizmodus:</label>
            <select name="quiz-mode" id="quiz-mode">
              <option value="Artsbestemmelse og normlistestatus">
                Artsbestemmelse og normlistestatus
              </option>
              <option selected="Kun artsbestemmelse">Kun artsbestemmelse</option>
              <option value="Kun normlistestatus">Kun normlistestatus</option>
              <option value="Forgiftningsforløp">Forgiftningsforløp</option>
            </select>
            <label for="answer-mode">Svarmodus:</label>
            <select name="answer-mode" id="answer-mode">
              <option selected="Søk og valg">Søk og valg</option>
              <option value="Flervalg (4 alternativer)">Flervalg (4 alternativer)</option>
              <option value="Fritekst">Fritekst</option>
            </select>
            <button class="submit" id="save">
              Lagre innstillinger
              <v-icon name="md-save-round" />
            </button>
          </div>
        </div>
        <div class="content-box" id="bottom">
          <button class="submit" id="logout">
            Logg ut
            <v-icon name="md-logout-round" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#left {
  background-color: #955e42;
  width: 60%;
  margin-bottom: 10px;
  margin-left: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}

#right {
  display: flex;
  flex-direction: column;
  width: 60%;
}

#top {
  background-color: #9c914f;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#bottom {
  background-color: #553739;
  height: 20%;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

p {
  margin: 0px;
  font-family: Arial, Helvetica, sans-serif;
}

#innstillinger-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  label {
    margin: 5px;
  }
}

input[type='radio'] {
  margin: 3px 3px 3px 20px;
  accent-color: black;
}

select {
  width: 100%;
  font-size: 15px;
  border-radius: 5px;
  border: none;
  height: 25px;
}

#radio-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

#save {
  background-color: #553739;
  color: white;
}

#logout {
  width: 50%;
}

svg {
  margin-left: 10px;
}
</style>
