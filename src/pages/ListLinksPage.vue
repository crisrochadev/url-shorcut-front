<template>
  <q-page class="flex items-center justify-center h-full relative">
    <q-card class="w-11/12 relative h-[calc(100vh_-_130px)] p-0">
      <q-card-section header ref="header_table">
        <div class="flex md:justify-between items-center justify-center w-full">
          <div class="w-full lg:w-[30%]">
            <q-tabs
              spread
              class="w-full my-2 order-2 md:order-1"
              v-model="typeLinkList"
              outside-arrows
              mobile-arrows
              inline-label
              active-color="blue-5"
            >
              <q-tab name="active" label="Ativos" icon="link" />
              <q-tab name="inactive" label="Inativos" icon="link_off" />
            </q-tabs>
          </div>
          <div class="w-full lg:w-2/4">
            <q-input
              outlined
              dense
              class="w-full"
              debounce="300"
              v-model="store.filter"
              placeholder="Buscar URL"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>
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
        :style="{
          height: height(),
        }"
        binary-state-sort
        @request="onRequest"
      >
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
            <a :href="`/${props.row.slug}`" target="__blank">
              <q-btn
                icon="open_in_new"
                title="Copiar Link"
                color="blue-5"
                flat
                round
                dense
              >
                <q-tooltip>Testar Link</q-tooltip>
              </q-btn>
            </a>
          </q-td>
        </template>
        <template #body-cell-delete="props">
          <q-td :props="props">
            <q-btn
              :icon="props.row.disabled ? 'link' : 'link_off'"
              :color="props.row.disabled ? 'blue-5' : 'red-5'"
              flat
              round
              dense
            >
              <q-tooltip>
                {{ props.row.disabled ? "Habilitar Link" : "Desablitar Link" }}
              </q-tooltip>
              <q-menu>
                <q-card>
                  <q-card-section header>
                    <h3
                      class="uppercase font-bold text-sm text-center"
                      :class="
                        props.row.disabled ? 'text-blue-7' : 'text-red-600'
                      "
                    >
                      <q-icon
                        name="warning"
                        :color="props.row.disabled ? 'blue-5' : 'red-9'"
                      />
                      {{
                        props.row.disabled
                          ? "Habilitar Link"
                          : "Desablitar Link"
                      }}
                    </h3>
                  </q-card-section>
                  <q-card-section>
                    <p class="text-center">
                      Você deseja
                      {{ props.row.disabled ? "habilitar" : "desabilitar" }} o
                      link
                    </p>
                    <p
                      class="text-center text-xs border p-1 my-2"
                      :class="
                        props.row.disabled
                          ? 'border-blue-500'
                          : 'border-red-500'
                      "
                    >
                      {{ props.row.link }} ?
                    </p>
                  </q-card-section>

                  <q-card-section footer class="flex justify-between">
                    <q-btn-group spread class="full-width" flat>
                      <q-btn
                        outline
                        :color="props.row.disabled ? 'blue-5' : 'red-5'"
                        class="q-mr-x"
                        v-close-popup
                        >Cancelar</q-btn
                      >
                      <q-btn
                        :color="props.row.disabled ? 'blue-5' : 'red-5'"
                        @click="() => disableLink(props.row.id)"
                        >{{
                          props.row.disabled ? "Habilitar" : "Desabilitar"
                        }}</q-btn
                      >
                    </q-btn-group>
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
import { onMounted, computed, ref, watch } from "vue";
import useCopyShortcut from "src/composables/useCopyShortcut";

const store = useLinks();
const apiIsReady = ref(false);
const { copyShortcut } = useCopyShortcut();
const header_table = ref(null);

const columns = ref([
  {
    id: 1,
    label: "",
    name: "buttons",
    align: "center",
    style: "width:60px",
    headerStyle: "width:60px",
  },
  {
    id: 2,
    label: "",
    name: "expired",
    style: "width:10px",
    headerStyle: "width: 10px",
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
const typeLinkList = computed({
  get() {
    return store.typeLinkList;
  },
  set(tab) {
    store.typeLinkList = tab;
  },
});

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

function height() {
  let heightHeader = header_table.value.$el.getBoundingClientRect().height;
  return `calc(100% - ${heightHeader}px)`;
}

watch(typeLinkList, async () => {
  await store.getAllLinks();
});
</script>
