<template>
    <div class="secondMurder">
      <p class="secondMurderTitle">Wie is de volgende?</p>
      <p class="secondMurderText">
        De coördinaten op het blaadje kloppen. Weer een slachtoffer.  
        De lucht is kil en zwaar. Je hebt het gevoel dat iemand je in de gaten houdt, maar er is niemand om je heen.  
        Je merkt op dat slachtoffer nog niet lang geleden om het leven gebracht.  
        <br>
        <br>
        Op de buik van het slachtoffer lijkt iets te zijn gekrast.  
      </p>
      <ion-button size="small" shape="round" @click="showModal(1)">Kijk naar de buik</ion-button>

      <modal v-if="modalVisible" @close="closeModal">
        <div v-if="currentModal === 1">
          <p><b>Je kijkt naar de buik:</b><br><br>Het lijkt er op dat het cijfer <b>1</b> op de buik is gekrast.</p>
          <ion-button size="medium" shape="round" @click="goBackToMap">Ga terug naar de Map</ion-button>
        </div>
      </modal>
    </div>
</template>
  
<script>
import Modal from '@/components/Modal.vue';

  export default {
    name: 'SecondMurder',
    components: { Modal },
    data() {
      return {
        modalVisible: false,
        currentModal: null,
      }
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
        window.location.href = "/map";
      },
    },
  };
</script>

<style scoped>
.secondMurder {
  padding: 2rem 1rem 0 1rem;
}

.secondMurder ion-button {
  text-transform: none;
}

.secondMurderTitle {
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--colorPrimary);
  margin: 0 0 1rem 0;
}

.secondMurderText {
  margin: 0 0 1rem 0;
} 
</style>