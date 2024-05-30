<script lang="ts">
import { defineComponent } from "vue";
import draggable from "vuedraggable";
import { vscode } from "@/utilities/vscode";

export default defineComponent({
  name: "Mods",
  components: {
    draggable,
  },
  mounted() {
    console.log("Mounted");
    window.addEventListener('message', this.handleMessage)
  },
  methods:{
    handleMessage(event: MessageEvent) {
      console.log("Received message", event.data);
    },
    sendMessage(message: string) {
      vscode.postMessage({
        command: "hello",
        text: message,
      });
    }
  },
  data() {
    return {
      mods: __DEV_MODS__,
    };
  },
});
</script>

<template>
  <div class="draggable-container">
    <draggable v-model="mods" item-key="id">
      <template #item="{element}">
        <div class="draggable-item"> {{ element.name }}</div>
      </template>
    </draggable>
  </div>
  <button @click="sendMessage('HELLO')">Send Message</button>
</template>

<style scoped>
/* Style the draggable container */
.draggable-container {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9; /* Add background color */
}

/* Style the draggable items */
.draggable-item {
  cursor: grab;
  background-color: #f4f4f4;
  padding: 10px;
  margin-bottom: 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

/* Style the dragged item */
.draggable-item.dragging {
  opacity: 0.5;
}
</style>