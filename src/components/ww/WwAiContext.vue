<template>
  <div
    class="subpixel-antialiased ww ww-theme-light w-[400px] h-[400px] flex flex-col justify-end"
  >
    <!-- Input Area -->
    <div
      class="chat-input m-3 border-secondary rounded-md bg-white shadow-sm"
      ref="initialChat"
    >
      <!-- Add context button -->
      <div class="relative flex items-center px-2 pt-2">
        <button class="content-secondary p-[1px] border-secondary rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="currentColor"
            viewBox="0 0 14 14"
          >
            <path
              fill-rule="evenodd"
              d="M7 2.906a4.094 4.094 0 1 0 2.154 7.576.5.5 0 0 1 .527.85A5.094 5.094 0 1 1 12.094 7c0 .562-.138 1.175-.483 1.65-.363.499-.938.811-1.69.743a2.137 2.137 0 0 1-1.497-.816c-.478.621-1.217.997-2.032.882-1.285-.18-2.053-1.478-1.87-2.774.181-1.295 1.277-2.331 2.562-2.15a2.06 2.06 0 0 1 1.174.585.5.5 0 0 1 .986.165l-.263 1.81a1.145 1.145 0 0 0 1.03 1.302c.387.035.626-.108.792-.336.184-.254.29-.64.29-1.061A4.094 4.094 0 0 0 7 2.906Zm-.056 2.619c-.617-.087-1.31.422-1.433 1.3-.123.877.403 1.557 1.02 1.644.617.086 1.31-.423 1.433-1.3s-.402-1.558-1.02-1.644Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <div
          class="w-[360px] p-2 bg-primary rounded-lg shadow-sm border-secondary absolute bottom-6 left-2"
        >
          <!-- Segmented Control -->
          <div
            class="flex w-full mb-2 bg-secondary border-secondary rounded-lg p-0.5 h-[28px]"
          >
            <button
              class="flex-1 px-2 body-sm font-medium rounded-md bg-primary text-neutral-800 shadow-sm border-secondary"
            >
              Context
            </button>
            <button
              class="flex-1 px-2 body-sm font-medium rounded-md text-neutral-500"
            >
              Variables
            </button>
            <button
              class="flex-1 px-2 body-sm font-medium rounded-md text-neutral-500"
            >
              Data
            </button>
            <button
              class="flex-1 px-2 body-sm font-medium rounded-md text-neutral-500"
            >
              User
            </button>
          </div>

          <!-- Search Bar -->
          <div
            class="relative mb-2 h-[28px] flex items-center justify-between rounded-md border-secondary bg-secondary"
          >
            <div class="w-full pl-2 body-sm content-secondary">Search</div>
            <svg
              class="w-4 h-4 text-neutral-500 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clip-rule="evenodd"
              />
            </svg>
          </div>

          <!-- Context Variables List -->
          <div>
            <div class="flex items-center h-6 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.313 6.48a.5.5 0 0 1 .707 0L8 8.46l1.98-1.98a.5.5 0 0 1 .707.707L8.56 9.314a.79.79 0 0 1-1.12 0L5.313 7.187a.5.5 0 0 1 0-.707Z"
                  clip-rule="evenodd"
                />
              </svg>

              <div
                class="p-1 body-sm bg-binding text-white rounded-md flex items-center gap-1"
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
                    d="M2 8a.5.5 0 0 1 .5-.5H3a2 2 0 0 1 2 2V11a1 1 0 0 0 1 1h.5a.5.5 0 0 1 0 1H6a2 2 0 0 1-2-2V9.5a1 1 0 0 0-1-1h-.5A.5.5 0 0 1 2 8Z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M2 8a.5.5 0 0 0 .5.5H3a2 2 0 0 0 2-2V5a1 1 0 0 1 1-1h.5a.5.5 0 0 0 0-1H6a2 2 0 0 0-2 2v1.5a1 1 0 0 1-1 1h-.5A.5.5 0 0 0 2 8Zm12 0a.5.5 0 0 0-.5-.5H13a2 2 0 0 0-2 2V11a1 1 0 0 1-1 1h-.5a.5.5 0 0 0 0 1h.5a2 2 0 0 0 2-2V9.5a1 1 0 0 1 1-1h.5A.5.5 0 0 0 14 8Z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M14 8a.5.5 0 0 1-.5.5H13a2 2 0 0 1-2-2V5a1 1 0 0 0-1-1h-.5a.5.5 0 0 1 0-1h.5a2 2 0 0 1 2 2v1.5a1 1 0 0 0 1 1h.5a.5.5 0 0 1 .5.5Z"
                    clip-rule="evenodd"
                  />
                </svg>

                local.data
              </div>
              <span class="body-sm content-tertiary ml-2">Object</span>
            </div>
            <div class="flex items-center h-6 rounded-md ml-6">
              <div
                class="p-1 body-sm bg-binding text-white rounded-md flex items-center gap-1"
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
                    d="M6.055 3.003a.5.5 0 0 1 .442.552l-1 9a.5.5 0 0 1-.994-.11l1-9a.5.5 0 0 1 .552-.442Zm5 0a.5.5 0 0 1 .442.552l-1 9a.5.5 0 1 1-.994-.11l1-9a.5.5 0 0 1 .552-.442Z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M3.5 5.5A.5.5 0 0 1 4 5h9a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.5-.5Zm-.5 5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Z"
                    clip-rule="evenodd"
                  />
                </svg>

                id
              </div>
              <span class="body-sm content-binding-secondary ml-2">1</span>
            </div>
            <div class="flex items-center h-6 rounded-md ml-6">
              <div
                class="p-1 body-sm bg-binding text-white rounded-md flex items-center gap-1"
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
                    d="M5.5 12.5A.5.5 0 0 1 6 12h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5ZM3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V4H4v1.5a.5.5 0 0 1-1 0v-2Z"
                    clip-rule="evenodd"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M8 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0v-9A.5.5 0 0 1 8 3Z"
                    clip-rule="evenodd"
                  />
                </svg>

                currentUser
              </div>
              <span class="body-sm content-warning-secondary ml-2">John</span>
            </div>
            <div class="flex items-center h-6 rounded-md ml-6">
              <div
                class="p-1 body-sm bg-binding text-white rounded-md flex items-center gap-1"
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
                    d="M6 4.5c-.179 0-.354.013-.526.04a.5.5 0 1 0 .15.988 2.524 2.524 0 0 1 .753 0 .5.5 0 1 0 .15-.989A3.525 3.525 0 0 0 6 4.5Zm2.075.681a.5.5 0 0 0-.594.805c.06.044.12.092.175.141.21-.263.464-.49.75-.669a3.516 3.516 0 0 0-.331-.277Zm-.419 4.692c.21.263.464.49.75.669a3.496 3.496 0 0 1-.331.277.5.5 0 1 1-.594-.805c.06-.044.12-.092.175-.141ZM4.52 5.986a.5.5 0 0 0-.594-.805c-.284.21-.535.46-.744.744a.5.5 0 0 0 .805.594c.15-.204.33-.383.533-.533Zm-.99 1.637a.5.5 0 1 0-.99-.15 3.525 3.525 0 0 0 0 1.053.5.5 0 0 0 .99-.15 2.524 2.524 0 0 1 0-.753Zm.457 1.858a.5.5 0 0 0-.805.594c.21.284.46.535.744.744a.5.5 0 1 0 .594-.805 2.516 2.516 0 0 1-.533-.533Zm1.637.99a.5.5 0 0 0-.15.99 3.517 3.517 0 0 0 1.053 0 .5.5 0 1 0-.15-.99 2.512 2.512 0 0 1-.753 0Z"
                    clip-rule="evenodd"
                    opacity=".5"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M10 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM6.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Z"
                    clip-rule="evenodd"
                  />
                </svg>

                isAdmin
              </div>
              <span class="body-sm content-success-secondary ml-2">true</span>
            </div>
            <div class="flex items-center h-6 rounded-md ml-6">
              <div
                class="p-1 body-sm bg-binding text-white rounded-md flex items-center gap-1"
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
                    d="M3 3h3v1H4v8h2v1H3V3Zm9 1h-2V3h3v10h-3v-1h2V4Z"
                    clip-rule="evenodd"
                  />
                </svg>

                tasks
              </div>
              <span class="body-sm content-tertiary ml-2">8 items</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Text input area -->

      <textarea
        placeholder="Ask me anything..."
        class="w-full p-2 focus:outline-none focus:border-transparent resize-none body-sm placeholder:text-neutral-500"
        rows="1"
        v-model="currentTextAreaText"
        ref="textareaElement"
        @input="adjustTextareaHeight"
      ></textarea>

      <!-- Bottom toolbar -->
      <div class="flex items-center justify-between px-3 py-2">
        <div class="flex items-center space-x-3">
          <button class="content-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4.792 1.521a.5.5 0 0 1 .5.5c0 .901.2 1.436.517 1.753.318.318.852.518 1.753.518a.5.5 0 0 1 0 1c-.9 0-1.435.2-1.753.517-.318.318-.517.853-.517 1.754a.5.5 0 1 1-1 0c0-.901-.2-1.436-.518-1.754-.318-.317-.852-.517-1.753-.517a.5.5 0 0 1 0-1c.9 0 1.435-.2 1.753-.518.318-.317.518-.852.518-1.753a.5.5 0 0 1 .5-.5Zm0 2.576a2.347 2.347 0 0 1-.695.695 2.346 2.346 0 0 1 .695.694 2.346 2.346 0 0 1 .694-.694 2.347 2.347 0 0 1-.694-.695Zm4.958.924a.5.5 0 0 1 .5.5c0 1.407.311 2.307.867 2.862.555.556 1.455.867 2.862.867a.5.5 0 0 1 0 1c-1.407 0-2.307.311-2.862.867-.556.556-.867 1.455-.867 2.862a.5.5 0 1 1-1 0c0-1.407-.311-2.306-.867-2.862s-1.455-.867-2.862-.867a.5.5 0 0 1 0-1c1.407 0 2.306-.31 2.862-.867.556-.555.867-1.455.867-2.862a.5.5 0 0 1 .5-.5Zm0 3.133A3.378 3.378 0 0 1 8.154 9.75c.352.17.665.389.936.66.271.27.49.584.66.936.17-.352.389-.665.66-.936.27-.271.584-.49.936-.66a3.417 3.417 0 0 1-.936-.66 3.417 3.417 0 0 1-.66-.936Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <button class="content-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M5.083 2.75c.242 0 .438.196.438.438v.77a2.333 2.333 0 0 1 0 4.584v4.27a.438.438 0 0 1-.875 0v-4.27a2.333 2.333 0 0 1 0-4.584v-.77c0-.242.196-.438.437-.438Zm5.834 0c.241 0 .437.196.437.438v5.436a2.333 2.333 0 1 1-.875 0V3.187c0-.241.196-.437.438-.437ZM5.083 4.792a1.458 1.458 0 1 0 0 2.915 1.458 1.458 0 0 0 0-2.915Zm5.834 4.666a1.458 1.458 0 1 0-.001 2.916 1.458 1.458 0 0 0 0-2.916Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div class="flex items-center space-x-3">
          <button
            class="bg-brand flex items-center justify-center text-white p-1 rounded-md label-sm"
          >
            Send
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              class="ml-1"
            >
              <path
                fill-rule="evenodd"
                d="M12.12 2.884a.792.792 0 0 1 .996.996l-3.183 9.929c-.238.743-1.294.73-1.514-.02L7.014 8.987 2.21 7.58c-.749-.219-.762-1.275-.02-1.513l9.93-3.183Zm-.08 1.076L3.143 6.812l4.26 1.247a.792.792 0 0 1 .538.537l1.247 4.26L12.04 3.96Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@use "./tailwind.scss";
</style>
