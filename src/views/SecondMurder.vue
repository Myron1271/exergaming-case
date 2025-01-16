<template>
    <div class="secondMurder">
      <p class="secondMurderTitle">Wie is de volgende?</p>
      <p class="secondMurderText" v-typemachine>
        De coördinaten op het blaadje kloppen. Weer een slachtoffer.  
        De lucht is kil en zwaar. Je hebt het gevoel dat iemand je in de gaten houdt, maar er is niemand om je heen.  
        Je merkt op dat slachtoffer nog niet lang geleden om het leven is gebracht.  
        <br>
        <br>
        Op de buik van het slachtoffer lijkt iets te zijn gekrast.  
      </p>
      <ion-button size="small" shape="round" color="medium" @click="startSpeak">Lees voor</ion-button>
      <ion-button size="small" shape="round" color="danger" v-if="startedSpeaking" @click="stopSpeaking">Stop</ion-button>
      <br>
      <ion-button size="small" shape="round" @click="showModal(1)">Kijk naar de buik</ion-button>

      <modal v-if="modalVisible" @close="closeModal">
        <div v-if="currentModal === 1">
          <p v-typemachine><b>Je kijkt naar de buik:</b><br><br>Het lijkt er op dat het cijfer <b>1</b> op de buik is gekrast.</p>
          <ion-button size="medium" shape="round" @click="goBackToMap">Ga terug naar de Map</ion-button>
        </div>
      </modal>
    </div>
</template>
  
<script>
import Modal from '@/components/Modal.vue';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

  export default {
    name: 'SecondMurder',
    components: { Modal },
    data() {
      return {
        visible: false,
        modalVisible: false,
        currentModal: null,
        text: `
          De coördinaten op het blaadje kloppen. Weer een slachtoffer!  
          De lucht is kil en zwaar. Je hebt het gevoel dat iemand je in de gaten houdt, maar er is niemand om je heen.  
          Je merkt op dat slachtoffer nog niet lang geleden om het leven is gebracht.  
          Op de buik van het slachtoffer lijkt iets te zijn gekrast.
        `,
        startedSpeaking: false,
      }
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
      }, 3000);
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