<template>
  <div class="movie-details container">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="movie">
      <button @click="goBack" class="back-button">← Back</button>
      <h1>{{ movie.title }}</h1>
      <img
          v-if="movie.poster_path"
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          alt="movie poster"
          loading="lazy"
      />
      <p>{{ movie.overview }}</p>
      <p><strong>Release Date:</strong> {{ movie.release_date }}</p>
      <p><strong>Rating:</strong> {{ movie.vote_average }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import router from "@/router/index.js";

const movie = ref(null);
const loading = ref(true);
const error = ref("");
const route = useRoute();

const fetchMovieDetails = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${route.params.id}`, {
      params: {
        api_key: "6259ebf1275fb543a9463547c1fffd76",
        language: "en-US",
      },
    });
    movie.value = response.data;
  } catch (err) {
    error.value = "Failed to load movie details";
  } finally {
    loading.value = false;
  }
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  fetchMovieDetails();
});
</script>

<style scoped>
.back-button {
  display: inline-block;
  margin-bottom: 15px;
  padding: 10px 20px;
  background: var(--main-color);
  color: var(--white);
  border: none;
  cursor: pointer;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: var(--second-color);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
}

p {
  color: var(--white);
  font-size: 16px;
  line-height: 1.6;
}

h1 {
  color: var(--white);
  font-family: var(--second-font), serif;
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.movie-details {
  text-align: center;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  img {
    width: 100%;
    max-width: 400px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    margin-top: 20px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
}

.loading {
  font-size: 18px;
  color: var(--white);
  font-weight: bold;
  margin-top: 20px;
}

.error {
  color: var(--main-color);
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .movie-details {
    padding: 15px;
  }

  .back-button {
    font-size: 14px;
    padding: 8px 16px;
  }

  h2 {
    font-size: 20px;
  }

  p {
    font-size: 14px;
  }

  .movie-details img {
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .back-button {
    width: 100%;
    text-align: center;
  }

  h2 {
    font-size: 18px;
  }

  .movie-details img {
    max-width: 250px;
  }
}
</style>
