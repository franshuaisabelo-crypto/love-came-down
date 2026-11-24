<script setup>
import { computed } from 'vue'
import { Check } from 'lucide-vue-next'

const props = defineProps({
  tier: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select'])

const formattedPrice = computed(() => {
  return typeof props.tier?.price === 'number'
    ? props.tier.price.toLocaleString()
    : (props.tier?.price ?? '')
})

function handleSelect() {
  emit('select', props.tier)
}
</script>

<template>
  <div
    class="tier-card"
    :class="{ 'is-highlighted': tier.highlighted }"
  >
    <!-- "Best value" — small uppercase gold text, no pill -->
    <p v-if="tier.badge" class="tier-badge">{{ tier.badge }}</p>
    <p v-else class="tier-badge-spacer" aria-hidden="true" />

    <h3 class="tier-name">{{ tier.name }}</h3>

    <div class="tier-price tabular-nums">
      <span class="currency">{{ tier.currency }}</span>{{ formattedPrice }}
    </div>

    <ul class="features-list">
      <li
        v-for="(feature, index) in tier.features"
        :key="index"
        class="feature-item"
      >
        <Check :size="20" :stroke-width="1.5" class="feature-icon" aria-hidden="true" />
        <span class="feature-text">{{ feature }}</span>
      </li>
    </ul>

    <!--
      Button hierarchy:
      Premium  → solid gold fill, midnight text (primary)
      Standard → 1px gold outline, champagne text (secondary)
    -->
    <button
      type="button"
      class="register-btn"
      :class="tier.highlighted ? 'btn-primary' : 'btn-secondary'"
      :aria-label="`Register for ${tier.name}`"
      @click="handleSelect"
    >
      Register for {{ tier.name }}
    </button>
  </div>
</template>

<style scoped>
/* ---- Card shell ---- */
.tier-card {
  display: flex;
  flex-direction: column;
  background-color: var(--midnight-black);
  border: 1px solid rgba(198, 161, 91, 0.40);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  height: 100%;
}

/* Premium: 2px solid full-strength gold border */
.tier-card.is-highlighted {
  border: 2px solid var(--antique-gold);
}

/* Badge: small uppercase gold text */
.tier-badge {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  color: var(--antique-gold);
  letter-radius: 0.06em;
  text-transform: uppercase;
  margin-bottom: var(--space-3);
  line-height: 1;
}

/* Invisible spacer keeps card tops aligned when no badge */
.tier-badge-spacer {
  height: calc(var(--text-xs) * 1);
  margin-bottom: var(--space-3);
}

.tier-name {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--weight-semibold);
  color: var(--champagne);
  line-height: var(--leading-tight);
}

.tier-price {
  font-family: var(--font-display);
  font-size: var(--text-5xl);
  font-weight: var(--weight-semibold);
  color: var(--champagne);
  margin: var(--space-4) 0;
  line-height: var(--leading-tight);
}

.currency {
  font-size: var(--text-2xl);
  vertical-align: super;
  line-height: 1;
  margin-right: 2px;
}

/* ---- Feature list ---- */
.features-list {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-bottom: var(--space-8);
  gap: 12px;             /* 12px between items */
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  font-size: 1.125rem;   /* 18px — senior-friendly */
  color: var(--champagne);  /* full champagne, no opacity */
  line-height: 1.6;
}

.feature-icon {
  flex-shrink: 0;
  color: var(--antique-gold);
  margin-top: 2px;
  width: 20px;
  height: 20px;
}

.feature-text {
  flex: 1;
}

/* ---- Button base ---- */
.register-btn {
  width: 100%;
  margin-top: auto;
  min-height: 48px;      /* senior-friendly tap target */
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-weight: var(--weight-semibold);
  font-size: 1rem;       /* 16px minimum */
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity var(--duration-fast) var(--ease-out),
              transform var(--duration-fast) var(--ease-out);
}

/* Primary — Premium tier: solid gold */
.btn-primary {
  background-color: var(--antique-gold);
  color: var(--midnight-black);
  border: none;
}

.btn-primary:hover {
  opacity: 0.88;
  transform: translateY(-1px);
}

/* Secondary — Standard tier: 1px gold outline */
.btn-secondary {
  background-color: transparent;
  color: var(--champagne);
  border: 1px solid rgba(198, 161, 91, 0.70);
}

.btn-secondary:hover {
  border-color: var(--antique-gold);
  color: var(--antique-gold);
}

.register-btn:active {
  transform: scale(0.97) translateY(0);
}

.register-btn:focus-visible {
  outline: 3px solid var(--champagne);
  outline-offset: 2px;
}
</style>
