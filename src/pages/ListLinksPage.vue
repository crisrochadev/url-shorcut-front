<template>
  <q-page class="flex items-center justify-center h-full relative">
    <q-card class="w-11/12 p-4 h-[calc(100vh_-_100px)]">
      <q-table
        flat
        bordered
        :rows="rows"
        :columns="columns"
        :loading="store.loading"
        v-model:pagination="store.pagination"
        row-key="id"
        v-if="apiIsReady"
        :filter="store.filter"
        class="h-full"
        binary-state-sort
        @request="onRequest"
      >
        <template v-slot:top-right>
          <q-input
            borderless
            dense
            debounce="300"
            v-model="store.filter"
            placeholder="Buscar URL"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template #body-cell="props">
          <q-td :props="props">
            <span
              :class="[props.row.expired ? 'line-through text-orange-500' : '']"
              >{{ props.value }}</span
            >
          </q-td>
        </template>
        <template #body-cell-expired="props">
          <q-td dense>
            <q-btn
              v-if="props.row.expired"
              icon="alarm"
              round
              dense
              flat
              title="Reativar Link"
              color="orange-5"
              @click="() => reactivateLink(props.row.id)"
            >
              <q-tooltip>Reativar link</q-tooltip>
            </q-btn>
          </q-td>
        </template>
        <template #body-cell-link="props">
          <q-td :props="props">
            <shortcut-copy
              :class="[props.row.expired ? 'line-through text-orange-500' : '']"
              v-model:shortcut="props.value"
              :disableCopy="true"
            />
          </q-td>
        </template>
        <template #body-cell-buttons="props">
          <q-td :props="props">
            <q-btn
              icon="content_copy"
              color="blue-5"
              flat
              round
              dense
              @click="() => copyShortcut(props.row.link)"
            >
              <q-tooltip>Copiar link</q-tooltip>
            </q-btn>
            <q-btn
              icon="open_in_new"
              :to="`/${props.row.slug}`"
              title="Copiar Link"
              color="blue-5"
              flat
              round
              dense
            >
              <q-tooltip>Testar Link</q-tooltip>
            </q-btn>
          </q-td>
        </template>
        <template #body-cell-delete="props">
          <q-td :props="props">
            <q-btn
              icon="delete"
              title="Copiar Link"
              color="red-5"
              flat
              round
              dense
            >
              <q-menu>
                <q-card>
                  <q-card-section header>
                    <h3
                      class="uppercase text-red-600 font-bold text-sm text-center"
                    >
                      <q-icon name="warning" color="red-9" />
                      Desablitar Link
                    </h3>
                  </q-card-section>
                  <q-card-section>
                    <p class="text-center text-xs">
                      Você deseja deletar o link {{ props.row.link }} ?
                    </p>
                    <p class="text-red-600">Essa ação não pode ser desfeita!</p>
                  </q-card-section>

                  <q-card-section footer>
                    <q-btn color="blue-5" class="q-mr-xs" v-close-popup
                      >Cancelar</q-btn
                    >
                    <q-btn
                      outline
                      color="red-5"
                      @click="() => disableLink(props.row.id)"
                      >Deletar</q-btn
                    >
                  </q-card-section>
                </q-card>
              </q-menu>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>
<script setup>
import ShortcutCopy from "src/components/ShortcutCopy.vue";
import { useLinks } from "src/stores/links";
import { onMounted, computed, ref } from "vue";
import useCopyShortcut from "src/composables/useCopyShortcut";

const store = useLinks();
const apiIsReady = ref(false);
const { copyShortcut } = useCopyShortcut();

const columns = ref([
  {
    id: 1,
    label: "",
    name: "buttons",
    align: "center",
    style: "width:100px",
    headerStyle: "width:100px",
  },
  {
    id: 2,
    label: "",
    name: "expired",
    style: "width:30px",
    headerStyle: "width: 30px",
    align: "center",
  },
  {
    id: 3,
    label: "Link",
    name: "link",
    field: "link",
    align: "left",
  },

  {
    id: 4,
    label: "URL",
    field: "url",
    align: "left",
    sortable: true,
  },
  {
    id: 5,
    label: "Slug",
    field: "slug",
    align: "left",
  },

  {
    id: 6,
    label: "",
    name: "delete",
    align: "center",
    style: "width:40px",
    headerStyle: "width:40px",
  },
]);

const rows = computed(() => mapRows());

async function onRequest(props) {
  const filter = props.filter;
  console.log(props.pagination);
  await store.setPagination(props.pagination, filter);
}
onMounted(async () => {
  await store.setPagination();
  // rows.value = mapRows();
  apiIsReady.value = true;
});

function mapRows() {
  return store.links.map((link) => ({
    ...link,
    link: window.location.origin + "/" + link.slug,
  }));
}

async function reactivateLink(id) {
  await store.reactivateLink(id);
}
async function disableLink(id) {
  await store.disableLink(id);
}
</script>
