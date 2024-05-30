import { createApp } from "vue";
import App from "./App.vue";
import "./dev"
import setupDev from "@/dev";


let app = createApp(App);
setupDev(app)
app.mount("#app");
