<template>
  <div class="container" @scroll="handleScroll">
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
        <option v-for="n in 9" :key="n" :value="n">{{ n }}+</option>
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

    <div v-if="loading && movies.length === 0" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div class="movies-list" v-if="movies.length > 0">
      <MovieCard
          v-for="movie in filteredMovies"
          :key="movie.id"
          :movie="movie"
          @movie-selected="goToMovieDetails"
      />
    </div>

    <div v-if="loading" class="loading">Loading more movies...</div>
    <div v-if="!loading && !hasMoreMovies" class="end-message">No more movies</div>
  </div>
</template>

<script>
import axios from "axios";
import MovieCard from "@/components/MovieCard.vue";
import router from "@/router/index.js";

export default {
  components: { MovieCard },
  data() {
    return {
      movies: [],
      genres: [],
      searchQuery: "",
      selectedGenre: "",
      selectedRating: "",
      page: 1,
      loading: false,
      error: "",
      hasMoreMovies: true,
    };
  },
  computed: {
    filteredMovies() {
      return this.movies.filter((movie) => {
        const matchesSearch = movie.title.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesGenre = this.selectedGenre ? movie.genre_ids.includes(parseInt(this.selectedGenre)) : true;
        const matchesRating = this.selectedRating ? movie.vote_average >= parseInt(this.selectedRating) : true;
        return matchesSearch && matchesGenre && matchesRating;
      });
    },
  },
  methods: {
    async fetchGenres() {
      try {
        const response = await axios.get("https://api.themoviedb.org/3/genre/movie/list", {
          params: { api_key: "6259ebf1275fb543a9463547c1fffd76", language: "en-US" },
        });
        this.genres = response.data.genres;
      } catch (err) {
        this.error = err.response?.data?.status_message || "Failed to load genres";
      }
    },

    async fetchMovies() {
      if (this.loading || !this.hasMoreMovies) return;
      this.loading = true;

      try {
        const url = this.searchQuery
            ? "https://api.themoviedb.org/3/search/movie"
            : "https://api.themoviedb.org/3/discover/movie";

        const response = await axios.get(url, {
          params: {
            api_key: "6259ebf1275fb543a9463547c1fffd76",
            query: this.searchQuery || undefined,
            with_genres: this.searchQuery ? undefined : this.selectedGenre,
            vote_average: this.searchQuery ? undefined : this.selectedRating,
            language: "en-US",
            page: this.page,
          },
        });

        if (this.searchQuery) {
          this.movies = response.data.results;
        } else {
          this.movies = [...this.movies, ...response.data.results];
          this.page++;
        }

        this.hasMoreMovies = response.data.results.length > 0;
      } catch (err) {
        this.error = err.response?.data?.status_message || "Failed to load movies";
      } finally {
        this.loading = false;
      }
    },

    applyFilters() {
      this.movies = [];
      this.page = 1;
      this.hasMoreMovies = true;
      this.fetchMovies();
    },

    goToMovieDetails(id) {
      router.push(`/movie/${id}`);
    },

    handleScroll() {
      const bottomReached = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (bottomReached) {
        this.fetchMovies();
      }
    },
  },
  mounted() {
    this.fetchGenres();
    this.fetchMovies();
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
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
    margin-bottom: 20px;
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