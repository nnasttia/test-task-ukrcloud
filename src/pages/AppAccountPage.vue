<template>
  <div class="container" v-if="isLoggedIn && currentUser">
    <h1>Hi, {{ currentUser.name }}!</h1>
    <div class="button-group d-flex">
      <button @click="editMode = !editMode" >{{ editMode ? 'Cancel' : 'Edit Profile' }}</button>
      <button @click="logout">Logout</button>
    </div>

    <div v-if="editMode" class="editForm d-flex">
      <form @submit.prevent="updateProfile">
        <div>
          <label for="name">Name:</label>
          <input id="name" v-model="formData.name" type="text" />
        </div>
        <div>
          <label for="password">New Password:</label>
          <input id="password" v-model="formData.password" type="password" />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  </div>
  <div v-else>
    <p>You must be logged in to view this page.</p>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import user from "@/json/users.json";
import router from "@/router";

const isLoggedIn = true;

const currentUser = ref(null);

const loadUser = () => {
  const savedUser = localStorage.getItem("currentUser");
  currentUser.value = savedUser ? JSON.parse(savedUser) : user[0];
};

const editMode = ref(false);
const formData = ref({
  name: '',
  password: '',
});

watch(currentUser, (newUser) => {
  if (newUser) {
    formData.value.name = newUser.name || '';
  }
});

function updateProfile() {
  if (formData.value.name.trim() === '') {
    alert('Name cannot be empty!');
    return;
  }

  currentUser.value.name = formData.value.name;
  localStorage.setItem("currentUser", JSON.stringify(currentUser.value));
  editMode.value = false;

  formData.value.password = '';
}

onMounted(() => {
  loadUser();
});

function logout() {
  localStorage.removeItem("currentUser");
  router.push("/");
}
</script>

<style scoped lang="scss">
.container {
  margin: 20px auto;
  padding: 20px;
  text-align: center;
}

h1 {
  color: var(--main-color);
  font-family: var(--second-font),serif;
}

.editForm {
  justify-content: center;
  align-items: center;

  form {
    margin-top: 20px;

    div {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
    }

    input {
      width: 100%;
      padding: 8px;
      border: 1px solid var(--main-color);
      border-radius: 5px;

      &:hover,
      &:active,
      &:focus,
      &:focus-visible{
        outline: none;
        border-color: var(--main-color);
        box-shadow: 0 0 5px rgba(30, 102, 72, 0.5);
      }
    }
  }
}

button {
  margin-top: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: var(--main-color);
  color: var(--white);

  &:hover {
    background-color: var(--second-color);
  }
}

.button-group {
  gap: 10px;
  justify-content: center;
  align-items: center;

  button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s ease;
  }
}

</style>
