<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userStore } from "../modules/auth/store/users";

const router = useRouter();
const drawer = ref(true);

const store = userStore();
const token: string = JSON.parse(localStorage.getItem("token") || null);

if (Boolean(token)) {
  store.getUserBytoken(token);
}

interface Item {
  text: string;
  icon: string;
  name: string;
}

const items: Item[] = [
  {
    text: "Inicio",
    name: "InicioPage",
    icon: "mdi-home",
  },
  {
    text: "Publicaciones",
    name: "PublicacionesPage",
    icon: "mdi-book",
  },
  {
    text: "Mis Publicaciones",
    name: "MisPublicacionesPage",
    icon: "mdi-bookshelf",
  },
  {
    text: "Crear",
    name: "CrearPublicacionesPage",
    icon: "mdi-book-plus",
  },
  {
    text: "Tags",
    name: "TagsPage",
    icon: "mdi-cog",
  },
];

const goTo = (item: Item) => {
  router.push({
    name: item.name,
  });
};
</script>

<template>
  <v-layout>
    <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

    <v-app-bar color="indigo" class="elevation-0">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>{{ store.user?.firstname || "Echo Nook" }}</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list lines="two">
        <v-list-item
          @click="goTo(item)"
          v-for="(item, i) in items"
          :key="i"
          :active="router.currentRoute.value.name === item.name"
          :value="item"
          color="primary"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main style="height: 500px">
      <v-card-text>
        <router-view></router-view>
      </v-card-text>
    </v-main>
  </v-layout>
</template>
