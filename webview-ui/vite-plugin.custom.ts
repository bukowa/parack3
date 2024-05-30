import type { UserConfig } from "vite";
import * as path from "node:path";
import { parseMods } from "../src/mod";

export default function customPlugin() {
  return {
    name: 'vite-plugin-custom',
    config(config: UserConfig, { command }: { command: 'build' | 'serve' }) {
      if (command === 'serve') {
        let modDir = path.join(__dirname, "../example/mod")
        let mods = parseMods(modDir)
        config.define = {
          ...config.define,
          __DEV_MODS__: mods,
        };
      }
    }
  };
}
