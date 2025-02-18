<template>
  <div class="login-page d-flex">
    <div class="login d-flex">
      <div class="image d-flex">
        <router-link to="/">
          <img src="../img/logo.png" alt="site main logo" loading="lazy">
        </router-link>
      </div>
      <div class="form">
        <h1>Sign In</h1>
        <Form
            @submit="handleLogin"
            :validation-schema="loginPageValidate"
        >
          <div class="mb-20">
            <Field
                name="email"
                type="email"
                v-model="email"
                placeholder="Enter your email"
                class="input"
            />
            <ErrorMessage name="email" class="error" />
          </div>
          <div class="mb-20">
            <Field
                name="password"
                type="password"
                v-model="password"
                placeholder="Enter your password"
                class="input"
            />
            <ErrorMessage name="password" class="error" />
          </div>
          <button type="submit" class="login-button btn">Sign in</button>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </Form>
        <div class="links">
          <router-link to="/forgottenpassword">Forgot Password?<br></router-link>
          <router-link to="/register">Don’t have an account yet? Sign Up</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router/index.js";
import { loginPageValidate } from "@/schema/validationSchema.js";
import {
  Field,
  Form,
  ErrorMessage
} from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  computed: {
    loginPageValidate() {
      return loginPageValidate;
    },
  },
  methods: {
    async handleLogin() {
      try {
        const { data: users } = await axios.get("http://localhost:3000/users");

        const user = users.find(
            (user) => user.email === this.email && user.password === this.password
        );

        if (user) {
          this.errorMessage = "";
          localStorage.setItem("token", "true");
          await router.push("/");
        } else {
          this.errorMessage = "Wrong email or password.";
        }
      } catch (error) {
        this.errorMessage = "Server error. Please try again later.";
      }
    },
  },
};
</script>

<style scoped lang="scss">
</style>