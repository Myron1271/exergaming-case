<template>
    <div class="thirdMurder">
      <p class="thirdMurderTitle">De Laatste?</p>
      <p class="thirdMurderText" v-typemachine>
        Je nadert het volgende slachtoffer en merkt meteen de overeenkomsten met eerdere de slachtoffers.
        Het slachtoffer ligt op de grond, de blik verstijfd van angst en pijn. 
        Op de buik zie je iets dat onmiddellijk je aandacht trekt: er is ook hier iets gekrast,
        wat wil de dader communiceren?
        <br>
        <br>
        Wanneer je verder kijkt, valt je oog op de hand van het slachtoffer.
        Het lijkt alsof hij iets krampachtig vasthoudt, alsof het van groot belang was in zijn laatste momenten.
      </p>
      <ion-button size="small" shape="round" color="medium" @click="startSpeak">Lees voor</ion-button>
      <ion-button size="small" shape="round" color="danger" v-if="startedSpeaking" @click="stopSpeaking">Stop</ion-button>
      <br>
      <ion-button size="small" shape="round" @click="showModal(1)">Bekijk de buik</ion-button>
      <ion-button size="small" shape="round" @click="showModal(2)">Bekijk wat het slachtoffer vasthoudt</ion-button>

      <modal v-if="modalVisible" @close="closeModal">
        <p v-if="currentModal === 1" v-typemachine><b>Je bekijkt de buik van het slachtoffer:</b><br><br>Het lijkt erop dat het cijfer <b>4</b> op de buik gekrast is.</p>
        <div v-else>
          <p v-typemachine><b>Je bekijkt wat het slachtoffer vasthoudt:</b><br><br>Het slachtoffer houdt een doosje vast met een slotje eraan. Het slotje heeft <b>3</b> cijfers nodig.<br> Zou het de <b>3</b> cijfers zijn van de slachtoffers?</p>
          <ion-input type="text" v-model="code" placeholder="Voer 3 cijfers in" :maxlength="3"></ion-input>
          <br>
          <ion-button shape="round" @click="checkCode">Check de cijfers</ion-button>
        </div>
      </modal>
    </div>
</template>
  
<script>
  import { TextToSpeech } from '@capacitor-community/text-to-speech';
  import Modal from '@/components/Modal.vue';
  import { IonInput } from '@ionic/vue'  

const customFormatter = (inputLength, maxLength) => {
    return `${maxLength - inputLength} characters remaining`;
  };

  export default {
    name: 'ThirdMurder',
    components: { Modal },
    data() {
      return {
        modalVisible: false,
        currentModal: null,
        code: '',
        text: `
        Je nadert het volgende slachtoffer en merkt meteen de overeenkomsten met eerdere de slachtoffers.
        Het slachtoffer ligt op de grond, de blik verstijfd van angst en pijn. 
        Op de buik zie je iets dat onmiddellijk je aandacht trekt: er is ook hier iets gekrast,
        wat wil de dader communiceren?
        Wanneer je verder kijkt, valt je oog op de hand van het slachtoffer.
        Het lijkt alsof hij iets krampachtig vasthoudt, alsof het van groot belang was in zijn laatste momenten.
        `,
        startedSpeaking: false,
      };
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

<style scoped>
.thirdMurder {
  padding: 2rem 1rem 0 1rem;
}

.thirdMurder ion-button {
  text-transform: none;
}

.thirdMurderTitle {
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--colorPrimary);
  margin: 0 0 1rem 0;
}

.thirdMurderText {
  margin: 0 0 1rem 0;
} 

</style>
  