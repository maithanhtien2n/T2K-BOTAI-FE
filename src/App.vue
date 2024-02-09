<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import TheHeader from "@/TheHeader.vue";
import TheFooter from "@/TheFooter.vue";
import { isMobileScreen } from "@/utils";

const ROUTE = useRoute();

const isShowHeader = computed(() => +ROUTE.fullPath.split("/").length <= 2);
</script>

<template>
  <div class="flex flex-column h-screen">
    <!-- The header -->
    <TheHeader v-if="isShowHeader" />

    <div
      :style="{ paddingBottom: isMobileScreen ? '7rem' : '1rem' }"
      class="container pt-3 flex-1"
    >
      <router-view />
    </div>

    <!-- The footer -->
    <TheFooter />
  </div>
</template>
