import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import PrimeVue from "primevue/config";
import Tooltip from "primevue/tooltip";
import Aura from "@primeuix/themes/aura";
import "primeicons/primeicons.css";
import App from "@/App.vue";
import "@/styles/index.css";

const app = createApp(App);
app.directive("tooltip", Tooltip);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.mount("#app");
