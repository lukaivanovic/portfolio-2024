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
    <div class="p-2 space-y-2">
      <!-- Layout Selection -->
      <button
        class="w-full px-3 h-7 rounded text-center bg-neutral-800 hover:bg-neutral-700 transition-colors text-neutral-50"
        @click="toggleDialog"
      >
        Toggle
      </button>

      <!-- Type Selection -->
      <div>
        <div
          class="flex rounded overflow-hidden border border-neutral-700 p-0.5 gap-0.5"
        >
          <button
            @click="updateType('modal')"
            class="flex-1 py-1 text-xs transition-colors rounded-sm"
            :class="
              model.type === 'modal'
                ? 'bg-neutral-600 text-neutral-50'
                : ' text-neutral-200 hover:bg-neutral-700'
            "
          >
            Modal
          </button>
          <button
            @click="updateType('sheet')"
            class="flex-1 py-1 text-xs transition-colors rounded-sm"
            :class="
              model.type === 'sheet'
                ? 'bg-neutral-600 text-neutral-50'
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
            class="flex rounded overflow-hidden border border-neutral-700 p-0.5 gap-0.5"
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
                  ? 'bg-neutral-600 text-neutral-50'
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
                  ? 'bg-neutral-600 text-neutral-50'
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
            class="flex rounded overflow-hidden border border-neutral-700 p-0.5 gap-0.5"
          >
            <button
              @click="model.align = 'top'"
              class="flex-1 py-1 text-xs transition-colors"
              :class="
                model.align === 'top'
                  ? 'bg-neutral-600 text-neutral-50'
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
                  ? 'bg-neutral-600 text-neutral-50'
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
                  ? 'bg-neutral-600 text-neutral-50'
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
                  ? 'bg-neutral-600 text-neutral-50'
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
                  ? 'bg-neutral-600 text-neutral-50'
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
                  ? 'bg-neutral-600 text-neutral-50'
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
                  ? 'bg-neutral-600 text-neutral-50'
                  : ' text-neutral-200 hover:bg-neutral-700'
              "
            >
              Bottom
            </button>
          </div>
        </div>
      </template>

      <!-- Animation Selection -->
      <div>
        <select
          v-model="model.animation"
          class="bg-neutral-800 text-neutral-200 rounded px-1 py-1 outline outline-1 outline-neutral-700 border-r-8 border-transparent"
        >
          <option value="zoom">Zoom</option>
          <option value="fade">Fade</option>
          <option value="slide-in-right">Slide in right</option>
          <option value="slide-in-left">Slide in left</option>
          <option value="slide-in-top">Slide in top</option>
          <option value="slide-in-bottom">Slide in bottom</option>
        </select>
      </div>

      <!-- Animation Duration -->
      <div>
        <input
          type="number"
          v-model="model.animationDuration"
          min="0"
          max="1000"
          class="bg-neutral-800 text-neutral-200 rounded px-1 py-1 outline outline-1 outline-neutral-700"
        />
      </div>

      <!-- Checkboxes -->
      <div class="space-y-2">
        <button
          @click="model.overlay = !model.overlay"
          class="w-full px-3 h-7 rounded text-center bg-neutral-800 hover:bg-neutral-700 transition-colors"
          :class="model.overlay ? 'text-neutral-50' : 'text-neutral-300'"
        >
          {{ model.overlay ? "Hide overlay" : "Show overlay" }}
        </button>

        <button
          @click="model.overlayClickCloses = !model.overlayClickCloses"
          class="w-full px-3 h-7 rounded text-center bg-neutral-800 hover:bg-neutral-700 transition-colors"
          :class="
            model.overlayClickCloses ? 'text-neutral-50' : 'text-neutral-300'
          "
        >
          {{
            model.overlayClickCloses
              ? "Disable overlay closing"
              : "Enable overlay closing"
          }}
        </button>

        <button
          @click="model.trigger = !model.trigger"
          class="w-full px-3 h-7 rounded text-center bg-neutral-800 hover:bg-neutral-700 transition-colors"
          :class="model.trigger ? 'text-neutral-50' : 'text-neutral-300'"
        >
          {{ model.trigger ? "Hide trigger" : "Show trigger" }}
        </button>

        <button
          @click="model.triggerClickOpens = !model.triggerClickOpens"
          class="w-full px-3 h-7 rounded text-center bg-neutral-800 hover:bg-neutral-700 transition-colors"
          :class="
            model.triggerClickOpens ? 'text-neutral-50' : 'text-neutral-300'
          "
        >
          {{
            model.triggerClickOpens
              ? "Disable trigger opening"
              : "Enable trigger opening"
          }}
        </button>
      </div>
    </div>

    <div>
      <div class="p-2 border-t border-neutral-800">
        <ul>
          <li class="flex items-center justify-start rounded h-7">
            <div class="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
            <span class="text-neutral-300">Trigger</span>
          </li>

          <Transition>
            <div v-if="isOpen">
              <li class="flex items-center justify-start rounded h-7">
                <div class="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                <span class="text-neutral-300">Content</span>
              </li>

              <li class="flex items-center justify-start rounded h-7">
                <div class="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span class="text-neutral-300">Overlay</span>
              </li>
            </div>
          </Transition>
        </ul>
      </div>
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
