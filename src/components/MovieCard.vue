<template>
  <div class="movie-card" @click="$emit('movie-selected', movie.id)">
    <img
        v-if="movie.poster_path"
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        alt="movie poster"
        loading="lazy"
    />
    <h3>{{ movie.title }}</h3>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps(["movie"]);
</script>

<style scoped>

.movie-card {
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-align: center;
  padding: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 15px;
  }

  h3 {
    font-size: 15px;
    color: var(--black);
    margin-bottom: 10px;
    font-family: var(--second-font), serif;
  }

  router-link {
    display: inline-block;
    padding: 8px 16px;
    background-color: var(--main-color);
    color: var(--white);
    text-decoration: none;
    border-radius: 4px;
    font-size: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--main-color);
    }
  }
}
</style>