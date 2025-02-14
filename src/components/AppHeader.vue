<template>
  <header class="app-header">
    <div class="container">
      <div class="header-row">
        <div class="header-logo">
          <router-link to="/">
            <img src="../../src/img/Main-Logo.png" alt="site main logo">
          </router-link>
        </div>

        <button class="burger-menu" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav class="header-menu" :class="{ 'menu-open': isMenuOpen }">
          <ul>
            <li><a href="#">Home</a></li>
            <li><router-link to="">Our Movies</router-link></li>
            <li><a href="#">Pages</a></li>
            <li><router-link to="">Services</router-link></li>
            <li><router-link to="">Contact Us</router-link></li>
            <li class="header-cart-element">
              <router-link v-if="!currentUser" to="/login">Login</router-link>
              <div v-else>
                <router-link to="/account">
                  <span class="greetings">Account: {{ currentUser.name }}</span>
                </router-link>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
.app-header {
  background-color: #222;
  padding: 15px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  top: 0;
  z-index: 1000;
  position: relative;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.header-logo img {
  max-width: 130px;
  height: auto;
  cursor: pointer;
}

.burger-menu {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 2001;
}

.burger-menu span {
  display: block;
  width: 30px;
  height: 3px;
  background: #fff;
  border-radius: 3px;
  transition: 0.3s;
}

.header-menu {
  display: flex;

  ul {
    display: flex;
    gap: 30px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    position: relative;
  }
}

.header-menu a,
.header-menu router-link {
  color: #fff;
  font-size: 16px;
  text-decoration: none;
  padding: 5px 0;
  transition: color 0.3s ease;
}

.header-menu a:hover,
.header-menu router-link:hover {
  color: var(--main-color);
}

@media (max-width: 768px) {
  .burger-menu {
    display: flex;
    z-index: 2001;
  }

  .header-menu {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: #222;
    flex-direction: column;
    text-align: center;
    padding: 20px;
    display: none;
    z-index: 2000;
  }

  .header-menu.menu-open {
    display: flex;
  }

  .header-menu ul {
    flex-direction: column;
    gap: 20px;
  }

  body.menu-open {
    overflow: hidden;
  }
}
</style>