<script setup lang="ts">
import { ref } from "vue";
import { userStore } from "../store/users";
import { useRouter } from "vue-router";

const store = userStore();

const entityProperties = ref({
  email: "",
  password: "",
});

const isValidForm = ref<boolean>(true);
const router = useRouter();
//methods
const handleLogin = async () => {
  if (!isValidForm.value) return;

  try {
    await store.login(entityProperties.value);
    router.push({ name: "InicioPage" });
  } catch (error) {}
};
</script>

<template>
  <v-form v-model="isValidForm" @submit.prevent="handleLogin">
    <h1 class="text-center">Iniciar Sesión</h1>
    <base-input
      v-model="entityProperties.email"
      class="mt-5"
      type="email"
      label="Correo"
    />
    <base-input
      v-model="entityProperties.password"
      class="mt-2"
      type="password"
      label="Contraseña"
    />

    <custom-button
      :loading="store.loading"
      type="submit"
      class="mx-auto mb-3"
      text="Ingresar"
      hide-icon
    />

    <div class="text-center">
      <span>No tienes una cuenta? </span>
      <router-link class="text-indigo" to="/auth/registrar">Registrate aqui</router-link>
    </div>
  </v-form>
</template>
