<template>
  <div
    class="w-full h-full flex items-center justify-center container-main"
    @click="togglePanel"
  >
    <div
      class="ww-theme-light ww topbar-panels flex items-center justify-center content-primary mr-2 scale-150 translate-z-0 backface-hidden subpixel-antialiased"
    >
      <button
        class="topbar-panels__button content-secondary"
        :class="{ '-edit': AIPanelOpened }"
      >
        <div
          class="topbar-panels__button-circle"
          id="toggle-circle"
          :class="{
            '-copilot': AIPanelOpened,
            '-edit': !AIPanelOpened,
          }"
        ></div>
        <div
          class="topbar-panels__button-item"
          :class="{
            'content-primary': AIPanelOpened,
            'content-tertiary': !AIPanelOpened,
          }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              d="M13.775 7.169A5.833 5.833 0 0 1 5.562 13.3l-3.535.66.708-3.447a5.833 5.833 0 0 1 5.04-8.343c-.165.32-.288.667-.362 1.03a4.834 4.834 0 0 0-3.71 7.015l.082.157-.479 2.332 2.396-.448.15.074a4.833 4.833 0 0 0 6.973-4.618c.343-.138.662-.322.95-.544Z"
            />
            <path
              d="M8.667 4c1.481-.444 2.222-1.185 2.666-2.667C11.778 2.815 12.518 3.556 14 4c-1.482.445-2.222 1.185-2.667 2.667C10.89 5.185 10.148 4.445 8.667 4Z"
            />
            <path
              fill-rule="evenodd"
              d="M11.333 1.037c.131 0 .246.086.284.211.213.71.49 1.217.87 1.598.381.38.888.657 1.598.87a.296.296 0 0 1 0 .568c-.71.213-1.217.49-1.598.87-.38.38-.657.887-.87 1.598a.296.296 0 0 1-.568 0c-.213-.71-.489-1.217-.87-1.598-.38-.38-.887-.657-1.597-.87a.296.296 0 0 1 0-.568c.71-.213 1.217-.49 1.597-.87.381-.38.657-.887.87-1.598a.296.296 0 0 1 .284-.21ZM9.516 4c.422.193.78.432 1.082.735.303.303.542.66.735 1.082a3.66 3.66 0 0 1 .735-1.082A3.64 3.64 0 0 1 13.15 4a3.655 3.655 0 0 1-1.082-.735 3.654 3.654 0 0 1-.735-1.082c-.193.422-.432.78-.735 1.082-.302.303-.66.542-1.082.735Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div
          class="topbar-panels__button-item"
          :class="{
            'content-primary': !AIPanelOpened,
            'content-tertiary': AIPanelOpened,
          }"
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
              d="M10.15 2.518a1.083 1.083 0 0 1 1.533 0l1.8 1.8a1.083 1.083 0 0 1 0 1.532l-7.73 7.729a1.084 1.084 0 0 1-.766.317H2.604a.5.5 0 0 1-.5-.5v-2.383c0-.288.114-.563.317-.766l7.73-7.73Zm.826.707a.083.083 0 0 0-.118 0L9.436 4.646l1.918 1.918 1.422-1.421a.083.083 0 0 0 0-.118l-1.8-1.8Zm-.329 4.046L8.729 5.353l-5.6 5.6a.083.083 0 0 0-.025.06v1.883h1.883a.083.083 0 0 0 .06-.024l5.6-5.6Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="tooltip px-0">Switch mode</div>
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "AiToggle",
  setup() {
    const metaKey = "CMD";

    const AIPanelOpened = ref(true);

    const togglePanel = () => {
      AIPanelOpened.value = !AIPanelOpened.value;
      document
        .getElementById("toggle-circle")
        .classList.add("button-circle-animation");

      console.log(document.getElementById("toggle-circle").classList);

      console.log(AIPanelOpened.value);
    };

    return {
      metaKey,
      AIPanelOpened,
      togglePanel,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "./tailwind.scss";

.topbar-panels {
  position: relative;
  width: 80px;
  // transform: scale(1.5);

  &__button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 28px;
    border-radius: 14px;
    padding: 1px;
    cursor: default !important;

    background: conic-gradient(
      from calc(var(--r2) - 80deg),
      var(--ww-color-border-secondary) 0%,
      var(--ww-color-border-binding) 40%,
      var(--ww-color-border-secondary) 100%
    );
    animation: -0.64s rotating2 3s linear infinite;

    &.-edit {
      background: var(--ww-color-border-secondary);
    }

    &:hover {
      &::after {
        background-color: var(--ww-color-bg-secondary-hover);
      }
    }

    &::after {
      content: "";
      display: block;
      position: absolute;
      background-color: var(--ww-color-bg-secondary);
      top: 1px;
      left: 1px;
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      border-radius: 15px;
      z-index: 0;
      transition: opacity 0.3s ease-in;
    }

    &-circle {
      width: 38px;
      height: 24px;
      inset: 2px;
      border-radius: 12px;
      background-color: var(--ww-color-bg);
      position: absolute;
      z-index: 1;
      transition: transform 0.3s ease;
      border: 1px solid var(--ww-color-border-secondary);

      &.-copilot {
        border: 1px solid var(--ww-color-border-binding);
        transform: translate(0px, 0px);
      }

      &.-edit {
        transform: translate(38px, 0px);
      }
    }

    &-item {
      flex-grow: 1;
      z-index: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      position: relative;
    }

    .tooltip {
      position: absolute;
      pointer-events: none;
      transition: opacity 0.3s ease, transform 0.3s ease;
      top: 32px;
      opacity: 0;
      will-change: opacity, transform;
      white-space: nowrap;
      user-select: none;
      background: var(--ww-color-bg-secondary);
      color: var(--ww-color-content-tertiary);
      border-radius: var(--ww-border-radius-01);
      transform: translateY(-8px);
      font-size: 8px;
    }
  }
}

.container-main {
  &:hover {
    .tooltip {
      transform: none;
      opacity: 1;
    }
  }
}

@property --r2 {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

@keyframes rotating2 {
  0% {
    --r2: 0deg;
  }
  100% {
    --r2: 360deg;
  }
}

.button-circle-animation {
  animation: 4s button-circle;
}

@keyframes button-circle {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.5);
  }
}
</style>
