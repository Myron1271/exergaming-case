<template>
  <div class="firstMurder">
    <p class="firstMurderTitle">En zo begint het</p>
    <p class="firstMurderText" v-typemachine>
      Je nadert de plaats delict en wordt meteen getroffen door de kille stilte die in de lucht hangt.
      Iets aan de scène voelt onheilspellend. De omgeving lijkt zorgvuldig gekozen. Er zijn duidelijke sporen van een gevecht,
      maar ook aanwijzingen die erop wijzen dat de dader meer tijd heeft genomen dan normaal. 
      Het is alsof elke stap, elk detail, een boodschap bevat die naar jou gericht is.
      <br>
      <br>
      Je weet dat elk detail belangrijk kan zijn.
      Wat je hier vindt, kan je mogelijk dichter bij de dader brengen.
      <br>
      <br>
      Naast het hoofd van het slachtoffer lijkt een vies papierenblaadje te liggen met iets erop.
    </p>
    <ion-button size="small" shape="round" @click="showModal(1)">Kijk naar de wonden op de arm</ion-button>
    <ion-button size="small" shape="round" @click="showModal(2)">Kijk kneuzingen op de handen</ion-button>
    <ion-button size="small" shape="round" @click="showModal(3)">Kijk naar de buik</ion-button>
    <ion-button size="small" shape="round" @click="showModal(4)">Maak het papierenblaadje schoon</ion-button>

    <modal v-if="modalVisible" @close="closeModal">
      <p v-if="currentModal === 1" v-typemachine><b>Je bekijkt de wonden op de arm:</b><br><br>Het lijkt erop dat de dader een bot snijvoorwerp heeft gebruikt, aangezien de sneden niet zuiver zijn.</p>
      <p v-else-if="currentModal === 2" v-typemachine><b>Je bekijkt de kneuzingen op de handen:</b><br><br>Volgens de kneuzingen op de knokkels lijkt er ook op dat het slachtoffer mogelijk terugvocht.</p>
      <p v-else-if="currentModal === 3" v-typemachine><b>Je bekijkt de buik van het slachtoffer:</b><br><br>Het lijkt dat het cijfer <b>5</b> op de buik gekrast is.</p>
      <div v-else>
        <p v-typemachine><b>Maak het blaadje schoon:</b><br><br>Er lijkt zich iets onder het vuil te schuilen</p>
        <p v-if="progress >= 60"><b>Op het blaadje staan wat lijken op coördinaten. Het volgende slachtoffer?</b></p>
        <div id="canvasApp" style="position: relative; width: 100px; height: 160px;">
            <p class="canvasHiddenText">
              "Je bent op het juist pad, maar de volgende is al gevallen.<br> Volg de coördinaten"
            </p>
            <canvas class="canvasMurderNote" 
            ref="canvas" 
            width="200" 
            height="100" 
            @mousedown="startCleaning" 
            @mousemove="clean"               
            @mouseup="stopCleaning" 
            @mouseleave="stopCleaning" 
            @touchstart.prevent="startCleaning"
            @touchmove.prevent="clean" 
            @touchend.prevent="stopCleaning"
            ></canvas>
            <ion-button v-if="progress >= 60" class="canvasCleanedButton" size="small" shape="round" @click="goBackToMap" style="">
                Ga terug naar de Map
            </ion-button>
        </div>
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
      cleaning: false,
      progress: 0,
    };
  },
  methods: {
    showModal(modalId) {
      this.currentModal = modalId;
      this.modalVisible = true;

      if (modalId === 4) {
        this.$nextTick(() => {
          const canvas = this.$refs.canvas;
          if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "gray";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
        });
      }
    },
    closeModal() {
      this.modalVisible = false;
      this.currentModal = null;
    },
    goBackToMap() {
      localStorage.setItem('visibleMarkers', JSON.stringify(['SecondMurder']));
      window.location.href = "/map";
    },
    startCleaning() {
      this.cleaning = true;
    },
    stopCleaning() {
      this.cleaning = false;
    },
    clean(event) {
      if (!this.cleaning) return;

      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();

      let x, y;

      if (event.type.includes("mouse")) {
        x = event.clientX - rect.left;
        y = event.clientY - rect.top;
      } else if (event.type.includes("touch")) {
        x = event.touches[0].clientX - rect.left;
        y = event.touches[0].clientY - rect.top;
      }

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";

      const cleanedPixels = this.calculateCleanedPixels(ctx, canvas);
      this.progress = Math.min((cleanedPixels / (canvas.width * canvas.height)) * 100, 100);
    },
    calculateCleanedPixels(ctx, canvas) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let cleanedPixels = 0;

      for (let i = 0; i < data.length; i += 4) {
        if (data[i + 3] === 0) cleanedPixels++;
      }
      return cleanedPixels;
    },
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
};
</script>

<style scoped>
.firstMurder {
  padding: 2rem 1rem 0 1rem;
}

.firstMurder ion-button {
  text-transform: none;
}

.firstMurderTitle {
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--colorPrimary);
  margin: 0 0 1rem 0;
}

.firstMurderText {
  margin: 0 0 1rem 0;
} 

.canvasHiddenText {
  position: absolute;
  top: 0;
  left: 50%;
  width: 200px;
  height: 100px;
  margin: 0 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  z-index: 1;
  color: black;
  font-weight: bold;
  font-style: italic;
}

.canvasMurderNote {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 2;
}

.canvasCleanedButton {
  position: absolute;
  top: 115px;
  left: 48px;
  width: 200px;
  height: 30px;
  z-index: 3;
}

</style>
