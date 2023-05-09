<template>
  <q-layout
    view="lHh lpr lFf"
    container
    style="height: 100vh"
    class="shadow-2 rounded-borders"
  >
    <q-header class="bg-transparent px-4">
      <q-toolbar>
        <q-avatar>
          <img src="../assets/logo.svg" />
        </q-avatar>

        <q-toolbar-title class="uppercase font-extrabold text-blue-500"
          >Url Shortcut</q-toolbar-title
        >

        <q-tabs no-caps class="bg-transparent text-blue-500">
          <q-route-tab
            v-for="item in menu"
            :key="item.id"
            :to="{ name: item.to }"
            replace
            :label="item.label"
            class="uppercase"
          />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view :key="$route.path" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, computed } from "vue";

const menu = ref([
  {
    id: 1,
    label: "Inicio",
    to: "home",
  },
  {
    id: 2,
    label: "Novo Link",
    to: "new",
  },
  {
    id: 3,
    label: "Meus Links",
    to: "links",
  },
  {
    id: 4,
    label: "Sobre",
    to: "about",
  },
]);

const $q = useQuasar();

const leftDrawerOpen = ref(false);
const OpenDrawerAndIsMobile = computed({
  get() {
    return $q.screen.width <= 780 && leftDrawerOpen.value;
  },
  set(newValue) {
    leftDrawerOpen.value = newValue;
  },
});

const page = ref("images");
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
