<template>
  <div class="login-page d-flex">
    <div class="login d-flex">
      <div class="image d-flex">
        <router-link to="/">
          <img src="../img/logo.png" alt="site main logo" loading="lazy"/>
        </router-link>
      </div>
      <div class="form">
        <h1>Sign Up</h1>
        <Form
            :validation-schema="signUpPageValidate"
            v-slot="{ handleSubmit }"
        >
          <div class="mb-20">
            <Field
                name="firstName"
                type="text"
                v-model="firstName"
                placeholder="Enter first name"
                class="input"
            />
            <ErrorMessage name="firstName" class="error"/>
          </div>
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
          <button
              type="submit"
              class="login-button btn"
              @click="handleSubmit($event, handleLogin)"
          >
            Sign up
          </button>
        </Form>
        <div class="links">
          <router-link to="/forgottenpassword">Forgot Password?<br></router-link>
          <router-link to="/login">Already have an account? Sign in</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  ErrorMessage,
  Field,
  Form
} from "vee-validate";
import { signUpPageValidate } from "@/schema/validationSchema.js";
import router from "@/router/index.js";

export default {
  components: {ErrorMessage, Field, Form},
  computed: {
    signUpPageValidate() {
      return signUpPageValidate
    }
  },
  data() {
    return {
      firstName: "",
      email: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    async handleLogin(values, { setErrors }) {
      try {
        const response = await axios.post("http://localhost:3000/register", {
          firstName: values.firstName,
          email: values.email,
          password: values.password
        });

        alert(response.data.message);
        await router.push('/login');
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.error || "Unknown error occurred";
          if (error.response.data.error === "This email is already registered") {
            setErrors({ email: "This email is already registered" });
          }
        } else {
          this.errorMessage = "Something went wrong. Please try again later.";
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">

</style>