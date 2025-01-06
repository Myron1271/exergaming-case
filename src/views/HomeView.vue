<template>
    <div class="home">
      <div v-if="!locationGranted">
        <h1>We hebben je locatie nodig voor deze app.</h1>
        <button @click="requestLocation">Sta toe</button>
      </div>
      <div v-else>
        <h1>Welkom bij Clue on the Move</h1>
        <p>Vul je naam in en begin.</p>
        <input v-model="name" placeholder="Je naam" />
        <button :disabled="!name" @click="startGame">Begin</button>
      </div>
    </div>
  </template>
  
  <script>
  import { Geolocation } from '@capacitor/geolocation';
  
  export default {
    name: 'HomeView',
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