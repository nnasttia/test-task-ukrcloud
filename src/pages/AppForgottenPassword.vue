<template>
  <div class="login-page d-flex">
    <div class="login-container d-flex">
      <div class="login-image d-flex">
        <router-link to="/">
          <img src="../img/logo.png" alt="site main logo" loading="lazy">
        </router-link>
      </div>
      <div class="login-form">
        <h1>Forgotten Password</h1>
        <Form
            :validation-schema="forgottenPasswordPageValidate"
        >
          <div class="form-group">
            <Field name="email" type="email" v-model="email" placeholder="Enter your email" class="input" />
            <ErrorMessage name="email" class="error-message"/>
          </div>
          <button type="submit" class="login-button btn">Send code</button>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </Form>
        <div class="extra-links">
          <router-link to="/login">Already have an account? Sign in <br></router-link>
          <router-link to="/register">Don`t have account yet? Sign Up</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {forgottenPasswordPageValidate} from "@/schema/validationSchema.js";
import {
  ErrorMessage,
  Field,
  Form
} from "vee-validate";
import {ref} from "vue";
const email = ref("");

const errorMessage = ref("");
</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 0 20px;

  .login-container {
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;

    @media (min-width: 768px) {
      flex-direction: row;
    }

    .login-image {
      flex: 1;
      background-color: #333;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      margin-bottom: 20px;

      img {
        max-width: 180px;
        height: auto;
      }

      @media (min-width: 768px) {
        margin-bottom: 0;
      }
    }

    .login-form {
      flex: 1.5;
      padding: 40px 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      h1 {
        font-size: 36px;
        color: var(--black);
        margin-bottom: 20px;
        text-align: center;
        font-family: var(--second-font),serif;
      }

      .form-group {
        margin-bottom: 20px;

        input {
          width: 100%;
          padding: 12px;
          font-size: 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
          transition: border-color 0.3s ease;

          &:focus {
            border-color: var(--main-color);
            outline: none;
          }
        }
      }

      .login-button {
        width: 100%;
        background-color: var(--main-color);
        color: var(--white);
        border: none;
        border-radius: 4px;
        font-size: 20px;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #333;
        }
      }

      .error {
        color: var(--main-color);
        font-size: 15px;
        margin-top: 10px;
        text-align: center;
      }

      .extra-links {
        margin-top: 20px;
        text-align: center;

        a, router-link {
          color: var(--main-color);
          text-decoration: none;
          font-size: 15px;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>