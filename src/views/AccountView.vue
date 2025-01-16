<template>
    <ion-card>
      <ion-card-header>
        <ion-card-title>Achievements</ion-card-title>
        <ion-card-subtitle>speel alle achievements vrij door het spel te spelen!</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <ion-list>
          <ion-item>
            <ion-thumbnail slot="start">
              <img style="border-radius: 10%; width: 50px; height: 50px;" alt="Achievement1" src="../assets/img/Achievement1.png" />
            </ion-thumbnail>
            <ion-label>
                <h2>Wat een manier om te beginnen...</h2>
                <p>Vind het eerste slachtoffer.</p>
            </ion-label>
          </ion-item>
  
          <ion-item>
            <ion-thumbnail slot="start">
              <img style="border-radius: 10%; width: 50px; height: 50px;" alt="Achievement2" src="../assets/img/Achievement2.jpg" />
            </ion-thumbnail>
            <ion-label>
                <h2>Professionele Schoonmaker</h2>
                <p>Maak het blaadje schoon en vind de nieuwe coördinaten.</p>
            </ion-label>
          </ion-item>
  
          <ion-item>
            <ion-thumbnail slot="start">
              <img style="border-radius: 10%; width: 50px; height: 50px;" alt="Achievement3" src="../assets/img/Achievement3.jpg" />
            </ion-thumbnail>
            <ion-label>                
                <h2>Kluizenkraker</h2>
                <p>Maak het kistje open met de 3 juiste cijfers.</p>
            </ion-label>
          </ion-item>
  
          <ion-item>
            <ion-thumbnail slot="start">
              <img style="border-radius: 10%; width: 50px; height: 50px;" alt="Achievement4" src="../assets/img/Achievement4.jpg" />
            </ion-thumbnail>
            <ion-label>
                <h2>Marathon</h2>
                <p>Loop naar elke marker op de map!</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-thumbnail slot="start">
              <img style="border-radius: 10%; width: 50px; height: 50px;" alt="Achievement5" src="../assets/img/Achievement5.jpg" />
            </ion-thumbnail>
            <ion-label>
                <h2>Oog in Oog</h2>
                <p>Kom in oog in oog met de verdachte.</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-thumbnail slot="start">
              <img style="border-radius: 10%; width: 50px; height: 50px;" alt="Achievement6" src="../assets/img/locked.jpg" />
            </ion-thumbnail>
            <ion-label>
                <h2>Verborgen</h2>
                <p>...</p>
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-thumbnail slot="start">
              <img style="border-radius: 10%; width: 50px; height: 50px;" alt="Achievement7" src="../assets/img/locked.jpg" />
            </ion-thumbnail>
            <ion-label>
                <h2>Verborgen</h2>
                <p>...</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>
  </template>
  
  <script>
    import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
    import { defineComponent } from 'vue';
  
    export default defineComponent({
      components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle },
    });
  </script>
  
  <style scoped>

  ion-item {
    --padding-start: 0;
  }
  </style> 