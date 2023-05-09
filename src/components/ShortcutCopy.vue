<template>
  <div class="w-full h-full flex justify-between items-center" v-if="display">
    <p>{{ shortcut }}</p>
    <q-btn
      v-if="disableCopy === false"
      icon="content_copy"
      flat
      dense
      round
      color="blue-5"
      @click="() => copyShortcut(slug)"
    />
  </div>
</template>
<script setup>
import { defineEmits, defineProps, computed } from "vue";
import useCopyShortcut from "src/composables/useCopyShortcut";

const props = defineProps({
  show: {
    type: Boolean,
    default: true,
  },
  shortcut: {
    type: String,
    default: "",
  },
  disableCopy: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:shortcut"]);

const display = computed(() => props.show);
const disableCopy = computed(() => props.disableCopy);

const slug = computed({
  get() {
    return props.shortcut;
  },
  set(newSlug) {
    emit("update:shortcut", newSlug);
  },
});

const { copyShortcut } = useCopyShortcut();
</script>
<style></style>
