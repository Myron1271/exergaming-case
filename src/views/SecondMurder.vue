<template>
    <div>
      <h1>Second Murder</h1>
      <p>Het lijkt erop dat dit slachtoffer wederom iets op de buik gekrast is. Het lijkt op het Cijfer 1.</p>
      <button @click="goBackToMap">Ga terug naar de map</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SecondMurder',
    methods: {
      goBackToMap() {
        window.location.href = "/map";
      },
    },
  };
  </script>