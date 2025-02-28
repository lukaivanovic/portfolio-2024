<template>
  <div class="max-w-[720px] py-12">
    <!-- Product Image -->
    <div class="h-[240px] bg-neutral-800 rounded-lg flex-shrink-0"></div>

    <!-- Product Details -->
    <div class="flex items-start justify-between gap-12 flex-shrink-0">
      <div>
        <h2 class="text-2xl font-semibold text-neutral-100 mb-2">
          Premium Wireless Headphones
        </h2>
        <p class="text-neutral-500 mb-4">
          Experience crystal-clear sound with our premium wireless headphones.
          Features active noise cancellation and 30-hour battery life.
        </p>
      </div>

      <div class="flex flex-row items-center gap-2">
        <p class="text-md text-neutral-300" @click="toggleDialog">$299.99</p>
        <Dialog :content="content" ref="dialogRef">
          <template #trigger>
            <button
              class="w-full md:w-auto px-4 py-2 bg-white text-neutral-900 rounded-lg hover:bg-neutral-300 transition-colors text-nowrap"
            >
              Add to Cart
            </button></template
          >
          <template #content class="bg-red">
            <div class="bg-neutral-800 p-6 rounded-lg shadow-lg w-[400px]">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-semibold text-neutral-100">
                  Your Cart
                </h3>
                <button class="text-neutral-400 hover:text-neutral-200">
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
                <div
                  class="flex items-center space-x-4 py-2 border-b border-neutral-700"
                >
                  <div
                    class="h-16 w-16 bg-neutral-700 rounded-md flex-shrink-0"
                  ></div>
                  <div class="flex-1">
                    <h4 class="text-neutral-100 font-medium">
                      Premium Wireless Headphones
                    </h4>
                    <p class="text-neutral-400 text-sm">Black</p>
                  </div>
                  <div class="text-right">
                    <p class="text-neutral-100">$299.99</p>
                    <div class="flex items-center mt-1">
                      <button
                        class="text-neutral-400 hover:text-neutral-200 px-2"
                      >
                        -
                      </button>
                      <span class="text-neutral-300 mx-2">1</span>
                      <button
                        class="text-neutral-400 hover:text-neutral-200 px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Cart Item 2 -->
                <div
                  class="flex items-center space-x-4 py-2 border-b border-neutral-700"
                >
                  <div
                    class="h-16 w-16 bg-neutral-700 rounded-md flex-shrink-0"
                  ></div>
                  <div class="flex-1">
                    <h4 class="text-neutral-100 font-medium">Charging Case</h4>
                    <p class="text-neutral-400 text-sm">White</p>
                  </div>
                  <div class="text-right">
                    <p class="text-neutral-100">$49.99</p>
                    <div class="flex items-center mt-1">
                      <button
                        class="text-neutral-400 hover:text-neutral-200 px-2"
                      >
                        -
                      </button>
                      <span class="text-neutral-300 mx-2">1</span>
                      <button
                        class="text-neutral-400 hover:text-neutral-200 px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div class="border-t border-neutral-700 pt-4">
                <div class="flex justify-between text-neutral-300 mb-2">
                  <span>Subtotal</span>
                  <span>$349.98</span>
                </div>
                <div class="flex justify-between text-neutral-300 mb-4">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div
                  class="flex justify-between text-neutral-100 font-semibold mb-6"
                >
                  <span>Total</span>
                  <span>$349.98</span>
                </div>

                <button
                  class="w-full py-3 bg-white text-neutral-900 rounded-lg hover:bg-neutral-300 transition-colors font-medium"
                >
                  Checkout
                </button>
                <button
                  class="w-full py-2 mt-2 text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </template>
          <template #overlay>
            <div class="absolute top-0 left-0 w-full h-full bg-black/40"></div>
          </template>
        </Dialog>
      </div>

      <!-- Premium Headphones Information -->
    </div>

    <div class="mb-6">
      <ul class="text-neutral-300 space-y-2">
        <li class="flex items-start">
          <svg
            class="w-5 h-5 text-green-500 mr-2 mt-0.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Industry-leading noise cancellation
        </li>
        <li class="flex items-start">
          <svg
            class="w-5 h-5 text-green-500 mr-2 mt-0.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          30-hour battery life
        </li>
        <li class="flex items-start">
          <svg
            class="w-5 h-5 text-green-500 mr-2 mt-0.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          High-resolution audio certified
        </li>
        <li class="flex items-start">
          <svg
            class="w-5 h-5 text-green-500 mr-2 mt-0.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Multipoint connection
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import Dialog from "./Dialog.vue";

import { useTemplateRef } from "vue";

const dialogRef = useTemplateRef("dialogRef");

function toggleDialog() {
  if (dialogRef.value) {
    dialogRef.value.toggleDialog();
  }
}

defineProps({
  content: { type: Object },
});
</script>
