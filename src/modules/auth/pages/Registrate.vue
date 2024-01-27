<script setup lang="ts">
import { ref } from "vue";
import { userStore } from "../store/users";
import { useRouter } from "vue-router";

const entityProperties = ref({
  email: "",
  password: "",
  firstname: "",
  lastname: "",
});
const router = useRouter();
const isValidForm = ref<boolean>(true);
const store = userStore();

//methods
const handleSignup = async () => {
  if (!isValidForm.value) return;
  await store.signup(entityProperties.value);
  entityProperties.value = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  };
  router.push("/auth/login");
};
</script>

<template>
  <v-form v-model="isValidForm" @submit.prevent="handleSignup">
    <h1 class="text-center">Registrate</h1>
    <base-input
      v-model="entityProperties.firstname"
      class="mt-2"
      type="text"
      label="Nombres"
    />
    <base-input
      v-model="entityProperties.lastname"
      class="mt-2"
      type="text"
      label="Apellidos"
    />
    <base-input
      v-model="entityProperties.email"
      class="mt-2"
      type="email"
      label="Correo"
    />
    <base-input
      v-model="entityProperties.password"
      class="mt-2"
      type="password"
      label="Contraseña"
    />

    <custom-button type="submit" class="mx-auto mb-3" text="Registrarme" hide-icon />

    <div class="text-center">
      <span>Ya tienes una cuenta? </span>
      <router-link class="text-indigo" to="/auth/login">Inicia Sesión aqui</router-link>
    </div>
  </v-form>
</template>
