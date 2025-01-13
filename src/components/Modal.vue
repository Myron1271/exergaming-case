<template>
  <div class="modal-overlay">
    <div class="modal">
      <slot></slot>
      <ion-button shape="round" v-if="!$route.meta.hideButton" @click="$emit('close')">Sluiten</ion-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  width: 85%;
  text-align: center;
}

ion-button {
  text-transform: none;
}

</style>