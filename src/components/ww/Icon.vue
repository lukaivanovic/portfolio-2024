<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    fill="currentColor"
    viewBox="0 0 16 16"
    :class="className"
  >
    <path fill-rule="evenodd" :d="path" clip-rule="evenodd" />
  </svg>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 16,
  },
  className: {
    type: String,
    default: "",
  },
});
</script>
