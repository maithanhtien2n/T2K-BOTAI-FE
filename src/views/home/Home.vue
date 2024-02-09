<script setup>
import { isMobileScreen } from "@/utils";
import DATA from "@/services/data";
import { computed } from "vue";

const listMenuSession = computed(() => DATA.listMenuSession);
</script>

<template>
  <!-- Dành cho diện thoại -->
  <div v-if="isMobileScreen">
    <div class="flex flex-column gap-3">
      <div
        v-for="(session, index) in listMenuSession"
        :key="index"
        class="w-full bg-white p-3 border-round-lg flex justify-content-between"
      >
        <div
          v-for="(item, i) in session"
          :key="i"
          class="w-5rem flex flex-column gap-1 text-center"
        >
          <i :class="`pi ${item.icon} text-2xl text-800`" />
          <span class="text-800 on-click text-custom-mini">{{
            item.name
          }}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Dành cho máy tính -->
  <div v-else></div>
</template>
