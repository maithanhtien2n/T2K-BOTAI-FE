<script setup>
import DATA from "@/services/data";
import { isMobileScreen } from "@/utils";
import { useRoute, useRouter } from "vue-router";
import { ref, computed, watchEffect } from "vue";

const ROUTE = useRoute();
const ROUTER = useRouter();

const listMenu = computed(() => DATA.listMenu);

const selectMenu = ref(ROUTE.name);

const onClickMenuItem = (routeName) => {
  if (routeName === selectMenu.value) {
    return;
  }

  ROUTER.push({ name: routeName });

  selectMenu.value = routeName;
};

watchEffect(() => {
  selectMenu.value = ROUTE.name;
});
</script>

<template>
  <div
    v-if="isMobileScreen && ROUTE.name !== 'VirtualAssistantChat'"
    class="fixed bottom-0 left-0 right-0 bg-white p-3 flex align-items-center justify-content-between"
  >
    <i
      v-for="(item, index) in listMenu"
      :key="index"
      style="
        background-color: rgb(245, 245, 245);
        font-size: 1.1rem;
        padding: 0.8rem;
      "
      :class="[
        `pi ${item.icon} text-800 border-circle`,
        { 'active-item': item.routeName === selectMenu },
      ]"
      @click="onClickMenuItem(item.routeName)"
    />
  </div>

  <div
    v-else
    :style="{
      backgroundColor:
        ROUTE.name !== 'VirtualAssistantChat' ? '#fff' : '#f2f1f7',
    }"
    class="fixed text-custom-mini text-700 bottom-0 left-0 right-0 text-center p-2"
  >
    Copyright © 2024 developed by tien thanh
  </div>
</template>

<style scoped>
.active-item {
  color: #4caf50 !important;
}
</style>
