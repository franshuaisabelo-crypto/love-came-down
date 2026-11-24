<script setup>
import { registration } from '@/data/content.js'
import TierCard from './TierCard.vue'
import RegistrationModal from './RegistrationModal.vue'
import { ref } from 'vue'
import { Calendar, Clock, MapPin } from 'lucide-vue-next'

const showRegistration = ref(false)
const selectedTier = ref(null)

function handleSelectTier(tier) {
  selectedTier.value = tier
  showRegistration.value = true
}
</script>

<template>
  <section :id="registration.sectionId" class="registration-section">
    <div class="registration-container">

      <!-- Heading: two lines, "Join" / "Love Came Down" -->
      <h2 class="registration-heading reveal">
        <span class="heading-line">Join</span>
        <span class="heading-line">Love Came Down</span>
      </h2>

      <!-- Supporting line -->
      <p class="registration-subheading reveal">
        {{ registration.subheading }}
      </p>

      <!-- Event details panel -->
      <div id="event-details" class="event-panel-wrap reveal">
        <div class="event-panel">

          <!-- Event title -->
          <p class="event-title">{{ registration.eventTitle }}</p>

          <!-- Gold rule -->
          <div class="event-rule" aria-hidden="true" />

          <!-- Icon rows -->
          <ul class="event-rows" role="list">

            <li class="event-row">
              <span class="row-icon-col">
                <Calendar :size="28" :stroke-width="1.75" aria-hidden="true" />
              </span>
              <span class="row-text-col">
                <span class="row-label">Date</span>
                <span class="row-value tabular-nums">{{ registration.eventDate }}</span>
              </span>
            </li>

            <li class="event-row">
              <span class="row-icon-col">
                <Clock :size="28" :stroke-width="1.75" aria-hidden="true" />
              </span>
              <span class="row-text-col">
                <span class="row-label">Time</span>
                <span class="row-value tabular-nums">{{ registration.eventTime }}</span>
              </span>
            </li>

            <li class="event-row">
              <span class="row-icon-col">
                <MapPin :size="28" :stroke-width="1.75" aria-hidden="true" />
              </span>
              <span class="row-text-col">
                <span class="row-label">Venue</span>
                <span class="row-value venue-name">{{ registration.eventVenueName }}</span>
                <span class="row-value venue-address">{{ registration.eventVenueAddress }}</span>
              </span>
            </li>

          </ul>

          <!-- View on map link -->
          <a
            :href="registration.mapUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="map-link"
          >
            <MapPin :size="18" :stroke-width="1.75" aria-hidden="true" />
            <span>View on map</span>
          </a>
        </div>
      </div>

      <!-- Tier cards -->
      <div class="tier-grid reveal">
        <TierCard
          v-for="tier in registration.tiers"
          :key="tier.id"
          :tier="tier"
          @select="handleSelectTier"
        />
      </div>

    </div>

    <RegistrationModal
      v-model="showRegistration"
      :tier-name="selectedTier?.name"
      :tier-id="selectedTier?.id"
      :amount="selectedTier?.price"
      :currency="selectedTier?.currency"
    />
  </section>
</template>

<style scoped>
/* ================================================================
   Section 3: Registration
   ================================================================ */
.registration-section {
  padding: var(--space-24) 0;
  background-color: var(--deep-blue);
  position: relative;
  z-index: 1;
}

.registration-container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  text-align: center;
}

/* ---- Heading: two lines ---- */
.registration-heading {
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: var(--weight-semibold);
  color: var(--champagne);
  margin-bottom: var(--space-3);
  line-height: 1.1;
}

.heading-line {
  display: block;
}

/* ---- Supporting line ---- */
.registration-subheading {
  font-family: var(--font-body);
  font-size: 1.25rem;
  font-weight: var(--weight-medium);
  color: var(--champagne);
  margin-bottom: var(--space-8);
  line-height: 1.6;
}

/* ================================================================
   Event details panel
   ================================================================ */
.event-panel-wrap {
  margin: 0 auto 40px;
  max-width: 760px;
}

.event-panel {
  background-color: rgba(8, 13, 24, 0.90);
  border: 1px solid rgba(198, 161, 91, 0.60);
  border-radius: 16px;
  padding: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.event-title {
  font-family: var(--font-display);
  font-style: normal;
  font-size: clamp(1.5rem, 2vw, 2.25rem);
  font-weight: var(--weight-semibold);
  line-height: var(--leading-tight);
  color: var(--champagne);
  text-wrap: balance;
  text-align: center;
  margin-bottom: var(--space-4);
}

.event-rule {
  width: 64px;
  height: 2px;
  background-color: var(--antique-gold);
  margin-bottom: var(--space-6);
  flex-shrink: 0;
}

/* ---- Icon rows ---- */
.event-rows {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
  margin-bottom: 24px;
}

.event-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
}

.row-icon-col {
  width: 28px;
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  color: var(--antique-gold);
  padding-top: 2px;
}

.row-text-col {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
  flex: 1;
}

.row-label {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: var(--weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--starlight-blue);
  line-height: 1;
}

.row-value {
  font-family: var(--font-body);
  font-size: 1.25rem;
  font-weight: var(--weight-medium);
  color: var(--champagne);
  line-height: 1.6;
}

/* Venue: name (600) + address (400), no extra gap */
.venue-name {
  font-weight: var(--weight-semibold);
}

.venue-address {
  font-weight: var(--weight-regular);
  gap: 0;
}

/* View on map link */
.map-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-body);
  font-size: 1.125rem;
  color: var(--champagne);
  text-decoration: underline;
  text-underline-offset: 3px;
  min-height: 48px;
  transition: color var(--duration-fast) var(--ease-out);
}

.map-link:hover { color: var(--antique-gold); }
.map-link:focus-visible {
  outline: 3px solid var(--champagne);
  outline-offset: 2px;
}

/* ================================================================
   Tier grid
   ================================================================ */
.tier-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-8);
  max-width: 860px;
  margin: 0 auto;
  align-items: stretch;
}

/* ================================================================
   Mobile
   ================================================================ */
@media (max-width: 768px) {
  .registration-section {
    padding: var(--space-16) 0;
  }

  .registration-heading {
    font-size: clamp(1.875rem, 6vw, 2.5rem);
  }

  .registration-subheading {
    font-size: 1.125rem;
  }

  .event-panel-wrap {
    margin-bottom: 32px;
  }

  .event-panel {
    padding: 24px;
  }

  .event-title {
    font-size: clamp(1.25rem, 4vw, 1.75rem);
  }

  .row-value {
    font-size: 1.125rem;
  }

  .tier-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
}
</style>
