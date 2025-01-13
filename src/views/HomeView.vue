<template>
    <div class="homeContainer">
      <div class="homeContent">
        <div class="homeTitle">
          <h1>Clue On The Move</h1>
        </div>
        <div class="homeLocatiePermissie" v-if="!locationGranted">
          <p class="locatiePermissieTitle" >Locatie Permissie</p>
          <p class="locatiePermissieText" >Om Clue On The Move te gebruiken, hebben we toegang tot je locatie nodig. Wees gerust, we volgen je locatie alleen jij de app gebruikt.</p>
          <ion-button size="medium" shape="round" @click="requestLocation">
            <p>Toestemming Verlenen</p>
          </ion-button>
        </div>
        <div class="homeNaam" v-else>
          <p class="homeNaamTitle">Wat je naam?</p>
          <p class="homeNaamText">We kunnen bijna aan de slag! Vul je naam in en klik op begin.</p>
          <ion-input align="left" v-model="name" placeholder="Je naam" />
          <ion-button size="medium" shape="round" :disabled="!name" @click="startGame">
            Start!
          </ion-button>
        </div>
        <div></div>
      </div>
    </div>
</template>
  
  <script>
  import { Geolocation } from '@capacitor/geolocation';
  import { IonButton, IonInput } from '@ionic/vue';

  
  export default {
    name: 'HomeView',
    components: {
      IonButton,
      IonInput,
    },
    data() {
      return {
        locationGranted: localStorage.getItem('locationGranted') === 'true',
        name: localStorage.getItem('userName') || '',
      };
    },
    mounted() {
      if (this.locationGranted && this.name) {
        this.$router.push('/map');
      }
    },
    methods: {
      async requestLocation() {
        try {
          await Geolocation.requestPermissions();
          this.locationGranted = true;
          localStorage.setItem('locationGranted', 'true');
        } catch (err) {
          console.error('Location permission denied', err);
        }
      },
      startGame() {
        localStorage.setItem('userName', this.name);
        this.$router.push('/map');
      },
    },
  };
  </script>

<style scoped>
  .homeContainer {
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
    height: 100vh;
    width: 100%;
  }

  .homeContent {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    height: 100vh;
  }

  .homeTitle h1 {
    color: var(--colorPrimary);
    text-transform: uppercase;
    font-weight: bold;
  }

  .homeLocatiePermissie {
    margin: -50px 0 0 0;
  }

  .homeLocatiePermissie p {
    text-transform: none;
    text-align: left;
    margin: 0;
    padding: 0 1rem 0 1rem;
  }

  .locatiePermissieTitle {
    font-weight: bold;
    font-size: 1.1rem;
    color: var(--colorPrimary);
  }

  .locatiePermissieText {
    margin: 0.3rem 0 1rem 0 !important;
  }

  .homeNaam {
    margin: -50px 0 0 0;
    padding: 0 1rem 0 1rem;
  }

  .homeNaam p {
    text-align: left;
    margin: 0;
  }
  
  ion-button {
    text-transform: none;
    margin: 0.8rem 0 0 0;
  }

  ion-input {
    font-weight: bold;
  }

  .homeNaamTitle {
    font-weight: bold;
    font-size: 1.1rem;
    color: var(--colorPrimary);
  }

  .homeNaamText {
    margin: 0.3rem 0 0.2rem 0 !important;
  }
</style>