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
    window.addEventListener("message", this.handleMessage);
  },
  methods: {
    handleMessage(event: MessageEvent) {
      console.log("Received message", event.data);
    },
    sendMessage(message: string) {
      vscode.postMessage({
        command: "hello",
        text: message,
      });
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        ghostClass: "ghost",
      };
    },
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
    <table class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Version</th>
        <th>Supported Version</th>
      </tr>
      </thead>
      <draggable v-model="mods" tag="tbody" v-bind="dragOptions">
        <template #item="{element}">
          <tr class="draggable-item">
            <td>{{ element.remote_file_id }}</td>
            <td>{{ element.name }}</td>
            <td>{{ element.version }}</td>
            <td>{{ element.supported_version }}</td>
          </tr>
        </template>
      </draggable>
    </table>

  </div>
  <button @click="sendMessage('HELLO')">Send Message</button>
</template>

<style scoped>

.draggable-container {
  border: 1px solid #ccc;
  padding: 15px;
  width: 90%;
  margin: 0 auto;
}

.draggable-item {
  cursor: grab;
}

.ghost {
  opacity: 0.5;
  background: cornflowerblue;
}
</style>