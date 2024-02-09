<script setup>
import { computed, onMounted, ref } from "vue";
import UserChat from "./components/UserChat.vue";
import { useRoute, useRouter } from "vue-router";
import ButtonBack from "./components/ButtonBack.vue";
import { STORE_VIRTUAL_ASSISTANT } from "@/services/stores";
import { userData, isMobileScreen } from "@/utils";

const ROUTE = useRoute();
const ROUTER = useRouter();

const {
  onGetterMessages: messages,
  onActionChat,
  onActionCheckLinkChat,
  onActionCreateThread,
  onActionGetThread,
} = STORE_VIRTUAL_ASSISTANT.StoreVirtualAssistant();

const inputMessage = ref("");
const isAnswering = ref(false);

const threadId = computed(() => ROUTE.query.thread);
const userId = computed(() => ROUTE.params.userId);

const onSetScrollTop = () => {
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }, 1);
};

const onClickButtonBack = () => {
  messages.value = [];
  ROUTER.replace({ name: "VirtualAssistant" });
};

const onSendMessage = async () => {
  if (isAnswering.value) {
    return;
  }

  messages.value.push({ role: "user", content: inputMessage.value });
  onSetScrollTop();

  let inputMessageClone = inputMessage.value;
  inputMessage.value = "";
  setTimeout(() => {
    isAnswering.value = true;
    onSetScrollTop();
  }, 1000);

  const res = await onActionChat({
    threadId: threadId.value,
    userId: userId.value,
    content: inputMessageClone,
  });

  if (res.success) {
    messages.value = res.data;
  }

  onSetScrollTop();
  isAnswering.value = false;
};

onMounted(async () => {
  const resCheckLinkChat = await onActionCheckLinkChat(userId.value);
  if (!resCheckLinkChat.success) {
    ROUTER.replace({ name: "NotFound" });
    return;
  } else {
    userData.value.fullName = resCheckLinkChat?.data?.fullName || "";
    userData.value.userName = resCheckLinkChat?.data?.userName || "";

    if (!threadId.value) {
      const resCreateThread = await onActionCreateThread();
      if (resCreateThread.success) {
        ROUTER.replace({
          name: "VirtualAssistantChat",
          params: { userId: userData._id },
          query: { thread: resCreateThread.data.id },
        });
      }
    } else {
      await onActionGetThread(threadId.value);
    }
  }

  onSetScrollTop();
});
</script>

<template>
  <div class="flex flex-column h-full">
    <ButtonBack @onBack="onClickButtonBack" />

    <div
      style="max-width: 52rem"
      :class="{
        'px-3 pb-3': !isMobileScreen,
        'justify-content-center': !messages.length,
      }"
      class="flex flex-1 flex-column gap-4 m-auto w-full pt-3"
    >
      <!-- You -->
      <UserChat
        v-for="(item, index) in messages"
        :key="index"
        :image="''"
        :name="item.role"
        :message="item.content"
        :role="item.role"
      />

      <UserChat v-if="isAnswering" role="assistant" />

      <div
        v-if="!messages.length"
        class="flex justify-content-center align-items-center"
      >
        <div class="flex flex-column gap-3 align-items-center">
          <img
            class="w-10rem h-10rem"
            src="https://cdn-icons-png.flaticon.com/512/1698/1698535.png"
            alt="Lỗi ảnh"
          />
          <span class="text-center line-height-2">
            Chào bạn, tôi là chat bot do
            <span class="text-main-color">
              {{ userData.fullName || userData.userName }}
            </span>
            tạo ra!
          </span>
        </div>
      </div>
    </div>

    <div v-if="!isMobileScreen" class="h-4rem"></div>

    <!-- Input chat -->
    <div
      style="bottom: 1.8rem; background-color: #f2f1f7"
      class="fixed z-5 left-0 right-0 px-3"
    >
      <div
        style="max-width: 50rem"
        class="p-3 border-round-3xl box-shadow-1 flex bg-white m-auto flex-1"
      >
        <input
          v-model="inputMessage"
          type="text"
          class="w-full border-none outline-none"
          placeholder="Bạn muốn hỏi gì?"
          @keypress.enter="onSendMessage"
        />

        <div style="padding-left: 0.7rem" class="border-left-1 text-400">
          <i v-if="isAnswering" class="pi pi-spin pi-spinner text-900" />
          <i
            v-else
            class="pi pi-angle-right text-900 on-click"
            :class="{ 'p-disabled': !inputMessage }"
            @click="onSendMessage"
          />
        </div>
      </div>
    </div>
  </div>
</template>
