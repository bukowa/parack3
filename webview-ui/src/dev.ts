import type { App } from "vue";

const setupDev = function(app: App){
  console.log(`Running in ${import.meta.env.MODE} mode`);

  if (import.meta.env.MODE === "development") {
    console.log(`Current file path: ${import.meta.url}`);
  }
}

export default setupDev;