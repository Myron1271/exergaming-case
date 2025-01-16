<template>
  <div id="map" style="width: 100%; height: 100vh;"></div>
  <Modal v-if="showWelcomeModal" @close="closeModal">
    <p class="modalTitle"><b>Welkom bij het team {{ userName }}!</b></p>
    <p class="modalText" v-typemachine>
      Je kan meteen aan de slag. Het lijkt erop dat er vanmorgen een persoon
      gevonden is. <br> 
      Ik heb de <b>coördinaten</b> naar je doorgestuurd. Je kan ze
      vinden op de <b>map.</b>
    </p>
    <ion-button size="medium" shape="round" @click="closeModal">Aan de slag!</ion-button>
  </Modal>
  <ion-button @click="toggleFollow" style="position: absolute; bottom: 70px; right: 20px;">
    {{ isFollowing ? 'Live Volgen' : 'Ga naar live locatie' }}
  </ion-button>
</template>

<script>
import { Geolocation } from '@capacitor/geolocation';
import Modal from '@/components/Modal.vue';
import { IonButton } from '@ionic/vue';

export default {
  name: 'MapView',
  components: { 
    Modal,
    IonButton, 
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
  data() {
    return {
      map: null,
      userMarker: null,
      watchId: null,
      isFollowing: true,
      isDragged: false,
      markers: [],
      showWelcomeModal: !localStorage.getItem('welcomeRead'),
      userName: localStorage.getItem('userName'),
      visibleMarkers: JSON.parse(localStorage.getItem('visibleMarkers')) || ['FirstMurder'],
      markerData: [
        { id: 'FirstMurder', lat: 51.0032273981703, lng: 5.854381535488583, route: 'firstmurder', title: 'En zo begint het.' },
        { id: 'SecondMurder', lat: 51.003596, lng: 5.853474, route: 'secondmurder', title: 'Wie is de volgende?' },
        { id: 'ThirdMurder', lat: 51.004262, lng: 5.852556, route: 'thirdmurder', title: 'De laatste?' },
        { id: 'MurdererFound', lat: 51.005450, lng: 5.851511, route: 'murdererfound', title: 'Zou dit hem zijn?' },
      ],
      hasRefreshed: false,
      mapStyle: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#000000"
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
],
    };
  },
  methods: {
    async initializeMap() {
      const coordinates = await Geolocation.getCurrentPosition();
      const userLocation = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      };

      this.map = new google.maps.Map(document.getElementById('map'), {
        center: userLocation,
        zoom: 18,
        disableDefaultUI: true,
        styles: this.mapStyle, // Voeg de aangepaste stijl hier toe
      });

      this.userMarker = new google.maps.Marker({
        position: userLocation,
        map: this.map,
        title: 'You are here!',
      });

      this.addVisibleMarkers();
      this.addMapListeners();
      this.watchUserPosition();
    },

    addVisibleMarkers() {
      this.markerData.forEach(marker => {
        if (this.visibleMarkers.includes(marker.id)) {
          this.addMarker(marker);
        }
      });
    },

    addMarker({ id, lat, lng, route, title }) {
      const customMarkerIcon = {
        url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        scaledSize: new google.maps.Size(30, 30),
      };

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: this.map,
        title,
        icon: customMarkerIcon,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: ` 
          <div style="text-align: center">
            <p style="font-size: 1.5rem; font-weight: bold; color: var(--colorText)">${title}</p>
            <ion-button style="text-transform: none; font-size: 1rem" size="medium" shape="round" id="navigateButton-${id}">Start het onderzoek</ion-button>
          </div>
        `,
      });

      google.maps.event.addListener(infoWindow, 'domready', () => {
        const button = document.getElementById(`navigateButton-${id}`);
        if (button) {
          button.addEventListener('click', () => {
            this.addNextMarkers(id);
            window.location.href = `/${route}`;
          });
        }
      });

      marker.addListener('click', () => {
        const userLocation = new google.maps.LatLng(
          this.userMarker.getPosition().lat(),
          this.userMarker.getPosition().lng()
        );
        const markerPosition = new google.maps.LatLng(lat, lng);
        const distance = google.maps.geometry.spherical.computeDistanceBetween(userLocation, markerPosition);

        if (distance <= 25) {
          infoWindow.open(this.map, marker);
        } else {
          infoWindow.close();
        }
      });

      this.markers.push({ id, marker });
    },

    async watchUserPosition() {
      this.watchId = Geolocation.watchPosition({}, (position, err) => {
        if (err) return;

        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.userMarker.setPosition(newLocation);

        if (this.isFollowing && !this.isDragged) {
          this.map.setCenter(newLocation);
        }

        this.checkProximity(newLocation);
      });
    },

    addMapListeners() {
      this.map.addListener('dragstart', () => {
        this.isFollowing = false;
        this.isDragged = true;
      });

      this.map.addListener('idle', () => {
        if (this.isDragged) {
          this.isDragged = false;
        }
      });
    },

    checkProximity(userLocation) {
      this.markers.forEach(({ id, marker }) => {
        const markerPosition = marker.getPosition();
        const userLatLng = new google.maps.LatLng(userLocation.lat, userLocation.lng);

        if (google.maps.geometry.spherical.computeDistanceBetween(userLatLng, markerPosition) <= 25) {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        } else {
          marker.setAnimation(null);
        }
      });
    },

    closeModal() {
      this.showWelcomeModal = false;
      localStorage.setItem('welcomeRead', 'true');
    },

    toggleFollow() {
      this.isFollowing = !this.isFollowing;
      if (this.isFollowing) {
        const coordinates = this.userMarker.getPosition();
        this.map.setCenter(coordinates);
      }
    },

    addNextMarkers(currentId) {
      const nextMarkers = {
        FirstMurder: ['SecondMurder'],
        SecondMurder: ['ThirdMurder'],
        ThirdMurder: ['MurdererFound'],
      };

      if (nextMarkers[currentId]) {
        this.visibleMarkers.push(...nextMarkers[currentId]);
        localStorage.setItem('visibleMarkers', JSON.stringify(this.visibleMarkers));
      }
    },
  },
  mounted() {
    if (!localStorage.getItem('hasRefreshed')) {
      localStorage.setItem('hasRefreshed', 'true');
      window.location.reload();
    } else {
      this.initializeMap();
      localStorage.removeItem('hasRefreshed');
    }
  },
};
</script>

<style scoped>
.modalTitle {
  color: var(--colorPrimary);
  margin: 0;
  text-align: left !important;
}

.modalText {
  margin: 0.3rem 0 0.3rem 0;
  text-align: left !important;
}

ion-button {
  margin: 0.5rem 0 0 0;
}
</style>
