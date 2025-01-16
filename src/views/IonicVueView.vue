<template>
  <div v-if="visible" class="toast-container">
    <div class="toast-message">
      <b>Achievement Ontgrendeld!</b>
      <br>
      <i>Wat een manier om te beginnen...</i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  mounted() {
    this.showToast();
  },
  methods: {
    showToast() {
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 4000); // Hide after 2 seconds
    },
  },
};
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 90%;
}

.toast-message {
  background-color: #333;
  color: #fff;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  text-align: center;
  animation: slide-in 0.3s ease-out, fade-out 0.3s ease-in 1.7s forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes fade-out {
  to {
    opacity: 0;
  }
}
</style>