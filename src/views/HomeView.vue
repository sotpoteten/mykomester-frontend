<script setup>
import NavBar from '@/components/NavBar.vue'
import '@/assets/main.css'
</script>

<template>
  <div class="flex-container">
    <div class="header">
      <NavBar></NavBar>
    </div>
    <div class="main">
      <div class="content-box" id="left">
        <h1>Velkommen til MykoMester!</h1>
        <ul>
          <li>Her kan du teste og forbedre din kunnskap om sopp.</li>
          <li>
            Her kan du få generert quizzer av valgfri lengde hvor du kan få utføre både
            artsbestemmelse og angi normlistestatus.
          </li>
          <li>Quizzene autogenereres med bilder av alle sopper på normlisten.</li>
          <li>Mykomesters database inneholder over 5000 ulike soppbilder som du kan testes på.</li>
          <li>Kan brukes som forberedelse til Soppsakkyndigprøven eller bare for moro skyld.</li>
        </ul>
      </div>
      <div id="right">
        <div class="content-box" id="top">
          <h1>Den beste forberedelsen til Soppsakkyndigprøven!</h1>
          <ul>
            <li>Innhold og funksjonalitet er tilpasset for å etterligne prøven.</li>
          </ul>
        </div>
        <div class="content-box" id="mid">
          <h3>
            Brukes realistiske bilder fra
            <a href="https://artsobservasjoner.no">artsobservasjoner.no</a>:
          </h3>
          <div id="img-container">
            <div id="img-wrapper">
              <img
                src="https://artsobservasjoner.no/MediaLibrary/2023/9/36d33e21-8202-46a5-b295-ae7c12a116a2_image.jpg"
                alt="Soppbilde"
              />
              <div class="image-info">
                Foto: Theodor Korsgaard. Gjenbruk iht.
                <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
              </div>
            </div>
            <div id="img-wrapper">
              <img
                src="https://artsobservasjoner.no/MediaLibrary/2024/8/0c8835df-11ca-4552-8102-93a3c7167759_image.jpg"
                alt="Soppbilde"
              />
              <div class="image-info">
                Foto: Bjørn Eidhammer. Gjenbruk iht.
                <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
              </div>
            </div>
            <div id="img-wrapper">
              <img
                src="https://artsobservasjoner.no/MediaLibrary/2024/7/c21ee36c-8a00-43d3-99a3-a56e8fd6ba02_image.jpg"
                alt="Soppbilde"
              />
              <div class="image-info">
                Foto: Jan Alsvik. Gjenbruk iht.
                <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
              </div>
            </div>
            <div id="img-wrapper">
              <img
                src="https://artsobservasjoner.no/MediaLibrary/2020/8/5238a4bf-a282-4cfa-9d20-3afde5e5f805_image.jpg"
                alt="Soppbilde"
              />
              <div class="image-info">
                Foto: Bente Rian. Gjenbruk iht.
                <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
              </div>
            </div>
          </div>
        </div>
        <div class="content-box" id="bottom">
          <ul>
            <li>
              Applikasjonen er utviklet i forbindelse med en bacheloroppgave ved NTNU våren 2025
            </li>
            <li>
              Er du interessert i å bidra med videreutviling? Ta kontakt
              <a href="mailto:isakjons0408@gmail.com">her</a>.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#left {
  background-color: #9c914f;
  flex-grow: 2;
  margin-bottom: 10px;
  margin-left: 10px;
  padding: 20px;
  flex-direction: column;
}

#right {
  display: flex;
  flex-direction: column;
  flex-grow: 3;
  height: 100%;
}

#top {
  background-color: #553739;
  height: 40%;
  color: white;
  padding: 20px;
  flex-direction: column;
}

#mid {
  background-color: #955e42;
  height: 40%;
  padding: 20px;
  flex-direction: column;
}

#bottom {
  background-color: #748e54;
  height: 20%;
  margin-bottom: 10px;
}

h1 {
  font-weight: normal;
  margin-top: 0;
}

h3 {
  font-weight: normal;
  margin-top: 0;
}

a {
  color: black;
}

.image-info {
  position: absolute;
  bottom: 0px;
  right: 0px;
  font-family: Arial, Helvetica, sans-serif;
  background-color: gray;
  opacity: 0.8;
  border-radius: inherit;
  font-size: 8px;
  padding: 1px;

  a {
    color: white;
  }
}

#img-wrapper {
  display: flex;
  justify-content: center;
  height: 100%;
  margin-bottom: 10px;
  position: relative;
  margin-right: 10px;
}

img {
  display: flex;
  height: 100%;
  border-radius: 10px;
  box-shadow: 2px 2px 2px black;
}

#img-container {
  display: flex;
  flex-direction: row;
  height: 80%;
}

li {
  font-size: 20px;
}
</style>
