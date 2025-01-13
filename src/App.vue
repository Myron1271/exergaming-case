<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import Navbar from '../src/components/Navbar.vue'
</script>

<template>
    <!-- <RouterView :key="$route.fullPath" /> -->
    <div class="container">
      <RouterView />
      <Navbar />
    </div>
    
</template>

<style>
.container {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
</style>
