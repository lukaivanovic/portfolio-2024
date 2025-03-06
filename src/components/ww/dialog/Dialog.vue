<template>
  <div
    :style="
      content.animation
        ? {
            '--transition-duration': animationDuration,
            '--transition-easing': content.animationEasing,
          }
        : null
    "
    role="dialog"
  >
    <div v-if="content.trigger" @click="onTriggerClick()" class="w-full">
      <slot name="trigger" />
    </div>

    <div v-if="isOpen">
      <div
        v-if="content.clickOutsideCloses"
        class="pointer-capture"
        @click.stop="closeDialog()"
      ></div>
      <div
        v-else-if="content.preventInteractionsOutside && !content.overlay"
        class="pointer-capture"
        @click.stop="null"
      ></div>

      <div
        ref="overlayElement"
        v-if="content.overlay"
        @click="handleOverlayClick()"
      >
        <slot name="overlay" />
      </div>
    </div>

    <Transition :name="transitionName" mode="out-in">
      <div
        role="dialog"
        v-if="isOpen"
        :style="{ ...contentStyle }"
        class="ww-dialog"
      >
        <slot name="content" />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDialogStyle } from "./composables/useDialogStyle";

const props = defineProps({
  content: { type: Object, required: true },
});

const { getModalStyle, getSheetStyle, getTransitionName } = useDialogStyle();

const animationDuration = computed(() => {
  return props.content.animationDuration + "ms";
});

const transitionName = computed(() => {
  return getTransitionName(
    props.content.animation,
    props.content.slideInDirection
  );
});

const isOpen = defineModel({ type: Boolean, default: false });

const setDialogState = (newValue) => {
  isOpen.value = newValue;
};

function toggleDialog() {
  setDialogState(!isOpen.value);
}

function openDialog() {
  setDialogState(true);
}

function closeDialog() {
  setDialogState(false);
}

const contentStyle = computed(() => {
  let style = {};
  switch (props.content.type) {
    case "modal":
      style = getModalStyle(
        props.content.side,
        props.content.align,
        props.content.customPositionX,
        props.content.customPositionY
      );
      break;
    case "sheet":
      style = getSheetStyle(props.content.side);
      break;
  }
  return style;
});

function handleOverlayClick() {
  if (props.content.overlayClickCloses) {
    closeDialog();
  }
}

function handleOutsideClick() {
  if (props.content.clickOutsideCloses) {
    closeDialog();
  }
}

function onTriggerClick() {
  console.log("tests");
  if (!props.content.triggerClickOpens) {
    return;
  }

  toggleDialog();
}

defineExpose({
  toggleDialog,
  openDialog,
  closeDialog,
  contentStyle,
  isOpen,
  transitionName,
  animationDuration,
  handleOverlayClick,
  onTriggerClick,
  handleOutsideClick,
});
</script>

<style lang="scss">
.ww-dialog {
  --translate-x: 0px;
  --translate-y: 0px;
  --translate-x-offset: 0px;
  --translate-y-offset: 0px;
  --scale: 1;
  --calc-translate-x: calc(var(--translate-x) + var(--translate-x-offset));
  --calc-translate-y: calc(var(--translate-y) + var(--translate-y-offset));
  transition: transform var(--transition-duration) var(--transition-easing),
    opacity var(--transition-duration) var(--transition-easing) !important;
  transform: translateX(var(--calc-translate-x))
    translateY(var(--calc-translate-y)) scaleX(var(--scale))
    scaleY(var(--scale)) !important;
}

/* Fade */
.fade-transition-enter-active,
.fade-transition-leave-active {
  transition: opacity var(--transition-duration) var(--transition-easing) !important;
}

.fade-transition-enter-from,
.fade-transition-leave-to {
  opacity: 0;
}

/* Slide Left */
.slide-in-left-transition-enter-from .ww-dialog {
  --translate-x-offset: -50%;
  opacity: 0;
}
.slide-in-left-transition-enter-to .ww-dialog {
  --translate-x-offset: 0;
  opacity: 1;
}
.slide-in-left-transition-leave-from .ww-dialog {
  --translate-x-offset: 0;
  opacity: 1;
}
.slide-in-left-transition-leave-to .ww-dialog {
  --translate-x-offset: -50%;
  opacity: 0;
}

/* Slide Right */
.slide-in-right-transition-enter-from .ww-dialog {
  --translate-x-offset: 50%;
  opacity: 0;
}
.slide-in-right-enter-to .ww-dialog {
  --translate-x-offset: 0;
  opacity: 1;
}
.slide-in-right-transition-leave-from .ww-dialog {
  --translate-x-offset: 0;
  opacity: 1;
}
.slide-in-right-transition-leave-to .ww-dialog {
  --translate-x-offset: 50%;
  opacity: 0;
}

/* Slide Top */
.slide-in-top-transition-enter-from .ww-dialog {
  --translate-y-offset: -50%;
  opacity: 0;
}
.slide-in-top-enter-to .ww-dialog {
  --translate-y-offset: 0;
  opacity: 1;
}
.slide-in-top-transition-leave-from .ww-dialog {
  --translate-y-offset: 0;
  opacity: 1;
}
.slide-in-top-transition-leave-to .ww-dialog {
  --translate-y-offset: -50%;
  opacity: 0;
}

/* Slide-in bottom Animation */
.slide-in-bottom-transition-enter-from .ww-dialog {
  --translate-y-offset: 50%;
  opacity: 0;
}
.slide-in-bottom-enter-to .ww-dialog {
  --translate-y-offset: 0;
  opacity: 1;
}
.slide-in-bottom-transition-leave-from .ww-dialog {
  --translate-y-offset: 0;
  opacity: 1;
}
.slide-in-bottom-transition-leave-to .ww-dialog {
  --translate-y-offset: 50%;
  opacity: 0;
}

/* Zoom Animation */
.zoom-transition-enter-from .ww-dialog,
.zoom-transition-leave-to .ww-dialog {
  --scale: 0;
  opacity: 0;
}
.zoom-transition-enter-to .ww-dialog,
.zoom-transition-leave-from .ww-dialog {
  --scale: 1;
  opacity: 1;
}

.pointer-capture {
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  pointer-events: auto;
}
</style>
