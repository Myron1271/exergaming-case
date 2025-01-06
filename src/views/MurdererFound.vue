<template>
    <div>
      <h1>Murderer Found</h1>
      <p>Lorem Ipsum</p>
      <button @click="goBackToMap">Ga terug naar de map</button>
    </div>
</template>
  
<script>
  export default {
    name: 'MurdererFound',
    methods: {
      goBackToMap() {
        window.location.href = "/map";
      },
    },
  };
</script>