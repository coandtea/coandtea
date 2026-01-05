<template>
  <Transition name="success-animation">
    <div v-if="show" class="fixed inset-0 z-[100] flex items-center justify-center">
      <!-- Semi-transparent backdrop -->
      <div class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      <!-- Confetti particles -->
      <div class="confetti-container">
        <div v-for="i in 50" :key="i" class="confetti" :style="getConfettiStyle(i)"></div>
      </div>

      <!-- Success checkmark - Improved version -->
      <div class="success-wrapper">
        <!-- Animated ring -->
        <div class="success-ring"></div>

        <!-- Main circle -->
        <div class="success-circle">
          <!-- Checkmark SVG -->
          <svg class="checkmark-svg" viewBox="0 0 52 52">
            <circle class="checkmark-circle" cx="26" cy="26" r="23" fill="none" />
            <path class="checkmark-check" fill="none" d="M14 27l8 8 16-16" />
          </svg>
        </div>

        <!-- Success text -->
        <div class="success-text">
          <p class="text-white text-xl font-bold mt-6 animate-fade-in-up">Pesanan Berhasil! 🎉</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { watch } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 2500,
  },
});

const emit = defineEmits(['complete']);

// Watch show prop to emit complete after duration
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      setTimeout(() => {
        emit('complete');
      }, props.duration);
    }
  }
);

// Generate random confetti styles
function getConfettiStyle(index) {
  const colors = ['#22c55e', '#16a34a', '#86efac', '#fbbf24', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'];
  const randomColor = colors[index % colors.length];
  const randomLeft = Math.random() * 100;
  const randomDelay = Math.random() * 0.5;
  const randomDuration = 1.5 + Math.random() * 1;
  const randomRotate = Math.random() * 360;
  const randomSize = 8 + Math.random() * 8;

  return {
    '--confetti-color': randomColor,
    '--random-left': `${randomLeft}%`,
    '--random-delay': `${randomDelay}s`,
    '--random-duration': `${randomDuration}s`,
    '--random-rotate': `${randomRotate}deg`,
    '--random-size': `${randomSize}px`,
  };
}
</script>

<style scoped>
/* Confetti Container */
.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 100;
  pointer-events: none;
}

.confetti {
  position: absolute;
  top: -20px;
  left: var(--random-left);
  width: var(--random-size);
  height: var(--random-size);
  background: var(--confetti-color);
  animation: confetti-fall var(--random-duration) ease-out var(--random-delay) forwards;
  transform: rotate(var(--random-rotate));
}

.confetti:nth-child(odd) {
  border-radius: 50%;
}

.confetti:nth-child(3n) {
  width: calc(var(--random-size) * 0.5);
  height: calc(var(--random-size) * 1.5);
}

.confetti:nth-child(5n) {
  width: calc(var(--random-size) * 0.3);
  height: calc(var(--random-size) * 1.2);
  border-radius: 2px;
}

@keyframes confetti-fall {
  0% {
    top: -20px;
    opacity: 1;
    transform: rotate(0deg) translateX(0);
  }
  100% {
    top: 100vh;
    opacity: 0;
    transform: rotate(720deg) translateX(calc((var(--random-left) - 50%) * 0.5));
  }
}

/* Success Wrapper */
.success-wrapper {
  position: relative;
  z-index: 101;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Animated ring that pulses outward */
.success-ring {
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid rgba(34, 197, 94, 0.5);
  animation: ring-pulse 1s ease-out forwards;
}

@keyframes ring-pulse {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* Main success circle */
.success-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 40px rgba(34, 197, 94, 0.5), 0 0 0 8px rgba(34, 197, 94, 0.15), inset 0 -4px 12px rgba(0, 0, 0, 0.1);
  animation: circle-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes circle-pop {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Checkmark SVG */
.checkmark-svg {
  width: 60px;
  height: 60px;
}

.checkmark-circle {
  stroke: rgba(255, 255, 255, 0.3);
  stroke-width: 2;
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  animation: stroke-circle 0.6s cubic-bezier(0.65, 0, 0.45, 1) 0.2s forwards;
}

.checkmark-check {
  stroke: white;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke-check 0.4s cubic-bezier(0.65, 0, 0.45, 1) 0.5s forwards;
}

@keyframes stroke-circle {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes stroke-check {
  100% {
    stroke-dashoffset: 0;
  }
}

/* Success text animation */
.success-text {
  text-align: center;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out 0.6s both;
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Transition */
.success-animation-enter-active {
  animation: zoom-in 0.3s ease-out;
}

.success-animation-leave-active {
  animation: fade-out 0.5s ease-out;
}

@keyframes zoom-in {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
