<template>
  <q-page class="flex items-center justify-center">
    <q-card class="w-11/12 md:w-2/4 p-4">
      <q-card-section header>
        <div class="flex justify-center items-center">
          <q-avatar>
            <q-icon
              name="switch_access_shortcut_add"
              color="blue-7"
              size="md"
            />
          </q-avatar>
          <p class="text-h6 uppercase text-blue-500">Encurtar URL</p>
        </div>
      </q-card-section>
      <q-input
        label="Cole sua url aqui"
        outlined
        type="url"
        clearable
        v-model="url"
        @update:model-value="updateUrl"
        :error="!isValid && message !== ''"
      >
        <template v-slot:error> {{ message }} </template>
      </q-input>
      <q-btn
        class="full-width my-2"
        label="Encurtar"
        size="20px"
        :color="isValid ? 'blue-5' : 'grey-5'"
        :disable="!isValid"
        @click="shortenUrl"
      />

      <q-field
        class="w-full my-2"
        :outlined="urlWasShortened"
        :borderless="!urlWasShortened"
        readonly
        color="blue-5"
      >
        <shortcut-copy
          :show="urlWasShortened"
          v-model:shortcut="shortcut"
          :disable-copy="false"
        />
      </q-field>
    </q-card>
  </q-page>
</template>
<script setup>
import ShortcutCopy from "src/components/ShortcutCopy.vue";
import { useLinks } from "src/stores/links";
import { ref, computed } from "vue";

const store = useLinks();
const url = ref("");
const shortcut = ref("qwwererterttyrtyrt");
const urlWasShortened = ref(false);
const message = ref("");
const isValid = ref(true);

function checkUrlValid() {
  const regexUrl =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  return regexUrl.test(url.value);
}

function updateUrl(value) {
  if (value !== "") {
    message.value = "Cole ou digite uma url válida!";
    isValid.value = checkUrlValid();
  } else {
    message.value = "";
  }
}
async function shortenUrl() {
  if (url.value === "") {
    isValid.value = false;
    message.value = "Por favor, cole ou digite uma url.";
  }
  const res = await store.createLink(url.value);
  // console.log(res);
  if (res.success) {
    shortcut.value = window.location.origin + "/" + res.slug;
    urlWasShortened.value = true;
  } else {
    message.value = res.message;
    isValid.value = false;
  }
}
</script>
<style lang=""></style>
