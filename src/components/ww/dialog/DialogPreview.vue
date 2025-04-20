<script setup>
import { ref, useTemplateRef, provide, computed, onMounted, watch } from "vue";
import DialogControls from "./DialogControls.vue";
import Dialog from "./Dialog.vue";
import "../../../styles/global.css";

const dialogRef = useTemplateRef("dialogRef");
const previewRef = useTemplateRef("previewRef");
const settingsOpened = ref(false);
const hasBeenInView = ref(false);
const closeTimeout = ref(null);

function toggleDialog() {
  if (dialogRef.value) {
    dialogRef.value.toggleDialog();
  }
}

function openDialog() {
  if (dialogRef.value) {
    dialogRef.value.openDialog();
  }
}

const isDialogOpen = computed(() => dialogRef.value?.isOpen);

provide("toggleDialog", toggleDialog);
provide("isOpen", isDialogOpen);

const design = ref("one");

function handleLayoutChange(newLayout) {
  switch (newLayout) {
    case "one":
      PARAMS.value = {
        type: "modal",
        side: "center",
        align: "center",
        animation: "zoom",
        animationDuration: 500,
        animationEasing: "ease",
        preventScrolling: false,
        overlay: true,
        trigger: true,
        overlayClickCloses: true,
        triggerClickOpens: true,
      };
      design.value = newLayout;
      setTimeout(() => {
        openDialog();
      }, 300);
      break;
    case "two":
      PARAMS.value = {
        type: "modal",
        side: "right",
        align: "bottom",
        animation: "fade",
        animationDuration: 500,
        animationEasing: "ease",
        preventScrolling: false,
        overlay: true,
        trigger: true,
        overlayClickCloses: true,
        triggerClickOpens: true,
      };
      design.value = newLayout;
      setTimeout(() => {
        openDialog();
      }, 300);
      break;
    case "three":
      PARAMS.value = {
        type: "sheet",
        side: "bottom",
        align: "bottom",
        animation: "slide-in-bottom",
        animationDuration: 500,
        animationEasing: "ease",
        preventScrolling: false,
        overlay: true,
        trigger: true,
        overlayClickCloses: true,
        triggerClickOpens: true,
      };
      design.value = newLayout;
      setTimeout(() => {
        openDialog();
      }, 300);
      break;
  }
}

onMounted(() => {
  // handleLayoutChange("one");

  // Create an Intersection Observer to detect when the component is scrolled into view
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !hasBeenInView.value) {
        // Component is now visible in the viewport and hasn't been in view before
        hasBeenInView.value = true;
        // Open the dialog after a short delay to ensure smooth animation
        setTimeout(() => {
          openDialog();
        }, 500);
      }
    },
    {
      // Options for the observer
      threshold: 0.5, // Trigger when at least 50% of the component is visible
      rootMargin: "0px", // No margin
    }
  );

  // Start observing the component
  if (previewRef.value) {
    observer.observe(previewRef.value);
  }
});

const PARAMS = ref({
  type: "modal",
  side: "center",
  align: "center",
  animation: "zoom",
  animationDuration: 500,
  animationEasing: "ease",
  preventScrolling: false,
  overlay: true,
  trigger: true,
  overlayClickCloses: true,
  triggerClickOpens: true,
});

watch(
  PARAMS,
  () => {
    if (!isDialogOpen.value) {
      openDialog();
    }
  },
  { deep: true }
);

function handleMouseEnter() {
  if (closeTimeout.value) {
    clearTimeout(closeTimeout.value);
  }
}

function handleMouseLeave() {
  closeTimeout.value = setTimeout(() => {
    settingsOpened.value = false;
  }, 200);
}

function toggleSettings() {
  settingsOpened.value = !settingsOpened.value;
}
</script>

<template>
  <div
    class="flex flex-col bg-neutral-800 rounded-md overflow-hidden mb-12 text-neutral-900"
    ref="previewRef"
  >
    <div class="relative shadow-2xl flex-grow">
      <div
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        class="absolute left-3 top-3 z-40"
      >
        <button
          @click="toggleSettings"
          class="pulse w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center hover:bg-neutral-600 transition-colors text-neutral-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path
              d="M64,105V40a8,8,0,0,0-16,0v65a32,32,0,0,0,0,62v49a8,8,0,0,0,16,0V167a32,32,0,0,0,0-62Zm-8,47a16,16,0,1,1,16-16A16,16,0,0,1,56,152Zm80-95V40a8,8,0,0,0-16,0V57a32,32,0,0,0,0,62v97a8,8,0,0,0,16,0V119a32,32,0,0,0,0-62Zm-8,47a16,16,0,1,1,16-16A16,16,0,0,1,128,104Zm104,64a32.06,32.06,0,0,0-24-31V40a8,8,0,0,0-16,0v97a32,32,0,0,0,0,62v17a8,8,0,0,0,16,0V199A32.06,32.06,0,0,0,232,168Zm-32,16a16,16,0,1,1,16-16A16,16,0,0,1,200,184Z"
            ></path>
          </svg>
        </button>

        <div
          v-if="settingsOpened"
          class="absolute left-0 top-10 w-[192px] text-xs"
        >
          <DialogControls
            v-model="PARAMS"
            @layout-change="handleLayoutChange"
          ></DialogControls>
        </div>
      </div>

      <div
        class="relative flex flex-col flex-grow h-full"
        @click="settingsOpened = false"
      >
        <div
          class="flex-grow flex items-center justify-center overflow-hidden scale-80"
        >
          <Dialog :content="{ ...PARAMS }" ref="dialogRef">
            <template #trigger>
              <button
                class="trigger after:bg-cyan-200 after:text-cyan-800 relative px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-700 transition-colors text-nowrap"
              >
                Click me!
              </button></template
            >
            <template #content>
              <div
                :class="{
                  'w-full rounded-none w-[320px]':
                    PARAMS.type == 'sheet' &&
                    (PARAMS.side == 'top' || PARAMS.side == 'bottom'),
                  'h-full rounded-none w-[320px]':
                    PARAMS.type == 'sheet' &&
                    (PARAMS.side == 'left' || PARAMS.side == 'right'),
                  'w-[440px]': PARAMS.type == 'modal',
                }"
                class="content after:bg-orange-200 after:text-orange-800 ww-dialog bg-black p-6 rounded-lg shadow-lg"
              >
                <div class="flex justify-between items-center mb-4">
                  <div class="text-lg font-semibold text-neutral-100">
                    Confirm Action
                  </div>
                  <button
                    class="text-neutral-400 hover:text-neutral-200"
                    @click="toggleDialog"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div class="mb-6">
                  <div class="text-neutral-400 text-md">
                    Are you sure you want to perform this action? This cannot be
                    undone.
                  </div>
                </div>

                <div class="flex gap-3 justify-end">
                  <button
                    class="px-4 py-2 border border-neutral-700 text-neutral-300 rounded-lg hover:bg-neutral-800 transition-colors"
                    @click="toggleDialog"
                  >
                    Cancel
                  </button>
                  <button
                    class="px-4 py-2 bg-neutral-700 text-white rounded-lg hover:bg-neutral-600 transition-colors font-medium"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </template>
            <template #overlay>
              <div
                class="absolute after:bg-purple-200 after:text-purple-800 top-0 left-0 w-full h-full bg-black/40 overlay"
              ></div>
            </template>
          </Dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../../styles/global.css";

.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.3);
  }
  80% {
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0);
  }
}

.overlay {
  inset: -2;
  border: 1px dashed;
  border-radius: 10px;
  border-color: var(--color-purple-600);

  &:after {
    content: "OVERLAY";
    position: absolute;
    bottom: 2px;
    right: 2px;
    font-size: 9px;
    font-family: monospace;
    padding: 2px 2px;
    border-radius: 4px;
    pointer-events: none;
  }
}

.content {
  inset: -2;
  border: 1px dashed;
  border-color: var(--color-orange-400);

  &:after {
    content: "CONTENT";
    position: absolute;
    top: 2px;
    right: 2px;
    font-size: 9px;
    font-family: monospace;
    padding: 2px 2px;
    border-radius: 4px;
    pointer-events: none;
  }
}

.trigger {
  inset: -2;
  border: 1px dashed;
  border-color: var(--color-cyan-400);

  &:after {
    content: "TRIGGER";
    position: absolute;
    top: calc(50% - 9px);
    left: calc(100% + 4px);
    font-size: 9px;
    font-family: monospace;
    padding: 2px 2px;
    border-radius: 4px;
    pointer-events: none;
    // z-index: 9999;
  }
}
</style>
