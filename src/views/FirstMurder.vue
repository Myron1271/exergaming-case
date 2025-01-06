<template>
    <div>
      <h1>Eerste Moord</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <button @click="showModal(1)">Kijk naar de wonden op de arm</button>
      <button @click="showModal(2)">Kijk naar de buik</button>
      <button @click="showModal(3)">Maak het papierenblaadje schoon</button>
  
      <modal v-if="modalVisible" @close="closeModal">
        <p v-if="currentModal === 1">Het lijkt erop dat de dader een bot voorwerp heeft gebruikt, aangezien de sneden niet zuiver zijn. Het lijkt er ook op dat het slachtoffer mogelijk terugvocht vanwege de kneuzingen op de knokkels.</p>
        <p v-else-if="currentModal === 2">Het lijkt dat het cijfer 5 op de buik gekrast is.</p>
        <div v-else>
          <p>De dader heeft meerdere coördinaten achterlaten. Mogelijk volgende slachtoffers?</p>
          <button @click="goBackToMap">Ga terug naar de Map</button>
        </div>
      </modal>
    </div>
  </template>
  
  <script>
  import Modal from '@/components/Modal.vue';
  
  export default {
    name: 'FirstMurder',
    components: { Modal },
    data() {
      return {
        modalVisible: false,
        currentModal: null,
      };
    },
    methods: {
      showModal(modalId) {
        this.currentModal = modalId;
        this.modalVisible = true;
      },
      closeModal() {
        this.modalVisible = false;
        this.currentModal = null;
      },
      goBackToMap() {
        localStorage.setItem('visibleMarkers', JSON.stringify(['SecondMurder']));
        window.location.href = "/map";
      },
    },
  };
  </script>