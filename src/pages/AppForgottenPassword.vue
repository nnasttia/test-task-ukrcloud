<template>
  <div class="login-page d-flex">
    <div class="login d-flex">
      <div class="image d-flex">
        <router-link to="/">
          <img src="../img/logo.png" alt="site main logo" loading="lazy">
        </router-link>
      </div>
      <div class="form">
        <h1>Forgotten Password</h1>
        <Form
            :validation-schema="forgottenPasswordPageValidate"
        >
          <div class="mb-20">
            <Field
                name="email"
                type="email"
                v-model="email"
                placeholder="Enter your email"
                class="input"
            />
            <ErrorMessage name="email" class="error"/>
          </div>
          <button type="submit" class="btn">Send code</button>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </Form>
        <div class="links">
          <router-link to="/login">Already have an account? Sign in <br></router-link>
          <router-link to="/register">Don’t have an account yet? Sign Up</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { forgottenPasswordPageValidate } from "@/schema/validationSchema.js";
import {
  ErrorMessage,
  Field,
  Form
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
      errorMessage: "",
    };
  },
  computed: {
    forgottenPasswordPageValidate() {
      return forgottenPasswordPageValidate;
    },
  },
};
</script>

<style scoped lang="scss">
</style>