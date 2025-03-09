<template>
  <div class="h-full">
    <div
      class="subpixel-antialiased ww-theme-light body-sm ww border-secondary flex flex-col bg-white rounded-lg overflow-hidden w-[400px] h-full origin-top"
      ref="chat"
    >
      <!-- Header -->
      <div
        class="chat-header flex items-center justify-between px-3 py-2 border-b border-neutral-200"
      >
        <h2 class="label-sm text-neutral-800">WeWeb AI</h2>
        <div class="flex space-x-1">
          <button
            class="p-1 rounded-md text-neutral-800 hover:bg-neutral-100 transition-colors"
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
                d="M8 3.104a4.896 4.896 0 1 0 0 9.792 4.896 4.896 0 0 0 0-9.792ZM2.104 8a5.896 5.896 0 1 1 11.792 0A5.896 5.896 0 0 1 2.104 8ZM8 5.025a.5.5 0 0 1 .5.5V7.5h1.975a.5.5 0 0 1 0 1H8.5v1.975a.5.5 0 0 1-1 0V8.5H5.525a.5.5 0 0 1 0-1H7.5V5.525a.5.5 0 0 1 .5-.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <button
            class="p-1 rounded-md text-neutral-800 hover:bg-neutral-100 transition-colors"
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
                d="M8 5.021a.5.5 0 0 1 .5.5v2.272l1.896 1.895a.5.5 0 0 1-.708.707L7.647 8.354A.5.5 0 0 1 7.5 8V5.521a.5.5 0 0 1 .5-.5Zm-5.396-1.75a.5.5 0 0 1 .5.5v1.833h1.834a.5.5 0 0 1 0 1H2.604a.5.5 0 0 1-.5-.5V3.771a.5.5 0 0 1 .5-.5Z"
                clip-rule="evenodd"
              />
              <path
                fill-rule="evenodd"
                d="M7.992 3.104a4.905 4.905 0 0 0-4.52 2.992.5.5 0 0 1-.92-.39 5.905 5.905 0 0 1 5.44-3.602A5.9 5.9 0 0 1 13.896 8a5.9 5.9 0 0 1-5.904 5.896 5.905 5.905 0 0 1-5.567-3.93.5.5 0 0 1 .942-.334 4.905 4.905 0 0 0 4.625 3.264A4.9 4.9 0 0 0 12.896 8a4.9 4.9 0 0 0-4.904-4.896Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="flex flex-col flex-grow">
        <!-- Chat Messages -->
        <div
          class="chat-messages overflow-y-auto p-3 space-y-2 flex-grow"
          ref="chatContainer"
        >
          <!-- User Message -->
          <div
            class="flex flex-col bg-neutral-50 p-3 rounded-md border border-neutral-100 body-sm opacity-0 translate-y-[-24px]"
            ref="userMessage"
          >
            <div class="flex items-center mb-2">
              <div
                class="w-[16px] h-[16px] rounded-full bg-blue-500 flex items-center justify-center text-white mr-2"
              >
                <span class="text-[8px]">L</span>
              </div>
              <span class="label-sm">Luka</span>
            </div>

            <p class="text-neutral-800 mt-1">
              {{ messages[0].content }}
            </p>
          </div>

          <!-- AI Response -->
          <div class="flex flex-col bg-white p-3 rounded-md body-sm">
            <!-- Thinking State -->
            <div
              class="flex flex-col bg-white rounded-md body-sm opacity-0 mb-3"
              ref="AiAvatar"
            >
              <div class="flex items-center">
                <div
                  class="w-[20px] h-[20px] rounded-full bg-purple-500 flex items-center justify-center text-white"
                >
                  <span class="text-[10px]">AI</span>
                </div>
                <div class="relative inline-block h-[14px] w-[160px]">
                  <Transition name="slide-up">
                    <div v-if="!isResponseLoading">
                      <span
                        class="absolute ml-2 text-neutral-500 loading-dots whitespace-nowrap"
                      >
                        Thinking
                      </span>
                    </div>
                    <span v-else class="absolute ml-2 label-sm content-primary">
                      Assistant
                    </span>
                  </Transition>
                </div>
              </div>
            </div>

            <p class="text-neutral-800 mb-3">
              {{ messages[1].currentContent }}
            </p>

            <div
              class="p-2 rounded-md mb-2 border border-neutral-200 shadow-sm max-w-[360px] opacity-0 flex items-center justify-between"
              ref="variableArtifact"
            >
              <div class="relative h-[16px] w-[120px]">
                <Transition name="slide-up">
                  <div
                    v-if="artifacts[0].loading"
                    class="absolute label-sm flex items-center"
                  >
                    <div class="text-pulse">
                      <Loader />
                    </div>
                    <span class="label-sm whitespace-nowrap ml-2"
                      >Creating variable</span
                    >
                  </div>
                  <div
                    v-else
                    class="absolute label-sm content-primary flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      class="text-neutral-700"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.646 5.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1-.708.707l-4-4a.5.5 0 0 1 0-.707Z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M5.646 10.354a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708.707l-4 4a.5.5 0 0 1-.708 0ZM4.361 3.128C3.227 4.312 2.5 6.05 2.5 8c0 1.95.727 3.688 1.861 4.872l-.722.691C2.318 12.184 1.5 10.196 1.5 8c0-2.196.818-4.184 2.139-5.563l.722.691Zm7.278 0C12.773 4.312 13.5 6.05 13.5 8c0 1.95-.727 3.688-1.861 4.872l.722.691C13.682 12.184 14.5 10.196 14.5 8c0-2.196-.818-4.184-2.139-5.563l-.722.691Z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <span class="label-sm whitespace-nowrap ml-2">Tasks</span>
                  </div>
                </Transition>
              </div>

              <span
                v-if="!artifacts[0].loading"
                class="text-xs text-neutral-600"
                >Created variable</span
              >
            </div>

            <div
              class="p-2 rounded-md mb-2 border border-neutral-200 shadow-sm max-w-[360px] opacity-0 flex items-center justify-between"
              ref="workflowArtifact"
            >
              <div class="relative h-[16px] w-[120px]">
                <Transition name="slide-up">
                  <div
                    v-if="artifacts[1].loading"
                    class="absolute label-sm flex items-center"
                  >
                    <div class="text-pulse">
                      <Loader />
                    </div>
                    <span class="label-sm whitespace-nowrap ml-2"
                      >Creating workflow</span
                    >
                  </div>
                  <div
                    v-else
                    class="absolute label-sm content-primary flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      class="text-neutral-700"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.406 2.476c.557-.808 1.823-.414 1.823.567v2.561h2.923a1 1 0 0 1 .823 1.568l-4.38 6.353c-.558.807-1.824.413-1.824-.568v-2.561H3.848a1 1 0 0 1-.823-1.568l4.381-6.352Zm.823.567L3.85 9.396h2.92a1 1 0 0 1 1 1v2.561l4.381-6.353H9.23a1 1 0 0 1-1-1v-2.56Z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <span class="label-sm whitespace-nowrap ml-2"
                      >Add new task</span
                    >
                  </div>
                </Transition>
              </div>

              <span
                v-if="!artifacts[1].loading"
                class="text-xs text-neutral-600"
                >Created workflow</span
              >
            </div>

            <p class="text-neutral-800 mb-3">
              {{ messages[2].currentContent }}
            </p>

            <div
              class="rounded-md mb-3 border border-neutral-200 shadow-sm max-w-[360px] opacity-0 overflow-hidden"
              ref="layoutArtifact"
            >
              <div class="flex items-center justify-between p-2">
                <div class="flex items-center">
                  <div class="relative inline-block h-[16px] w-[16px]">
                    <Transition name="slide-up">
                      <div v-if="artifacts[2].loading">
                        <div
                          class="absolute w-[16px] h-[16px] flex items-center justify-center text-pulse"
                        >
                          <Loader />
                        </div>
                      </div>
                      <div
                        v-else
                        class="absolute w-[16px] h-[16px] flex items-center justify-center"
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
                            d="M3.13 7.5h1.9c.055-1.35.33-2.584.762-3.524a5.38 5.38 0 0 1 .238-.46A4.9 4.9 0 0 0 3.13 7.5ZM8 2.104a5.896 5.896 0 1 0 0 11.792A5.896 5.896 0 0 0 8 2.104Zm0 1c-.371 0-.867.349-1.299 1.29-.364.79-.615 1.876-.67 3.106h3.937c-.054-1.23-.306-2.315-.67-3.107-.432-.94-.927-1.289-1.298-1.289ZM10.969 7.5c-.055-1.35-.33-2.584-.762-3.524a5.353 5.353 0 0 0-.237-.46 4.9 4.9 0 0 1 2.9 3.984h-1.9Zm-1.001 1H6.032c.054 1.23.305 2.315.67 3.107.431.94.927 1.289 1.298 1.289.37 0 .866-.349 1.299-1.29.363-.791.615-1.876.669-3.106Zm.002 3.983a5.34 5.34 0 0 0 .237-.459c.432-.94.707-2.173.762-3.524h1.902a4.9 4.9 0 0 1-2.901 3.983Zm-3.94 0a5.365 5.365 0 0 1-.238-.459c-.432-.94-.707-2.173-.761-3.524H3.129a4.9 4.9 0 0 0 2.901 3.983Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </Transition>
                  </div>

                  <span class="label-sm ml-2">Task Management</span>
                </div>
                <span class="text-xs text-neutral-600">Page</span>
              </div>

              <div class="p-2 bg-neutral-50 border-t border-neutral-200">
                <div class="relative h-[16px]">
                  <Transition name="slide-up">
                    <div class="absolute w-full">
                      <span
                        class="text-xs text-neutral-600"
                        v-if="currentElementIndex === 0"
                      >
                        Header
                      </span>
                      <span
                        class="text-xs text-neutral-600"
                        v-else-if="currentElementIndex === 1"
                      >
                        Navigation
                      </span>
                      <span
                        class="text-xs text-neutral-600"
                        v-else-if="currentElementIndex === 2"
                      >
                        TaskList
                      </span>
                      <span
                        class="text-xs text-neutral-600"
                        v-else-if="currentElementIndex === 3"
                      >
                        TaskCard
                      </span>
                      <span
                        class="text-xs text-neutral-600"
                        v-else-if="currentElementIndex === 4"
                      >
                        FilterBar
                      </span>
                      <span
                        class="text-xs text-neutral-600"
                        v-else-if="currentElementIndex === 5"
                      >
                        SearchInput
                      </span>
                      <span
                        class="text-xs text-neutral-600"
                        v-else-if="currentElementIndex === 6"
                      >
                        StatusDropdown
                      </span>
                      <span
                        class="text-xs text-neutral-600"
                        v-else-if="currentElementIndex === 7"
                      >
                        PriorityTag
                      </span>
                      <span
                        class="text-xs text-neutral-600"
                        v-else-if="currentElementIndex === 8"
                      >
                        AssigneeAvatar
                      </span>
                      <span
                        class="text-xs text-neutral-600"
                        v-else-if="currentElementIndex === 9"
                      >
                        Page generated
                      </span>
                    </div>
                  </Transition>
                </div>
              </div>
            </div>

            <p class="text-neutral-800 mb-3">
              {{ messages[3].currentContent }}
            </p>
          </div>
        </div>

        <!-- Input Area -->
        <div
          class="chat-input m-3 border-secondary rounded-md bg-white shadow-sm shrink-0"
          ref="initialChat"
        >
          <!-- Add context button -->
          <div class="flex items-center px-2 pt-2">
            <button
              class="content-secondary p-[1px] border-secondary rounded-md"
            >
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
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, useTemplateRef } from "vue";
import { animate } from "motion";
import Loader from "./Loader.vue";

const userMessage = useTemplateRef("userMessage");
const AiAvatar = useTemplateRef("AiAvatar");
const textareaElement = useTemplateRef("textareaElement");
const initialChat = useTemplateRef("initialChat");
const variableArtifact = useTemplateRef("variableArtifact");
const workflowArtifact = useTemplateRef("workflowArtifact");
const layoutArtifact = useTemplateRef("layoutArtifact");
const chatContainer = useTemplateRef("chatContainer");
const chat = useTemplateRef("chat");

const hasBeenInView = ref(false);
const currentTextAreaText = ref("");
const isResponseLoading = ref(false);
const currentElementIndex = ref(0);

const messages = ref([
  {
    content:
      "I want to create a task management app.I need the ability to create, edit and delete tasks. I also want task categories and priority levels.",
    currentContent: "",
  },
  {
    content:
      "I'll help you a task management app. Let's start by setting up the necessary variables and workflows to structure your layout properly.",
    currentContent: "",
  },
  {
    content: "Let's create the interface part next.",
    currentContent: "",
  },
  {
    content: "Done! Would you like to add anything else?",
    currentContent: "",
  },
]);

const artifacts = ref([
  {
    loading: true,
  },
  {
    loading: true,
  },
  {
    loading: true,
  },
]);

async function runAnimation() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await animate(chatContainer.value, { opacity: 1 }, { duration: 0.5 });

  await streamMessageToTextArea(messages.value[0]);

  await new Promise((resolve) => setTimeout(resolve, 200));

  await animate(
    chat.value,
    { opacity: 1 },
    { duration: 1 },
    { ease: "easeOut" }
  );
  await animate([
    [chat.value, { y: 0 }, { duration: 0.5 }, { ease: "easeInOut" }],
    [
      chat.value,
      { scale: 1.3 },
      { duration: 0.3 },
      { ease: "easeOut" },
      { delay: 0.02 },
      { at: 1 },
    ],
  ]);
  currentTextAreaText.value = "";
  await animate(
    userMessage.value,
    { opacity: 1, transform: "translateY(0px)" },
    { duration: 0.5 }
  );
  await animate(AiAvatar.value, { opacity: 1 }, { duration: 0.5 });
  await new Promise((resolve) => setTimeout(resolve, 1200));
  isResponseLoading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 200));
  await streamMessage(messages.value[1]);
  await animate(variableArtifact.value, { opacity: 1 }, { duration: 0.5 });
  await new Promise((resolve) => {
    setTimeout(() => {
      artifacts.value[0].loading = false;
      resolve();
    }, 1800);
  });
  await animate(workflowArtifact.value, { opacity: 1 }, { duration: 0.5 });
  await new Promise((resolve) => {
    setTimeout(() => {
      artifacts.value[1].loading = false;
      resolve();
    }, 3000);
  });
  await streamMessage(messages.value[2]);
  await animate(layoutArtifact.value, { opacity: 1 }, { duration: 0.5 });

  // Increment through element indices with random delays
  for (let i = 0; i <= 9; i++) {
    await new Promise((resolve) => {
      setTimeout(() => {
        currentElementIndex.value = i;
        resolve();
      }, Math.floor(Math.random() * 400) + 100); // Random delay between 100-500ms
    });
  }

  artifacts.value[2].loading = false;

  await streamMessage(messages.value[3]);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  await resetAnimation();

  await runAnimation();
}

async function resetAnimation() {
  await animate(chatContainer.value, { opacity: 0 }, { duration: 0.5 });

  currentTextAreaText.value = "";
  isResponseLoading.value = false;
  currentElementIndex.value = 0;

  messages.value.forEach((message) => {
    message.currentContent = "";
  });

  artifacts.value.forEach((artifact) => {
    artifact.loading = true;
  });

  animate(
    userMessage.value,
    { opacity: 0, transform: "translateY(-16px)" },
    { duration: 0.5 }
  );
  animate(AiAvatar.value, { opacity: 0 }, { duration: 0.5 });
  animate(variableArtifact.value, { opacity: 0 }, { duration: 0.5 });
  animate(workflowArtifact.value, { opacity: 0 }, { duration: 0.5 });
  animate(layoutArtifact.value, { opacity: 0 }, { duration: 0.5 });
  await animate([
    [chat.value, { y: 0 }, { duration: 0.5 }, { ease: "easeInOut" }],
    [
      chat.value,
      { scale: 1 },
      { duration: 0.3 },
      { ease: "easeInOut" },
      { delay: 0.02 },
      { at: 1 },
    ],
  ]);
}

onMounted(async () => {
  // Animation can now be triggered by calling runAnimation()

  // Create an Intersection Observer to detect when the component is scrolled into view
  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !hasBeenInView.value) {
        // Component is now visible in the viewport and hasn't been in view before
        hasBeenInView.value = true;
        // Open the dialog after a short delay to ensure smooth animation
        setTimeout(() => {
          runAnimation();
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
  if (chat.value) {
    observer.observe(chat.value);
  }
});

async function streamMessage(message) {
  const chars = message.content.split("");
  for (const char of chars) {
    message.currentContent += char;

    await new Promise((resolve) => setTimeout(resolve, 30)); // 20ms delay between chars
  }
}

async function streamMessageToTextArea(message) {
  const chars = message.content.split("");
  for (const char of chars) {
    message.currentContent += char;
    currentTextAreaText.value = message.currentContent;
    adjustTextareaHeight();
    await new Promise((resolve) => setTimeout(resolve, 30)); // 20ms delay between chars
  }
}

function adjustTextareaHeight() {
  textareaElement.value.style.height = "auto";
  textareaElement.value.style.height =
    textareaElement.value.scrollHeight + "px";
}
</script>

<style lang="scss" scoped>
@use "./tailwind.scss";

p {
  font-family: "Inter", sans-serif;
  font-size: 12px;
  line-height: 1.6;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}

@keyframes colorPulse {
  0% {
    color: theme("colors.neutral.400");
  }
  50% {
    color: theme("colors.neutral.800");
  }
  100% {
    color: theme("colors.neutral.400");
  }
}

.text-pulse {
  animation: colorPulse 1.3s infinite;
}
</style>
