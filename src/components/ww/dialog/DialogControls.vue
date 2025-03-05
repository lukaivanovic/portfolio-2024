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
    model.value.side = "left";
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
  <div class="w-[220px] bg-neutral-900 rounded-md text-xs shadow-sm">
    <div class="p-2 border-b border-neutral-700">
      <button
        class="w-full px-3 h-7 rounded text-center bg-neutral-700 hover:bg-neutral-800 transition-colors text-neutral-50"
        @click="toggleDialog"
      >
        Toggle
      </button>
    </div>
    <div class="p-2 space-y-2">
      <!-- Layout Selection -->

      <!-- Type Selection -->
      <div>
        <div
          class="flex rounded overflow-hidden border border-neutral-700 p-0.5 gap-0.5 h-7"
        >
          <button
            @click="updateType('modal')"
            class="flex-1 text-xs transition-colors rounded-sm flex items-center justify-center"
            :class="
              model.type === 'modal'
                ? 'bg-neutral-700 text-neutral-50'
                : ' text-neutral-200 hover:bg-neutral-700'
            "
          >
            Modal
          </button>
          <button
            @click="updateType('sheet')"
            class="flex-1 text-xs transition-colors rounded-sm flex items-center justify-center"
            :class="
              model.type === 'sheet'
                ? 'bg-neutral-700 text-neutral-50'
                : ' text-neutral-200 hover:bg-neutral-700'
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
            class="flex rounded overflow-hidden border border-neutral-700 p-0.5 gap-0.5 h-7"
          >
            <button
              @click="model.side = 'left'"
              class="flex-1 py-1 text-xs transition-colors"
              :class="
                model.side === 'left'
                  ? 'bg-neutral-600 text-neutral-50'
                  : ' text-neutral-200 hover:bg-neutral-700'
              "
            >
              Left
            </button>
            <button
              @click="model.side = 'center'"
              class="flex-1 py-1 text-xs transition-colors"
              :class="
                model.side === 'center'
                  ? 'bg-neutral-700 text-neutral-50'
                  : ' text-neutral-200 hover:bg-neutral-700'
              "
            >
              Center
            </button>
            <button
              @click="model.side = 'right'"
              class="flex-1 py-1 text-xs transition-colors"
              :class="
                model.side === 'right'
                  ? 'bg-neutral-700 text-neutral-50'
                  : ' text-neutral-200 hover:bg-neutral-700'
              "
            >
              Right
            </button>
          </div>
        </div>

        <!-- Align Selection -->
        <div>
          <div
            class="flex rounded overflow-hidden border border-neutral-700 p-0.5 gap-0.5 h-7"
          >
            <button
              @click="model.align = 'top'"
              class="flex-1 py-1 text-xs transition-colors"
              :class="
                model.align === 'top'
                  ? 'bg-neutral-700 text-neutral-50'
                  : ' text-neutral-200 hover:bg-neutral-700'
              "
            >
              Top
            </button>
            <button
              @click="model.align = 'center'"
              class="flex-1 py-1 text-xs transition-colors"
              :class="
                model.align === 'center'
                  ? 'bg-neutral-700 text-neutral-50'
                  : ' text-neutral-200 hover:bg-neutral-700'
              "
            >
              Center
            </button>
            <button
              @click="model.align = 'bottom'"
              class="flex-1 py-1 text-xs transition-colors"
              :class="
                model.align === 'bottom'
                  ? 'bg-neutral-700 text-neutral-50'
                  : ' text-neutral-200 hover:bg-neutral-700'
              "
            >
              Bottom
            </button>
          </div>
        </div>
      </template>

      <template v-else>
        <div>
          <div
            class="flex rounded overflow-hidden border border-neutral-700 p-0.5 gap-0.5"
          >
            <button
              @click="model.side = 'left'"
              class="flex-1 py-1 text-xs transition-colors"
              :class="
                model.side === 'left'
                  ? 'bg-neutral-700 text-neutral-50'
                  : ' text-neutral-200 hover:bg-neutral-700'
              "
            >
              Left
            </button>
            <button
              @click="model.side = 'top'"
              class="flex-1 py-1 text-xs transition-colors"
              :class="
                model.side === 'top'
                  ? 'bg-neutral-700 text-neutral-50'
                  : ' text-neutral-200 hover:bg-neutral-700'
              "
            >
              Top
            </button>
            <button
              @click="model.side = 'right'"
              class="flex-1 py-1 text-xs transition-colors"
              :class="
                model.side === 'right'
                  ? 'bg-neutral-700 text-neutral-50'
                  : ' text-neutral-200 hover:bg-neutral-700'
              "
            >
              Right
            </button>
            <button
              @click="model.side = 'bottom'"
              class="flex-1 py-1 text-xs transition-colors"
              :class="
                model.side === 'bottom'
                  ? 'bg-neutral-700 text-neutral-50'
                  : ' text-neutral-200 hover:bg-neutral-700'
              "
            >
              Bottom
            </button>
          </div>
        </div>
      </template>
    </div>

    <div class="p-2 border-t border-neutral-700">
      <!-- Animation Selection -->

      <div
        class="flex rounded overflow-hidden border border-neutral-700 p-0.5 gap-0.5"
      >
        <button
          @click="model.animation = 'fade'"
          class="flex-1 py-1 text-xs transition-colors"
          :class="
            model.animation === 'fade'
              ? 'bg-neutral-700 text-neutral-50'
              : ' text-neutral-200 hover:bg-neutral-700'
          "
        >
          Fade
        </button>
        <button
          @click="model.animation = 'zoom'"
          class="flex-1 py-1 text-xs transition-colors"
          :class="
            model.animation === 'zoom'
              ? 'bg-neutral-700 text-neutral-50'
              : ' text-neutral-200 hover:bg-neutral-700'
          "
        >
          Zoom
        </button>
        <button
          @click="model.animation = 'slide-in-bottom'"
          class="flex-1 py-1 text-xs transition-colors"
          :class="
            model.animation === 'slide-in-bottom'
              ? 'bg-neutral-700 text-neutral-50'
              : ' text-neutral-200 hover:bg-neutral-700'
          "
        >
          Slide in
        </button>
      </div>
    </div>

    <div class="p-2 border-t border-neutral-700">
      <!-- Buttons -->
      <div class="flex gap-2">
        <button
          @click="model.overlay = !model.overlay"
          class="flex-1 px-3 h-7 rounded text-center bg-neutral-700 hover:bg-neutral-700 transition-colors text-neutral-50"
        >
          {{ model.overlay ? "Hide overlay" : "Show overlay" }}
        </button>

        <button
          @click="model.trigger = !model.trigger"
          class="flex-1 px-3 h-7 rounded text-center bg-neutral-700 hover:bg-neutral-700 transition-colors text-neutral-50"
        >
          {{ model.trigger ? "Hide trigger" : "Show trigger" }}
        </button>
      </div>
    </div>

    <div class="p-2 border-t border-neutral-700">
      <ul>
        <li class="flex items-center justify-start rounded h-7">
          <div class="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
          <span class="text-neutral-100">Trigger</span>
        </li>

        <div :style="{ opacity: isOpen ? 1 : 0.5 }">
          <li class="flex items-center justify-start rounded h-7">
            <div class="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
            <span class="text-neutral-100">Content</span>
          </li>

          <li class="flex items-center justify-start rounded h-7">
            <div class="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            <span class="text-neutral-100">Overlay</span>
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
