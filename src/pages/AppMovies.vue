<template>
  <div class="container">
    <h1>Popular Movies</h1>

    <div class="filters">
      <select v-model="selectedGenre" @change="applyFilters">
        <option value="">All Genres</option>
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">
          {{ genre.name }}
        </option>
      </select>

      <select v-model="selectedRating" @change="applyFilters">
        <option value="">All Ratings</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
        <option value="4">4+</option>
        <option value="5">5+</option>
        <option value="6">6+</option>
        <option value="7">7+</option>
        <option value="8">8+</option>
        <option value="9">9+</option>
      </select>

      <div class="search-container">
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Search for a movie..."
            class="search-input"
            @input="applyFilters"
        />
      </div>
    </div>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="movies-list" v-if="filteredMovies.length > 0">
      <MovieCard
          v-for="movie in filteredMovies"
          :key="movie.id"
          :movie="movie"
          @movie-selected="goToMovieDetails"
      />
    </div>
    <div v-else>No movies found</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import MovieCard from "@/components/MovieCard.vue";
import router from "@/router/index.js";

const movies = ref([]);
const genres = ref([]);
const searchQuery = ref("");
const selectedGenre = ref("");
const selectedRating = ref("");
const loading = ref(true);
const error = ref("");

const fetchGenres = async () => {
  try {
    const response = await axios.get("https://api.themoviedb.org/3/genre/movie/list", {
      params: {
        api_key: "6259ebf1275fb543a9463547c1fffd76",
        language: "en-US",
      },
    });
    genres.value = response.data.genres;
  } catch (err) {
    error.value = err.response?.data?.status_message || "Failed to load genres";
  }
};

const fetchMovies = async () => {
  try {
    const response = await axios.get("https://api.themoviedb.org/3/discover/movie", {
      params: {
        api_key: "6259ebf1275fb543a9463547c1fffd76",
        with_genres: selectedGenre.value,
        vote_average: selectedRating.value,
        language: "en-US",
      },
    });
    movies.value = response.data.results;
  } catch (err) {
    error.value = err.response?.data?.status_message || "Failed to load movies";
  } finally {
    loading.value = false;
  }
};

const applyFilters = () => {
  fetchMovies();
};

const filteredMovies = computed(() => {
  return movies.value.filter(movie => {
    const matchesSearchQuery = movie.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesGenre = selectedGenre.value ? movie.genre_ids.includes(parseInt(selectedGenre.value)) : true;
    const matchesRating = selectedRating.value ? movie.vote_average >= parseInt(selectedRating.value) : true;
    return matchesSearchQuery && matchesGenre && matchesRating;
  });
});

const goToMovieDetails = (id) => {
  router.push(`/movie/${id}`);
};

onMounted(() => {
  fetchGenres();
  fetchMovies();
});
</script>

<style scoped>

.filters {
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  font-size: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  &:focus {
    border-color: var(--main-color);
    outline: none;
  }
}

.filters select {
  padding: 10px;
  width: 80%;
  max-width: 400px;
  border-radius: 5px;
  font-size: 15px;

  &:focus {
    border-color: var(--main-color);
    outline: none;
  }
}

.search-container {
  margin-bottom: 20px;
  text-align: center;
  flex-grow: 1;
}

.search-input {
  font-size: 15px;
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 20px;
  height: 40px;

  &:focus {
    border-color: var(--main-color);
    outline: none;
  }
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }

  .filters select {
    width: 100%;
  }

  .search-input {
    width: 100%;
    font-size: 14px;
    height: 35px;
    padding: 6px;
    margin-top: 0;
  }
}

@media (max-width: 480px) {
  .filters {
    padding: 5px;
    gap: 8px;
  }

  .filters select {
    font-size: 14px;
    padding: 8px;
  }

  .search-input {
    font-size: 13px;
    padding: 5px;
    height: 30px;
  }
}

div {
  margin-bottom: 30px;
  h1 {
    text-align: center;
    font-size: 2rem;
    color: var(--white);
    margin-bottom: 20px;
    font-family: var(--second-font),serif;
    padding-top: 30px;
  }

  .loading,
  .error {
    text-align: center;
    font-size: 1.5rem;
    margin: 20px 0;
    color: var(--main-color);
  }

  .movies-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
    padding: 20px;
    justify-items: center;

  }
}
</style>