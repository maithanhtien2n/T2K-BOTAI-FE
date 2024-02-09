export default [
  {
    path: "app",
    name: "VirtualAssistant",
    component: () => import("../VirtualAssistant.vue"),
  },
  {
    path: "app/config",
    name: "VirtualAssistantConfig",
    component: () => import("../VirtualAssistantConfig.vue"),
  },
  {
    path: "app/chat/:userId",
    name: "VirtualAssistantChat",
    component: () => import("../VirtualAssistantChat.vue"),
  },
];
