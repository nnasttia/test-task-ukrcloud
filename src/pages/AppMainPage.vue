<template>
  <main>
    <AppMovies />
    <AppSubscribe />
  </main>
</template>

<script>
import AppMovies from "@/pages/AppMovies.vue";
import AppSubscribe from "@/components/AppSubscribe.vue";

export default {
  components: {
    AppMovies,
    AppSubscribe,
  },
};
</script>

<style scoped>

</style>