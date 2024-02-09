<script setup>
import DATA from "@/services/data";
import { computed, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  accessToken,
  onDeleteAppLocalStorage,
  userData,
  formatToVND,
  isMobileScreen,
} from "@/utils";

const ROUTE = useRoute();
const ROUTER = useRouter();

const listMenu = computed(() => DATA.listMenu);

const selectMenu = ref(ROUTE.name);

const isDisplaySidebarMenu = ref(false);

const onClickIconSetting = () => {
  isDisplaySidebarMenu.value = true;
};

const onClickMenuItem = (routeName) => {
  if (routeName === selectMenu.value) {
    return;
  }

  ROUTER.push({ name: routeName });

  isDisplaySidebarMenu.value = false;
  selectMenu.value = routeName;
};

const onClickLogout = () => {
  onDeleteAppLocalStorage();
  isDisplaySidebarMenu.value = false;
};

watchEffect(() => {
  selectMenu.value = ROUTE.name;
});
</script>

<template>
  <!-- Dành cho điện thoại -->
  <div v-if="isMobileScreen">
    <div
      style="
        background-image: url('/images/bg-banner.jpg');
        background-repeat: no-repeat;
        background-size: cover;
      "
      :class="{ 'py-6': ROUTE.name === 'Home' }"
      class="w-full p-3 flex align-items-center justify-content-between"
    >
      <div v-if="accessToken" class="flex flex-column gap-4">
        <div class="flex gap-2">
          <img
            v-if="userData.avatar"
            class="avatar object-fit-cover"
            :src="userData.avatar || '/images/avatar.jpg'"
            onerror="this.onerror=null; this.src='/images/avatar.jpg';"
          />

          <Avatar
            v-else
            :label="userData.email?.charAt(0)?.toUpperCase()"
            shape="circle"
          />

          <div class="flex flex-column gap-1">
            <span class="text-custom-mini">Xin chào!</span>
            <span class="font-bold">{{ userData.email }}</span>
          </div>
        </div>

        <div v-if="selectMenu === 'Home'" class="flex flex-column gap-2">
          <span class="text-custom-mini">Tổng số dư hiện tại</span>
          <span style="font-size: 1.2rem" class="text-custom-mini">
            $ {{ formatToVND(userData.moneyBalance) }}
          </span>
        </div>
      </div>

      <div v-else class="flex flex-column gap-3">
        <div class="flex align-items-center gap-2">
          <div
            style="background-color: aliceblue"
            class="avatar flex align-items-center justify-content-center"
          >
            <i class="pi pi-lock" />
          </div>

          <span
            style="background-color: aliceblue; padding: 0.6rem 0.8rem"
            class="on-click border-round-3xl"
            @click="ROUTER.push({ name: 'Login' })"
          >
            Đăng nhập
          </span>
        </div>

        <div style="max-width: 12rem" class="text-custom-mini line-height-3">
          Đăng nhập vào hệ thống để trải nghiệm dịch vụ tốt nhất!
        </div>
      </div>

      <div
        v-if="ROUTE.name === 'Personal'"
        style="color: rgb(216, 64, 64)"
        class="on-click"
        @click="onClickLogout"
      >
        Đăng xuất
      </div>
    </div>
  </div>

  <!-- Dành cho máy tính -->
  <div v-else>
    <Sidebar v-model:visible="isDisplaySidebarMenu" class="w-17rem">
      <div class="flex flex-column h-full justify-content-between">
        <div class="flex flex-column">
          <div
            v-for="(item, index) in listMenu"
            :key="index"
            class="p-3 on-click flex align-items-center gap-2"
            :class="{
              'active-item': item.routeName === selectMenu,
              'menu-item': item.routeName !== selectMenu,
            }"
            @click="onClickMenuItem(item.routeName)"
          >
            <i :class="`pi ${item.icon}`" />
            <span>{{ item.name }}</span>
          </div>
        </div>

        <span
          style="color: rgb(219, 9, 9)"
          class="p-3 on-click"
          @click="onClickLogout"
        >
          Đăng xuất
        </span>
      </div>
    </Sidebar>

    <div class="box-shadow-1 bg-white">
      <div
        class="container h-4rem flex align-items-center justify-content-between"
      >
        <div
          class="text-2xl font-bold text-main-color on-click"
          @click="ROUTER.push({ name: 'Home' })"
        >
          T B O T A I
        </div>

        <div v-if="accessToken" class="flex gap-2 align-items-center">
          <img
            v-if="userData.avatar"
            class="avatar object-fit-cover"
            :src="userData.avatar || '/images/avatar.jpg'"
            onerror="this.onerror=null; this.src='/images/avatar.jpg';"
          />

          <Avatar
            v-else
            :label="userData.email.charAt(0).toUpperCase()"
            shape="circle"
          />

          <div style="padding-bottom: 0.15rem" class="flex flex-column gap-1">
            <span>{{ userData.email }}</span>

            <span class="text-custom-mini">
              $ {{ formatToVND(userData.moneyBalance) }}
            </span>
          </div>

          <i
            class="pi pi-spin pi-cog text-2xl on-click"
            @click="onClickIconSetting"
          />
        </div>

        <div v-else class="flex gap-4">
          <span class="on-click" @click="ROUTER.push({ name: 'Login' })">
            Đăng nhập
          </span>
          <span class="on-click" @click="ROUTER.push({ name: 'Register' })">
            Đăng ký
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Máy tính */
.menu-item {
  transition: all 0.2s ease;
}

.menu-item:hover {
  background-color: #4caf4f71;
}

.active-item {
  color: #4caf50;
}

/* Điện thoại */
</style>
