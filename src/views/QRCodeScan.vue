<template>
  <div class="container">
    <h1>QR Code Scanner</h1>
    <button @click="startScanning" :disabled="scanning" class="start-button">
      Start Scanning
    </button>
    <div v-if="points !== null" class="points">
      <h3>Points: {{ points }}</h3>
    </div>
    <div id="reader" class="reader"></div>
  </div>
</template>

<script>
import { Html5QrcodeScanner } from "html5-qrcode";

export default {
  data() {
    return {
      scanner: null,
      points: 0,
      scanning: false,
      correctQRCode: "aB3#zD8&kL1o!pQw9rX@jK7yT%vU2sC4fH0mNp6lE*oZtV5iYbW3u#A",
    };
  },
  methods: {
    startScanning() {
      if (this.scanning) return;

      this.scanning = true;
      const config = {
        fps: 10,
        qrbox: Math.min(window.innerWidth * 0.8, 250), // Adjust qrbox size based on screen width
      };

      if (this.scanner) {
        this.scanner.start().then(() => {
          console.log("Scanner started.");
        }).catch((error) => {
          console.error("Error starting the scanner:", error);
        });
      } else {
        this.scanner = new Html5QrcodeScanner(
          "reader",
          config,
          false
        );

        this.scanner.render(
          (decodedText, decodedResult) => {
            console.log("Decoded QR Code:", decodedText);
            this.checkQRCode(decodedText);
          },
          (error) => {
            console.log("QR Code Scan Error:", error);
          }
        );
      }
    },

    stopScanning() {
      if (this.scanner && typeof this.scanner.stop === "function") {
        console.log("Stopping scanning...");
        this.scanner.stop().then(() => {
          this.scanning = false;
          console.log("Scanning stopped.");
        }).catch((error) => {
          console.error("Error stopping the scanner:", error);
        });
      }
    },

    checkQRCode(scannedText) {
      if (scannedText === this.correctQRCode) {
        this.points += 1;
        console.log("QR Code is correct. Points added!");
        localStorage.setItem("points", this.points);
        this.stopScanning();
        window.location.href = "/totalpoints";
      } else {
        console.log("QR Code is incorrect.");
      }
    },
  },

  created() {
    const savedPoints = localStorage.getItem("points");
    if (savedPoints) {
      this.points = parseInt(savedPoints, 10);
    }
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  /* height: 100vh; */
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.start-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  width: 80%;
  max-width: 300px;
}

.start-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.points {
  margin-bottom: 1rem;
}

.reader {
  width: 100%;
  max-width: 300px;
  height: auto;
  aspect-ratio: 1; /* Keeps the reader square */
  /* border: 5px solid #007bff; */
  background-color: white;
}

</style>
