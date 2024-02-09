<script setup>
import { convertNewline } from "@/utils";
import { computed } from "vue";

const props = defineProps({
  image: { type: String, required: false, default: "" },
  name: { type: String, required: false, default: "" },
  message: { type: String, required: false, default: "" },
  role: { type: String, required: false, default: "" },
});

const userChatInfo = computed(() => {
  switch (props.role) {
    case "user":
      return {
        image: "/images/user.jpg",
        name: "Bạn",
      };
    case "assistant":
      return {
        image: "/images/botai.webp",
        name: "Trợ lý ảo",
      };
    default:
      return {
        image:
          "https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg",
        name: "",
      };
  }
});
</script>

<template>
  <div class="flex gap-2">
    <img
      class="w-2rem h-2rem border-circle object-fit-cover box-shadow-1"
      :src="
        userChatInfo.image ||
        'https://bloganchoi.com/wp-content/uploads/2022/02/avatar-trang-y-nghia.jpeg'
      "
      alt="Lỗi ảnh"
    />

    <div class="flex flex-column gap-1 w-full">
      <span class="font-bold text-800">{{ userChatInfo.name }}</span>
      <div
        v-if="message"
        v-html="message"
        style="text-align: justify; white-space: pre-wrap"
        class="text-800 line-height-3"
      />

      <Skeleton v-else class="w-full mt-2" height="4rem" />
    </div>
  </div>
</template>
