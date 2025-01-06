<template>
  <div id="map" style="width: 100%; height: 100vh;"></div>
  <Modal v-if="showWelcomeModal" @close="closeModal">
    <h2>Welkom bij het team, Recherche {{ userName }}</h2>
    <p>
      Je kan meteen aan de slag. Het lijkt erop dat er vanmorgen een lichaam
      gevonden is. Ik heb de coördinaten naar je doorgestuurd. Je kan ze
      vinden op de map.
    </p>
    <button @click="closeModal">Aan de slag</button>
  </Modal>
  <button
    @click="toggleFollow"
    :class="isFollowing ? 'success' : 'primary'"
    style="position: absolute; z-index: 1000; bottom: 70px; right: 20px;"
  >
    {{ isFollowing ? 'Stop het volgen' : 'Ga naar mijn locatie' }}
  </button>
</template>

<script>
import { Geolocation } from '@capacitor/geolocation';
import Modal from '@/components/Modal.vue';

export default {
  name: 'MapView',
  components: { Modal },
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
        { id: 'FirstMurder', lat: 51.0032273981703, lng: 5.854381535488583, route: 'firstmurder', title: 'Eerste Marker' },
        { id: 'SecondMurder', lat: 51.003596, lng: 5.853474, route: 'secondmurder', title: 'Tweede Marker' },
        { id: 'ThirdMurder', lat: 51.004262, lng: 5.852556, route: 'thirdmurder', title: 'Derde Marker' },
        { id: 'MurdererFound', lat: 51.005450, lng: 5.851511, route: 'murdererfound', title: 'Vierde Marker' },
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
            <p>Je bent in de buurt van ${title}.</p>
            <button id="navigateButton-${id}" style="padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer;">Ga verder</button>
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
          this.infoWindow.close();
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
    this.initializeMap();
  },
};
</script>

<style scoped>
button {
  position: absolute;
  bottom: 70px;
  right: 20px;
  z-index: 1000;
  padding: 12px 20px;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #007bff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button:focus {
  outline: none;
}

button:hover {
  background-color: #0056b3;
}

button:active {
  background-color: #004085;
}

button.success {
  background-color: #28a745;
}

button.primary {
  background-color: #007bff;
}
</style>