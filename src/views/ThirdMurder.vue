<template>
    <div>
      <h1>Third Murder</h1>
      <p>Het lijk erop op dit slachtoffer wederom iets op de buik gekrast is. Het slachtoffer lijkt ook iets in de hand te hebben.</p>
      <button @click="showModal(1)">Bekijk het cijfer op de buik</button>
      <button @click="showModal(2)">Bekijk het doosje</button>
  
      <modal v-if="modalVisible" @close="closeModal">
        <p v-if="currentModal === 1">Het lijkt erop dat het cijfer 4 op de buik gekrast is.</p>
        <div v-else>
          <p>Het slachtoffer houdt een doosje vast met een slotje eraan. Het slotje heeft 3 cijfers nodig.</p>
          <input type="text" v-model="code" placeholder="Voer 3 cijfers in" maxlength="3" />
          <button @click="checkCode">Probeer</button>
        </div>
      </modal>
    </div>
</template>
  
<script>
  import Modal from '@/components/Modal.vue';
  
  export default {
    name: 'ThirdMurder',
    components: { Modal },
    data() {
      return {
        modalVisible: false,
        currentModal: null,
        code: '',
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
      checkCode() {
        if (this.code === '514') {
          alert('Het doosje is open, er zit een blaadje in met nieuwe coördinaten.');
          window.location.href = "/map";
        } else {
          alert('Foutieve code. Probeer opnieuw.');
        }
      },
    },
  };
</script>
  