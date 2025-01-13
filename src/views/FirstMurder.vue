<template>
    <div class="firstMurder">
      <h1 class="firstMurderTitle">En zo begint het</h1>
      <p class="firstMurderText">
        Je nadert de plaats delict en wordt meteen getroffen door de kille stilte die in de lucht hangt.
        Iets aan de scène voelt onheilspellend. De omgeving lijkt zorgvuldig gekozen. Er zijn duidelijke sporen van een gevecht,
        maar ook aanwijzingen die erop wijzen dat de dader meer tijd heeft genomen dan normaal. 
        Het is alsof elke stap, elk detail, een boodschap bevat die naar jou gericht is.
        <br>
        <br>
        Je weet dat elk detail belangrijk kan zijn.
        Wat je hier vindt, kan je mogelijk dichter bij de dader brengen, 
      </p>
      <ion-button size="small" shape="round" @click="showModal(1)">Kijk naar de wonden op de arm</ion-button>
      <ion-button size="small" shape="round" @click="showModal(2)">Kijk kneuzingen op de handen</ion-button>
      <ion-button size="small" shape="round" @click="showModal(3)">Kijk naar de buik</ion-button>
      <ion-button size="small" shape="round" @click="showModal(4)">Maak het papierenblaadje schoon</ion-button>
  
      <modal v-if="modalVisible" @close="closeModal">
        <p v-if="currentModal === 1">Het lijkt erop dat de dader een bot voorwerp heeft gebruikt, aangezien de sneden niet zuiver zijn.</p>
        <p v-else-if="currentModal === 2">Volgens de kneuzing lijkt er ook op dat het slachtoffer mogelijk terugvocht.</p>
        <p v-else-if="currentModal === 3">Het lijkt dat het cijfer 5 op de buik gekrast is.</p>
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

<style scoped>
  .firstMurder {
    padding: 0 1rem 0 1rem;
  }

  .firstMurderTitle {
    font-weight: bold;
    font-size: 1.1rem;
    color: var(--colorPrimary);
  }
  }
</style>