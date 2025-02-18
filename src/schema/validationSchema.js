import * as yup from "yup";
import { configure } from "vee-validate";

configure({
    validateOnInput: true
});

export const loginPageValidate = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(5, "Password must be at least 5 characters").required("Password is required"),
})

export const signUpPageValidate = yup.object({
    firstName: yup.string().required("First name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 5 characters").required("Password is required"),
})

export const forgottenPasswordPageValidate = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
})

export const newsletterPageValidate = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
})
