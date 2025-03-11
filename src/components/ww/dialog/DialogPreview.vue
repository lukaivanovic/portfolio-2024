<script setup>
import { ref, useTemplateRef, provide, computed, onMounted, watch } from "vue";
import DialogControls from "./DialogControls.vue";
import Dialog from "./Dialog.vue";
import "../../../styles/global.css";

const dialogRef = useTemplateRef("dialogRef");
const previewRef = useTemplateRef("previewRef");
const settingsOpened = ref(false);
const hasBeenInView = ref(false);

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

  console.log(newLayout);
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
</script>

<template>
  <div
    class="flex flex-col bg-white border border-neutral-200 rounded-md overflow-hidden mb-12 text-neutral-900"
    ref="previewRef"
  >
    <div
      class="border-b border-neutral-200 flex items-center justify-between p-2"
    >
      <div class="flex gap-1 basis-0 flex-grow">
        <div class="w-[10px] h-[10px] rounded-full bg-neutral-200"></div>
        <div class="w-[10px] h-[10px] rounded-full bg-neutral-200"></div>
        <div class="w-[10px] h-[10px] rounded-full bg-neutral-200"></div>
      </div>

      <div class="text-center basis-0 flex-grow text-xs">Dialog</div>
      <div class="basis-0 flex-grow"></div>
    </div>

    <div class="relative shadow-2xl bg-neutral-300 flex-grow">
      <div
        class="absolute left-2 top-2 z-40 w-[200px] bg-white rounded-md text-xs shadow-lg border border-neutral-200"
      >
        <DialogControls
          v-model="PARAMS"
          @layout-change="handleLayoutChange"
        ></DialogControls>
      </div>

      <div
        class="relative flex flex-col flex-grow h-full"
        @click="settingsOpened = false"
      >
        <div class="flex-grow flex items-center justify-center overflow-hidden">
          <template v-if="design == 'one'">
            <div
              class="max-w-[480px] bg-white p-4 rounded-md shadow-sm border border-neutral-200"
            >
              <!-- Product Image -->
              <div
                class="h-[240px] bg-neutral-100 rounded-lg flex-shrink-0 mb-8"
              >
                <img
                  src="/pattern.png"
                  alt="Premium Wireless Headphones"
                  class="w-full h-full object-cover rounded-lg"
                />
              </div>

              <!-- Product Details -->
              <div class="flex flex-col flex-shrink-0">
                <div>
                  <h2 class="text-xl font-semibold text-neutral-900 mb-1">
                    Abstract Generative Illustration Suite
                  </h2>
                  <p class="text-neutral-600 mb-4">
                    Create stunning algorithmic artwork with our abstract
                    generative illustration suite.
                  </p>
                </div>

                <div class="flex flex-row items-center gap-2 w-full">
                  <Dialog
                    :content="{ ...PARAMS }"
                    ref="dialogRef"
                    class="w-full"
                  >
                    <template #trigger>
                      <button
                        class="trigger after:bg-cyan-200 after:text-cyan-800 w-full relative px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-700 transition-colors text-nowrap"
                      >
                        Add to Cart
                      </button></template
                    >
                    <template #content>
                      <div
                        :class="{
                          'w-full rounded-none':
                            PARAMS.type == 'sheet' &&
                            (PARAMS.side == 'top' || PARAMS.side == 'bottom'),
                          'h-full rounded-none':
                            PARAMS.type == 'sheet' &&
                            (PARAMS.side == 'left' || PARAMS.side == 'right'),
                        }"
                        class="content after:bg-orange-200 after:text-orange-800 ww-dialog bg-white p-6 rounded-lg shadow-lg"
                      >
                        <div class="flex justify-between items-center mb-4">
                          <h3 class="text-xl font-semibold text-neutral-900">
                            Your Cart
                          </h3>
                          <button
                            class="text-neutral-600 hover:text-neutral-800"
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

                        <div class="space-y-4 mb-6">
                          <!-- Cart Item 1 -->
                          <div class="flex items-center space-x-4 py-2">
                            <div class="flex-1">
                              <h4 class="text-neutral-900 font-medium">
                                Abstract Generative Illustration Suite
                              </h4>
                              <p class="text-neutral-600 text-sm">
                                Illustration pack
                              </p>
                            </div>
                            <div class="text-right">
                              <p class="text-neutral-900">$299.99</p>
                              <div class="flex items-center mt-1">
                                <button
                                  class="text-neutral-600 hover:text-neutral-800 px-2"
                                >
                                  -
                                </button>
                                <span class="text-neutral-700 mx-2">1</span>
                                <button
                                  class="text-neutral-600 hover:text-neutral-800 px-2"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="border-t border-neutral-200 pt-4">
                          <div
                            class="flex justify-between text-neutral-700 mb-2"
                          >
                            <span>Subtotal</span>
                            <span>$299.99</span>
                          </div>
                          <div
                            class="flex justify-between text-neutral-700 mb-4"
                          >
                            <span>Shipping</span>
                            <span>Free</span>
                          </div>
                          <div
                            class="flex justify-between text-neutral-900 font-semibold mb-6"
                          >
                            <span>Total</span>
                            <span>$299.9</span>
                          </div>

                          <button
                            class="w-full py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-700 transition-colors font-medium"
                          >
                            Checkout
                          </button>
                          <button
                            class="w-full py-2 mt-2 text-neutral-600 hover:text-neutral-800 transition-colors"
                          >
                            Continue Shopping
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
          </template>
          <template v-if="design == 'two'">
            <div class="max-w-[720px] py-12">
              <div
                class="bg-white rounded-lg shadow-sm border border-neutral-200"
              >
                <div class="p-6">
                  <h2 class="text-xl font-semibold text-neutral-900 mb-4">
                    Your Cart
                  </h2>

                  <div class="divide-y divide-neutral-200">
                    <!-- Cart Item 1 -->
                    <div class="py-4 flex items-center gap-4">
                      <div
                        class="h-16 w-16 rounded-md bg-neutral-100 flex-shrink-0"
                      ></div>
                      <div class="flex-grow">
                        <h3 class="font-medium text-neutral-900">
                          Premium Wireless Headphones
                        </h3>
                        <p class="text-sm text-neutral-500">
                          Black | Noise Cancelling
                        </p>
                      </div>
                      <div class="flex items-center gap-4">
                        <div class="flex items-center">
                          <button
                            class="w-8 h-8 flex items-center justify-center rounded-md border border-neutral-200 text-neutral-500 hover:bg-neutral-50"
                          >
                            <span>-</span>
                          </button>
                          <span class="w-8 text-center text-neutral-900"
                            >1</span
                          >
                          <button
                            class="w-8 h-8 flex items-center justify-center rounded-md border border-neutral-200 text-neutral-500 hover:bg-neutral-50"
                          >
                            <span>+</span>
                          </button>
                        </div>
                        <span class="font-medium text-neutral-900"
                          >$299.99</span
                        >
                        <Dialog :content="{ ...PARAMS }" ref="dialogRef">
                          <template #trigger>
                            <button
                              class="relative trigger text-neutral-400 hover:text-red-500 transition-colors"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <path d="M3 6h18"></path>
                                <path
                                  d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
                                ></path>
                                <path
                                  d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
                                ></path>
                              </svg></button
                          ></template>
                          <template #content>
                            <div
                              :class="{
                                'w-full':
                                  PARAMS.type == 'sheet' &&
                                  (PARAMS.side == 'top' ||
                                    PARAMS.side == 'bottom'),
                                'h-full':
                                  PARAMS.type == 'sheet' &&
                                  (PARAMS.side == 'left' ||
                                    PARAMS.side == 'right'),
                              }"
                              class="content ww-dialog bg-white p-3 rounded-lg shadow-lg w-[360px] m-4"
                            >
                              <div class="flex items-center justify-between">
                                <h3
                                  class="text-md font-medium text-neutral-900"
                                >
                                  Remove item from cart
                                </h3>

                                <div class="flex flex-col items-center gap-2">
                                  <button
                                    class="w-[120px] px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                    @click="toggleDialog"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </template>
                          <template #overlay>
                            <div
                              class="absolute top-0 left-0 w-full h-full bg-black/40 overlay"
                            ></div>
                          </template>
                        </Dialog>
                      </div>
                    </div>

                    <!-- Cart Item 2 -->
                    <div class="py-4 flex items-center gap-4">
                      <div
                        class="h-16 w-16 rounded-md bg-neutral-100 flex-shrink-0"
                      ></div>
                      <div class="flex-grow">
                        <h3 class="font-medium text-neutral-900">
                          Wireless Earbuds
                        </h3>
                        <p class="text-sm text-neutral-500">
                          White | Water Resistant
                        </p>
                      </div>
                      <div class="flex items-center gap-4">
                        <div class="flex items-center">
                          <button
                            class="w-8 h-8 flex items-center justify-center rounded-md border border-neutral-200 text-neutral-500 hover:bg-neutral-50"
                          >
                            <span>-</span>
                          </button>
                          <span class="w-8 text-center text-neutral-900"
                            >2</span
                          >
                          <button
                            class="w-8 h-8 flex items-center justify-center rounded-md border border-neutral-200 text-neutral-500 hover:bg-neutral-50"
                          >
                            <span>+</span>
                          </button>
                        </div>
                        <span class="font-medium text-neutral-900"
                          >$159.98</span
                        >
                        <button
                          class="text-neutral-400 hover:text-red-500 transition-colors"
                          @click="toggleDialog"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M3 6h18"></path>
                            <path
                              d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
                            ></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 pt-6 border-t border-neutral-200">
                    <div class="flex justify-between mb-2">
                      <span class="text-neutral-500">Subtotal</span>
                      <span class="font-medium">$459.97</span>
                    </div>
                    <div class="flex justify-between mb-2">
                      <span class="text-neutral-500">Shipping</span>
                      <span class="font-medium">$9.99</span>
                    </div>
                    <div class="flex justify-between font-medium text-lg mt-4">
                      <span>Total</span>
                      <span>$469.96</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-if="design == 'three'">
            <div class="max-w-[720px] py-12">
              <div
                class="bg-white rounded-lg shadow-sm border border-neutral-200 p-6"
              >
                <h2 class="text-xl font-semibold text-neutral-900 mb-6">
                  Property Listings
                </h2>

                <div class="border border-neutral-200 rounded-lg">
                  <!-- Table Header -->
                  <div
                    class="grid grid-cols-3 bg-neutral-50 border-b border-neutral-200"
                  >
                    <div class="px-4 py-3 text-sm font-medium text-neutral-700">
                      Property
                    </div>
                    <div class="px-4 py-3 text-sm font-medium text-neutral-700">
                      Location
                    </div>
                    <div class="px-4 py-3 text-sm font-medium text-neutral-700">
                      Price
                    </div>
                  </div>

                  <!-- Table Rows -->
                  <div class="divide-y divide-neutral-200">
                    <Dialog :content="{ ...PARAMS }" ref="dialogRef">
                      <template #trigger>
                        <div
                          class="relative trigger grid grid-cols-3 hover:bg-neutral-50 cursor-pointer"
                        >
                          <div class="px-4 py-3 text-neutral-800">
                            Modern Apartment
                          </div>
                          <div class="px-4 py-3 text-neutral-600">Downtown</div>
                          <div class="px-4 py-3 text-neutral-800 font-medium">
                            $350,000
                          </div>
                        </div>
                      </template>

                      <template #content>
                        <div
                          :class="{
                            'w-full rounded-none':
                              PARAMS.type == 'sheet' &&
                              (PARAMS.side == 'top' || PARAMS.side == 'bottom'),
                            'h-full rounded-none':
                              PARAMS.type == 'sheet' &&
                              (PARAMS.side == 'left' || PARAMS.side == 'right'),
                          }"
                          class="content ww-dialog bg-white p-6 rounded-lg shadow-lg w-[400px]"
                        >
                          <div
                            class="h-48 bg-neutral-100 rounded-lg mb-4"
                          ></div>
                          <h3
                            class="text-xl font-semibold text-neutral-900 mb-2"
                          >
                            Modern Apartment
                          </h3>
                          <p class="text-neutral-600 mb-4">
                            Downtown | 2 bed | 2 bath | 1,200 sq ft
                          </p>

                          <div class="space-y-4 mb-6">
                            <div>
                              <h4 class="font-medium text-neutral-800 mb-1">
                                Description
                              </h4>
                              <p class="text-neutral-600 text-sm">
                                A beautiful modern apartment in the heart of
                                downtown. Features include hardwood floors,
                                stainless steel appliances, and floor-to-ceiling
                                windows with city views.
                              </p>
                            </div>
                          </div>

                          <div class="flex justify-between items-center">
                            <span class="text-xl font-semibold text-neutral-900"
                              >$350,000</span
                            >
                            <button
                              class="px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
                            >
                              Contact Agent
                            </button>
                          </div>
                        </div>
                      </template>
                      <template #overlay>
                        <div
                          class="absolute top-0 left-0 w-full h-full bg-black/40 overlay"
                        ></div>
                      </template>
                    </Dialog>
                    <!-- Row 1 -->

                    <!-- Row 2 -->
                    <div
                      class="grid grid-cols-3 hover:bg-neutral-50 cursor-pointer"
                      @click="toggleDialog"
                    >
                      <div class="px-4 py-3 text-neutral-800">Family House</div>
                      <div class="px-4 py-3 text-neutral-600">Suburbs</div>
                      <div class="px-4 py-3 text-neutral-800 font-medium">
                        $520,000
                      </div>
                    </div>

                    <!-- Row 3 -->
                    <div
                      class="grid grid-cols-3 hover:bg-neutral-50 cursor-pointer"
                      @click="toggleDialog"
                    >
                      <div class="px-4 py-3 text-neutral-800">Luxury Villa</div>
                      <div class="px-4 py-3 text-neutral-600">Beachfront</div>
                      <div class="px-4 py-3 text-neutral-800 font-medium">
                        $1,250,000
                      </div>
                    </div>
                  </div>
                </div>

                <p class="mt-4 text-sm text-neutral-500">
                  Click on any property to view more details
                </p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "../../../styles/global.css";

.overlay {
  inset: -2;
  border: 1px dashed;
  border-color: var(--color-border-purple-600);

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
  border-color: var(--color-border-orange-400);

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
  border-color: var(--color-border-cyan-400);

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
