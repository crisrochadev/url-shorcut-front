<template>
  <div
    v-if="pageNotFound"
    class="w-screen h-screen flex justify-center items-center relative"
  >
    <q-card class="w-11/12">
      <q-card-section header>
        <p class="uppercase text-grey-800 font-bold text-center">
          {{ message }}
        </p>
      </q-card-section>
      <q-card-section>
        <p class="text-center">
          Conheça o
          <RouterLink to="/" class="font-extrabold text-blue-500"
            >URL SHORTCUT</RouterLink
          >
        </p>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { useLinks } from "src/stores/links";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const pageNotFound = ref(false);
const message = ref(null);

const route = useRoute();

const store = useLinks();
onMounted(async () => {
  const res = await store.getLinkBySlug(route.params.slug);
  if (res.success) {
    window.location.href = res.data.url;
  } else {
    pageNotFound.value = true;
    message.value = res.message;
  }
});
</script>
<style lang=""></style>
