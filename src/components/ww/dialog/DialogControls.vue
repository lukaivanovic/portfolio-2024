<script setup>
import { ref, watch, inject } from "vue";

const layout = ref("one");
const emit = defineEmits(["layout-change"]);

watch(layout, (newValue) => {
  emit("layout-change", newValue);
});

const toggleDialog = inject("toggleDialog");
const isOpen = inject("isOpen");

function updateType(type) {
  if (type == "modal" && model.value.type == "sheet") {
    model.value.side = "center";
    model.value.align = "center";
  } else if (type == "sheet" && model.value.type == "modal") {
    model.value.side = "right";
  }

  model.value.type = type;
}

const model = defineModel({
  type: Object,
  default: {
    type: "modal",
    side: "left",
    align: "center",
    animation: "zoom",
    animationDuration: 300,
    animationEasing: "ease",
    preventScrolling: false,
    overlay: true,
    trigger: true,
    overlayClickCloses: true,
    triggerClickOpens: true,
  },
});
</script>

<template>
  <div>
    <div class="p-2 space-y-2">
      <!-- Layout Selection -->

      <!-- Type Selection -->
      <div>
        <div
          class="flex rounded-md overflow-hidden p-0.5 gap-0.5 h-6 bg-neutral-200"
        >
          <button
            @click="updateType('modal')"
            class="flex-1 text-xs transition-colors rounded-sm flex items-center justify-center"
            :class="
              model.type === 'modal'
                ? 'bg-white text-neutral-900'
                : ' text-neutral-500 hover:bg-neutral-100'
            "
          >
            Modal
          </button>
          <button
            @click="updateType('sheet')"
            class="flex-1 text-xs transition-colors rounded-sm flex items-center justify-center"
            :class="
              model.type === 'sheet'
                ? 'bg-white text-neutral-900'
                : ' text-neutral-500 hover:bg-neutral-100'
            "
          >
            Sheet
          </button>
        </div>
      </div>

      <template v-if="model.type === 'modal'">
        <!-- Side Selection -->
        <div>
          <div
            class="flex rounded-md overflow-hidden bg-neutral-200 p-0.5 gap-0.5 h-6"
          >
            <button
              @click="model.side = 'left'"
              class="flex-1 flex items-center rounded justify-center py-1 text-xs transition-colors"
              :class="
                model.side === 'left'
                  ? 'bg-white text-neutral-900'
                  : ' text-neutral-500 hover:bg-neutral-100'
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 14V2h1v12H2Z"
                  clip-rule="evenodd"
                />
                <path
                  d="M5 7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7Z"
                />
              </svg>
            </button>
            <button
              @click="model.side = 'center'"
              class="flex-1 flex items-center rounded justify-center py-1 text-xs transition-colors"
              :class="
                model.side === 'center'
                  ? 'bg-white text-neutral-900'
                  : ' text-neutral-500 hover:bg-neutral-100'
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5 7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7Z"
                />
                <path
                  fill-rule="evenodd"
                  d="M7.5 14V2h1v12h-1Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button
              @click="model.side = 'right'"
              class="flex-1 flex items-center rounded justify-center py-1 text-xs transition-colors"
              :class="
                model.side === 'right'
                  ? 'bg-white text-neutral-900'
                  : ' text-neutral-500 hover:bg-neutral-100'
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M13 14V2h1v12h-1Z"
                  clip-rule="evenodd"
                />
                <path
                  d="M5 7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7Z"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Align Selection -->
        <div>
          <div
            class="flex rounded-md overflow-hidden bg-neutral-200 p-0.5 gap-0.5 h-6"
          >
            <button
              @click="model.align = 'top'"
              class="flex-1 flex items-center rounded justify-center py-1 text-xs transition-colors"
              :class="
                model.align === 'top'
                  ? 'bg-white text-neutral-900'
                  : ' text-neutral-500 hover:bg-neutral-100'
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 2h12v1H2V2Z"
                  clip-rule="evenodd"
                />
                <path
                  d="M9 5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2Z"
                />
              </svg>
            </button>
            <button
              @click="model.align = 'center'"
              class="flex-1 flex items-center rounded justify-center py-1 text-xs transition-colors"
              :class="
                model.align === 'center'
                  ? 'bg-white text-neutral-900'
                  : ' text-neutral-500 hover:bg-neutral-100'
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 7.5h12v1H2v-1Z"
                  clip-rule="evenodd"
                />
                <path
                  d="M9 5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2Z"
                />
              </svg>
            </button>
            <button
              @click="model.align = 'bottom'"
              class="flex-1 flex items-center rounded justify-center py-1 text-xs transition-colors"
              :class="
                model.align === 'bottom'
                  ? 'bg-white text-neutral-900'
                  : ' text-neutral-500 hover:bg-neutral-100'
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M14 13H2v1h12v-1Z"
                  clip-rule="evenodd"
                />
                <path
                  d="M7 5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H7Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </template>

      <template v-else>
        <div>
          <div
            class="flex rounded-md overflow-hidden bg-neutral-200 p-0.5 gap-0.5"
          >
            <button
              @click="model.side = 'left'"
              class="flex-1 py-1 rounded flex items-center justify-center text-xs transition-colors"
              :class="
                model.side === 'left'
                  ? 'bg-white text-neutral-900'
                  : ' text-neutral-500 hover:bg-neutral-100'
              "
            >
              Left
            </button>
            <button
              @click="model.side = 'top'"
              class="flex-1 py-1 rounded flex items-center justify-center text-xs transition-colors"
              :class="
                model.side === 'top'
                  ? 'bg-white text-neutral-900'
                  : ' text-neutral-500 hover:bg-neutral-100'
              "
            >
              Top
            </button>
            <button
              @click="model.side = 'right'"
              class="flex-1 py-1 rounded flex items-center justify-center text-xs transition-colors"
              :class="
                model.side === 'right'
                  ? 'bg-white text-neutral-900'
                  : ' text-neutral-500 hover:bg-neutral-100'
              "
            >
              Right
            </button>
            <button
              @click="model.side = 'bottom'"
              class="flex-1 py-1 rounded flex items-center justify-center text-xs transition-colors"
              :class="
                model.side === 'bottom'
                  ? 'bg-white text-neutral-900'
                  : ' text-neutral-500 hover:bg-neutral-100'
              "
            >
              Bottom
            </button>
          </div>
        </div>
      </template>
    </div>

    <div class="p-2 border-t border-neutral-200">
      <!-- Animation Selection -->

      <div
        class="flex rounded overflow-hidden border border-neutral-200 p-0.5 gap-0.5"
      >
        <button
          @click="model.animation = 'fade'"
          class="flex-1 py-1 text-xs transition-colors"
          :class="
            model.animation === 'fade'
              ? 'bg-neutral-200 text-neutral-900'
              : ' text-neutral-700 hover:bg-neutral-100'
          "
        >
          Fade
        </button>
        <button
          @click="model.animation = 'zoom'"
          class="flex-1 py-1 text-xs transition-colors"
          :class="
            model.animation === 'zoom'
              ? 'bg-neutral-200 text-neutral-900'
              : ' text-neutral-700 hover:bg-neutral-100'
          "
        >
          Zoom
        </button>
        <button
          @click="model.animation = 'slide-in-bottom'"
          class="flex-1 py-1 text-xs transition-colors"
          :class="
            model.animation === 'slide-in-bottom'
              ? 'bg-neutral-200 text-neutral-900'
              : ' text-neutral-700 hover:bg-neutral-100'
          "
        >
          Slide in
        </button>
      </div>
    </div>

    <div class="p-2 border-t border-neutral-200">
      <!-- Buttons -->
      <div class="flex gap-2">
        <button
          @click="model.overlay = !model.overlay"
          class="flex-1 px-3 h-6 rounded text-center bg-neutral-100 hover:bg-neutral-200 transition-colors text-neutral-900"
        >
          Overlay
        </button>

        <button
          @click="model.trigger = !model.trigger"
          class="flex-1 px-3 h-6 rounded text-center bg-neutral-100 hover:bg-neutral-200 transition-colors text-neutral-900"
        >
          Trigger
        </button>
      </div>
    </div>

    <div class="p-2 border-t border-neutral-200">
      <ul>
        <li class="flex items-center justify-start rounded h-6">
          <div class="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
          <span class="text-neutral-900">Trigger</span>
        </li>

        <div :style="{ opacity: isOpen ? 1 : 0.5 }">
          <li class="flex items-center justify-start rounded h-6">
            <div class="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
            <span class="text-neutral-900">Content</span>
          </li>

          <li class="flex items-center justify-start rounded h-6">
            <div class="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            <span class="text-neutral-900">Overlay</span>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
