<template>
  <div class="container">
    <h1 class="title">Totale Punten</h1>
    <p class="points">Je totaal aantal punten: <span class="points-value">{{ points }}</span></p>
    <RouterLink to="/map"><button>Ga terug naar de Map</button></RouterLink>
  </div>
</template>

<script>
export default {
  data() {
    return {
      points: 0, // Default points
    };
  },
  mounted() {
    // Retrieve points from localStorage or state management
    const savedPoints = localStorage.getItem('points');
    if (savedPoints) {
      this.points = parseInt(savedPoints);
    }
  },
};
</script>

<style scoped>
/* General Container Styling */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
  box-sizing: border-box;
}

/* Title Styling */
.title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
}

/* Points Text Styling */
.points {
  font-size: 1.5rem;
  color: #555;
  font-family: 'Roboto', sans-serif;
}

/* Points Value Styling */
.points-value {
  font-weight: bold;
  color: #007BFF;
}

/* Responsive Design */
@media (max-width: 600px) {
  .title {
    font-size: 1.5rem;
  }
  .points {
    font-size: 1.2rem;
  }
}
button {
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
</style>
