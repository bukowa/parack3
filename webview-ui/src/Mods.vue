<script lang="ts">
import { defineComponent } from "vue";
import draggable from "vuedraggable";
import "./paradoks/mod"


export default defineComponent({
  name: "Mods",
  components: {
    draggable,
  },
  mounted() {
    console.log("Mounted");
  },
  data() {
    return {
      mods: [
        { id: 1, name: "Mod 1" },
        { id: 2, name: "Mod 2" },
        { id: 3, name: "Mod 3" },
        { id: 4, name: "Mod 4" },
        { id: 5, name: "Mod 5" },
      ],
    };
  },
});
</script>

<template>
  <draggable
    v-model="mods"
    item-key="id">
    <template #item="{element}">
      <div> {{ element.name }}</div>
    </template>
  </draggable>
</template>

<style scoped>

</style>