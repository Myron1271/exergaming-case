<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app-container">
    <RouterView :key="$route.fullPath" />
    <nav>
      <RouterLink to="/map">Map</RouterLink>
      <!-- <RouterLink to="/qrcodescan">QR Code Scan</RouterLink> -->
      <RouterLink to="/account">Account</RouterLink>
      <!-- <RouterLink to="/about">About</RouterLink> -->
    </nav>
  </div>
</template>

<style scoped>
  #app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  nav {
    margin-left: -19px;
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    background-color: #f1f1f1;
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  }

  nav a {
    text-decoration: none;
    color: #333;
  }

  nav a:hover {
    color: #000;
  }

  nav a.router-link-active {
    color: #000;
    font-weight: bold;
  }
</style>
