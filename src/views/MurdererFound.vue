<template>
  <div v-if="visible" class="toast-container">
    <div class="toast-message">
      <b style="font-size: 16px;">Achievement Ontgrendeld!</b>
      <br>
      <i>Marathon</i>
    </div>
  </div>
  <div class="murdererFound">
    <p class="murdererFoundTitle">Zou dit hem zijn?</p>
    <p class="murdererFoundText" v-typemachine>
      Je komt aan op de plek waar de coördinaten je uit het doosje naartoe hebben geleid.  
      De plek voelt rustig en rustgevend aan. Gelukkig zie je geen slachtoffers.  
      <br>
      Totdat je ineens een stem achter je hoort:  
      <br>
      <i>"Welkom, {{ userName }},
        je bent sneller dan ik dacht. Maar dit is nog niet het einde."</i>
      <br>
      <br>
      Hij begint te praten over zijn motieven, zichzelf noemt hij zich "rechtvaardig".
      <br>
      <i>"Ze waren niet onschuldig. Geen van hen. Dit alles is slechts een stap in een veel groter spel!"</i>
      <br>
      <br>
      Plotseling maakt hij een beweging en gooit iets op de grond. 
      Een rookbom vult de plek, gevolgd door een plotselinge vlam. 
      Terwijl de rook langzaam verdwijnt, realiseer je je dat hij verdwenen is.
      <br>
      Het enige wat je ziet is iets glinsteren op de grond.      
    </p>
    <ion-button size="small" shape="round" color="medium" @click="startSpeak">Lees voor</ion-button>
    <ion-button size="small" shape="round" color="danger" v-if="startedSpeaking" @click="stopSpeaking">Stop</ion-button>
    <br>
    <ion-button size="small" shape="round" @click="showModal(1)">Kijk naar het object op de grond</ion-button>
    

    <modal v-if="modalVisible" @close="closeModal">
      <div v-if="currentModal === 1">
        <p v-typemachine><b>Je bekijkt het object:</b><br><br>Het object is een klein metaal plaatje met erop gekrast: 
          <br>
          <b>
            <i>"Alles eindigt waar het begon."</i>
          </b>
        </p>
        <ion-button size="medium" shape="round" @click="goBackToMap">Ga terug naar de Map</ion-button>
      </div>
      <div v-if="currentModal === 1" class="toast-container">
        <div class="toast-message">
          <b style="font-size: 16px;">Achievement Ontgrendeld!</b>
          <br>
          <i>Oog in Oog</i>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import { TextToSpeech } from '@capacitor-community/text-to-speech';
  import Modal from '@/components/Modal.vue';

export default {
  name: 'MurdererFound',
  components: { Modal },
  data() {
    return {
      visible: false,
      modalVisible: false,
      currentModal: null,
      userName: localStorage.getItem('userName'),
      text: `
      Je komt aan op de plek waar de coördinaten je uit het doosje naartoe hebben geleid.  
      De plek voelt rustig en rustgevend aan. Gelukkig zie je geen slachtoffers.  
      Totdat je ineens een stem achter je hoort:  
      Welkom,
      je bent sneller dan ik dacht. Maar dit is nog niet het einde.
      Hij begint te praten over zijn motieven, zichzelf noemt hij zich rechtvaardig.
      Ze waren niet onschuldig. Geen van hen. Dit alles is slechts een stap in een veel groter spel.
      Plotseling maakt hij een beweging en gooit iets op de grond. 
      Een rookbom vult de plek, gevolgd door een plotselinge vlam. 
      Terwijl de rook langzaam verdwijnt, realiseer je je dat hij verdwenen is.
      Het enige wat je ziet is iets glinsteren op de grond. 
        `,
        startedSpeaking: false,
    }
  },
  mounted() {
    this.showToast();
  },
  directives: {
    typemachine: {
      mounted(el) {
        const text = el.innerHTML;
        const container = document.createElement('div');
        container.innerHTML = text;
        const nodes = Array.from(container.childNodes);
        el.innerHTML = '';
        let index = 0;

        const typeWriter = () => {
          if (index < nodes.length) {
            const node = nodes[index];
            if (node.nodeType === Node.TEXT_NODE) {
              const textContent = node.textContent.split('');
              let textIndex = 0;

              const typeText = () => {
                if (textIndex < textContent.length) {
                  el.innerHTML += textContent[textIndex];
                  textIndex++;
                  setTimeout(typeText, 20);
                } else {
                  index++;
                  typeWriter();
                }
              };
              typeText();
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              el.appendChild(node.cloneNode(true));
              index++;
              typeWriter();
            }
          }
        };
        typeWriter();
      }
    }
  },
  methods: {
    showToast() {
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 4000);
    },
    async startSpeak() {          
        this.startedSpeaking = true;    
         await TextToSpeech.speak({
            text: this.text,
            rate: 1.0,
            pitch: 1.0,
            voice: 313,
        });
      },
    async stopSpeaking() {
      await TextToSpeech.stop();
      this.startedSpeaking = false;
    },
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
.murdererFound {
  padding: 2rem 1rem 0 1rem;
}

.murdererFound ion-button {
  text-transform: none;
}

.murdererFoundTitle {
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--colorPrimary);
  margin: 0 0 1rem 0;
}

.murdererFoundText {
  margin: 0 0 1rem 0;
} 

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
  background-color: #18914a;
  color: #fff;
  padding: 12px 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  text-align: center;
  animation: slide-in 0.3s ease-out, fade-out 0.3s ease-in 3.7s forwards;
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