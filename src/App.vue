<template>
  <AppHeader v-if="!isLoginPage && !isRegisterPage" />
  <router-view></router-view>
  <AppFooter v-if="!isLoginPage && !isRegisterPage"/>
</template>

<script setup>
import { useHead } from '@vueuse/head';
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import {useRoute} from "vue-router";
import {computed} from "vue";

useHead({
  htmlAttrs: {
    lang: 'eng',
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Site about tea' },
  ],
  title: 'Tasty Tea',
});

const route = useRoute();
const isLoginPage = computed(() => route.name === 'login');
const isRegisterPage = computed(() => route.name === 'register');

</script>

<style scoped>

</style>
