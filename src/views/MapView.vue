<template>
    <div id="map" style="width: 100%; height: 100vh;"></div>
    <button
      @click="toggleFollow"
      :color="isFollowing ? 'success' : 'primary'"
      style="position: absolute; z-index: 1000;"
    >
      {{ isFollowing ? 'Stop het volgen' : 'Volg Mij' }}
    </button>
  </template>
  
  <script>
  import { Geolocation } from '@capacitor/geolocation';
  
  export default {
    name: 'MapView',
    data() {
      return {
        map: null,
        userMarker: null,
        watchId: null,
        isFollowing: true, // Determines whether the map follows the user
        customMarker: null, // To store the custom marker
        customMarkerLocation: { lat: 51.0032273981703, lng: 5.854381535488583 }, // Custom marker location
        infoWindow: null, // To show the popup
      };
    },
    methods: {
      async initializeMap() {
        if (!window.google || !google.maps) {
          console.error('Google Maps API not loaded');
          return;
        }
  
        // Get user's current position
        const coordinates = await Geolocation.getCurrentPosition();
        const userLocation = {
          lat: coordinates.coords.latitude,
          lng: coordinates.coords.longitude,
        };
  
        // Create the map centered on the user's location
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: userLocation,
          zoom: 18,
          disableDefaultUI: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
        });
  
        // Add a marker at the user's location
        this.userMarker = new google.maps.Marker({
          position: userLocation,
          map: this.map,
          title: 'You are here!',
        });
  
        // Create a custom marker icon
        const customMarkerIcon = {
          url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
          scaledSize: new google.maps.Size(30, 30),
        };
  
        // Add the custom marker
        this.customMarker = new google.maps.Marker({
          position: this.customMarkerLocation,
          map: this.map,
          title: 'Custom Location',
          icon: customMarkerIcon,
        });
  
        // Initialize infoWindow to show when near the marker
        this.infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="text-align: center">
            <p>Je bent in de buurt van locatie 1.</p>
            <p>Klik op de knop hieronder zodra je de QR-code hebt gevonden en verdien je punten!</p>
            <div 
                style="display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; cursor: pointer;"
                id="goToQRCodeScanButton">
                Scan QR Code
            </div>
            </div>
        `,
        });

                // Event listener to handle routing when the info window content is clicked
        google.maps.event.addListener(this.infoWindow, 'domready', () => {
        const button = document.getElementById('goToQRCodeScanButton');
        if (button) {
            button.addEventListener('click', () => {
            // Navigate to /qrcodescan using vue-router
            this.$router.push('/qrcodescan');
            });
        }
        });
  
        // Add listener to detect map interaction
        this.addMapListeners();
  
        // Start watching the user's position
        this.watchUserPosition();
      },
  
      async watchUserPosition() {
        this.watchId = Geolocation.watchPosition(
          { enableHighAccuracy: true },
          (position, err) => {
            if (err) {
              console.error('Error watching position:', err);
              return;
            }
  
            const newLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
  
            // Update user marker position
            if (this.userMarker) {
              this.userMarker.setPosition(newLocation);
            }
  
            // Center map on user's position only if following
            if (this.isFollowing && this.map) {
              this.map.setCenter(newLocation);
            }
  
            // Check if user is within 25 meters of the custom marker
            const userPosition = new google.maps.LatLng(newLocation.lat, newLocation.lng);
            const markerPosition = new google.maps.LatLng(
              this.customMarkerLocation.lat,
              this.customMarkerLocation.lng
            );
  
            const distance = google.maps.geometry.spherical.computeDistanceBetween(userPosition, markerPosition);
  
            // If the user is within 25 meters, show the popup
            if (distance <= 25) {
              this.infoWindow.open(this.map, this.customMarker);
            } else {
              this.infoWindow.close();
            }
          }
        );
      },
  
      addMapListeners() {
        // Detect map drag, zoom, or interaction
        this.map.addListener('dragstart', this.stopFollowing);
        this.map.addListener('zoom_changed', this.stopFollowing);
      },
  
      stopFollowing() {
        this.isFollowing = false;
      },
  
      toggleFollow() {
        // Toggle following behavior
        this.isFollowing = !this.isFollowing;
  
        if (this.isFollowing && this.userMarker) {
          // Center the map on the user's location when re-enabling following
          this.map.setCenter(this.userMarker.getPosition());
        }
      },
    },
  
    beforeDestroy() {
      // Stop watching the user's location when the component is destroyed
      if (this.watchId) {
        Geolocation.clearWatch({ id: this.watchId });
      }
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
    transition: background-color 0.3s ease,;
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
  
  button[disabled] {
    background-color: #b0b0b0;
    cursor: not-allowed;
  }
  
  button.success {
    background-color: #28a745; /* Green for success */
  }
  
  button.primary {
    background-color: #007bff; /* Default blue */
  }
  </style>
  