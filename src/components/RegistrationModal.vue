<script setup>
import { ref, computed, watch, toRef } from 'vue'
import { X } from 'lucide-vue-next'
import { useModal } from '@/composables/useModal.js'
import { jotform } from '@/data/content.js'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  tierName: { type: String, default: '' },
  tierId: { type: String, default: '' },
  amount: { type: Number, default: null },
  currency: { type: String, default: '\u20b1' },
  formUrl: { type: String, default: '' },
  modalTitle: { type: String, default: 'Register for Love Came Down' },
})

const emit = defineEmits(['update:modelValue'])
const isOpen = toRef(props, 'modelValue')

function close() {
  emit('update:modelValue', false)
}

/* No outside-click close per spec */
useModal(isOpen, close, { closeOnOutsideClick: false })

/* Which form URL to use */
const baseUrl = computed(() => props.formUrl || jotform.url)

/* Iframe URL with tier pre-selected (only for registration) */
const iframeSrc = computed(() => {
  if (props.tierId && jotform.tierValues[props.tierId]) {
    const tierValue = jotform.tierValues[props.tierId]
    return `${baseUrl.value}?${jotform.tierField}=${encodeURIComponent(tierValue)}`
  }
  return baseUrl.value
})

/* Formatted tier display */
const tierDisplay = computed(() => {
  if (!props.tierName || !props.amount) return ''
  return `${props.tierName}, ${props.currency}${props.amount.toLocaleString()}`
})

/* Loading state */
const isLoading = ref(true)
const showFallbackProminent = ref(false)
let loadTimeout = null

function onIframeLoad() {
  isLoading.value = false
  showFallbackProminent.value = false
  if (loadTimeout) clearTimeout(loadTimeout)
}

/* Reset iframe + loading state each time modal opens */
const iframeKey = ref(0)
watch(isOpen, (open) => {
  if (open) {
    iframeKey.value++
    isLoading.value = true
    showFallbackProminent.value = false
    loadTimeout = setTimeout(() => {
      if (isLoading.value) showFallbackProminent.value = true
    }, 10000)
  } else {
    if (loadTimeout) clearTimeout(loadTimeout)
  }
})

/* Tier note text (only shown for registration) */
const tierNote = computed(() => {
  if (!props.tierId || !jotform.tierValues[props.tierId]) return ''
  const tierValue = jotform.tierValues[props.tierId]
  return `In the form, please choose ${tierValue} under Type of Donation.`
})
</script>

<template>
  <Teleport to="body">
    <Transition name="reg-modal">
      <div
        v-if="modelValue"
        class="reg-backdrop"
        role="presentation"
      >
        <div
          class="reg-panel"
          data-modal
          role="dialog"
          aria-modal="true"
          aria-labelledby="reg-modal-title"
        >
          <!-- Sticky header -->
          <div class="reg-header">
            <div class="reg-header-text">
              <h2 id="reg-modal-title" class="reg-title">{{ modalTitle }}</h2>
              <p v-if="tierDisplay" class="reg-tier">{{ tierDisplay }}</p>
            </div>
            <button
              type="button"
              class="reg-close-btn"
              aria-label="Close registration form"
              @click="close"
            >
              <X :size="20" :stroke-width="1.75" aria-hidden="true" />
              <span>Close</span>
            </button>
          </div>

          <!-- Tier note -->
          <p v-if="tierNote" class="reg-note">{{ tierNote }}</p>

          <!-- Iframe body -->
          <div class="reg-body">
            <!-- Loading spinner -->
            <div v-if="isLoading" class="reg-loading">
              <div class="reg-spinner" aria-hidden="true" />
              <p class="reg-loading-text">Loading the form...</p>
            </div>

            <iframe
              :key="iframeKey"
              :src="iframeSrc"
              title="Love Came Down Registration Form"
              class="reg-iframe"
              frameborder="0"
              allow="payment"
              @load="onIframeLoad"
            />
          </div>

          <!-- Fallback link -->
          <div class="reg-fallback" :class="{ 'is-prominent': showFallbackProminent }">
            <a
              :href="baseUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="reg-fallback-link"
            >
              Having trouble? Open the form in a new tab
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.reg-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(8, 13, 24, 0.80);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
}

.reg-panel {
  background-color: var(--midnight-black);
  border: 1px solid rgba(198, 161, 91, 0.60);
  border-radius: 16px;
  max-width: 760px;
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ---- Sticky header ---- */
.reg-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  padding: 24px 24px 16px;
  border-bottom: 1px solid rgba(198, 161, 91, 0.25);
  flex-shrink: 0;
}

.reg-header-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.reg-title {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: var(--weight-semibold);
  color: var(--champagne);
  line-height: 1.2;
}

.reg-tier {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--antique-gold);
  font-weight: var(--weight-medium);
}

.reg-close-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 48px;
  padding: 0 16px;
  background-color: transparent;
  color: var(--champagne);
  border: 1px solid rgba(198, 161, 91, 0.55);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: var(--weight-medium);
  cursor: pointer;
  flex-shrink: 0;
  transition: border-color var(--duration-fast) var(--ease-out);
}

.reg-close-btn:hover { border-color: var(--antique-gold); }
.reg-close-btn:focus-visible {
  outline: 3px solid var(--champagne);
  outline-offset: 2px;
}

/* ---- Tier note ---- */
.reg-note {
  padding: 12px 24px;
  font-family: var(--font-body);
  font-size: 1.125rem;
  color: var(--champagne);
  line-height: 1.5;
  border-bottom: 1px solid rgba(198, 161, 91, 0.15);
  flex-shrink: 0;
}

/* ---- Iframe body ---- */
.reg-body {
  flex: 1;
  position: relative;
  min-height: 0;
}

.reg-iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  background-color: #fff;
}

/* ---- Loading overlay ---- */
.reg-loading {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background-color: var(--midnight-black);
  z-index: 2;
}

.reg-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid rgba(198, 161, 91, 0.25);
  border-top-color: var(--antique-gold);
  border-radius: 50%;
  animation: reg-spin 0.8s linear infinite;
}

@keyframes reg-spin {
  to { transform: rotate(360deg); }
}

.reg-loading-text {
  font-family: var(--font-body);
  font-size: 1.125rem;
  color: var(--champagne);
}

/* ---- Fallback link ---- */
.reg-fallback {
  padding: 12px 24px;
  border-top: 1px solid rgba(198, 161, 91, 0.15);
  text-align: center;
  flex-shrink: 0;
}

.reg-fallback-link {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--champagne);
  text-decoration: underline;
  text-underline-offset: 3px;
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  transition: color var(--duration-fast) var(--ease-out);
}

.reg-fallback-link:hover { color: var(--antique-gold); }
.reg-fallback-link:focus-visible {
  outline: 3px solid var(--champagne);
  outline-offset: 2px;
}

/* Prominent fallback after 10s timeout */
.reg-fallback.is-prominent {
  background-color: rgba(198, 161, 91, 0.08);
  border-top-color: rgba(198, 161, 91, 0.40);
}

.reg-fallback.is-prominent .reg-fallback-link {
  color: var(--antique-gold);
  font-weight: var(--weight-semibold);
  font-size: 1.125rem;
}

/* ---- Transitions ---- */
.reg-modal-enter-active,
.reg-modal-leave-active {
  transition: opacity var(--duration-normal) var(--ease-out);
}
.reg-modal-enter-from,
.reg-modal-leave-to {
  opacity: 0;
}

.reg-modal-enter-active .reg-panel,
.reg-modal-leave-active .reg-panel {
  transition: transform var(--duration-normal) var(--ease-out),
              opacity var(--duration-normal) var(--ease-out);
}
.reg-modal-enter-from .reg-panel,
.reg-modal-leave-to .reg-panel {
  opacity: 0;
  transform: translateY(16px);
}

/* ---- Mobile: full screen ---- */
@media (max-width: 768px) {
  .reg-backdrop {
    padding: 0;
  }

  .reg-panel {
    max-width: none;
    width: 100%;
    height: 100dvh;
    border-radius: 0;
    border: none;
  }
}
</style>
