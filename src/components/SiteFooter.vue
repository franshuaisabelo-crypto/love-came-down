<script setup>
import { ref } from 'vue'
import { footer, siteInfo, jotform } from '@/data/content.js'
import RegistrationModal from './RegistrationModal.vue'
import logo from '@/assets/zbc-logo.png'
import { MapPin } from 'lucide-vue-next'

const showDonationForm = ref(false)

function handleGive() {
  showDonationForm.value = true
}
</script>

<template>
  <footer :id="footer.sectionId" class="site-footer">
    <div class="footer-container">
      <div class="footer-grid">

        <!-- Col 1: Church info -->
        <div class="footer-col">
          <img
            :src="logo"
            :alt="siteInfo.churchName"
            class="church-logo"
            height="60"
          />
          <h3 class="col-heading">{{ siteInfo.churchName }}</h3>
          <p class="church-address">{{ footer.address }}</p>
          <a
            :href="footer.directionsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="map-link"
          >
            <MapPin :size="18" :stroke-width="1.75" aria-hidden="true" />
            <span>Get directions</span>
          </a>
        </div>

        <!-- Col 2: Service Schedule -->
        <div class="footer-col">
          <h3 class="col-heading">Service Schedule</h3>
          <div class="schedule-items">
            <div
              v-for="item in footer.schedule"
              :key="item.label"
              class="schedule-item"
            >
              <span class="schedule-label">{{ item.label }}</span>
              <span class="schedule-time tabular-nums">{{ item.time }}</span>
            </div>
          </div>
        </div>

        <!-- Col 3: Get in Touch -->
        <div class="footer-col">
          <h3 class="col-heading">Get in Touch</h3>
          <a
            :href="footer.facebookUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="fb-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            <span>Visit our Facebook page</span>
          </a>
        </div>

        <!-- Col 4: Give to the Building Fund -->
        <div class="footer-col">
          <h3 class="col-heading">{{ footer.giveHeading }}</h3>
          <p class="give-text">{{ footer.giveDescription }}</p>
          <button
            type="button"
            class="give-btn"
            @click="handleGive"
          >
            Give
          </button>
        </div>

      </div>

      <!-- Copyright -->
      <div class="copyright-row">
        <p class="copyright-text">{{ footer.copyright }}</p>
      </div>
    </div>

    <!-- Donation form modal -->
    <RegistrationModal
      v-model="showDonationForm"
      :form-url="jotform.donationUrl"
      modal-title="Give to the Building Fund"
    />
  </footer>
</template>

<style scoped>
/* ================================================================
   Footer
   ================================================================ */
.site-footer {
  width: 100%;
  background-color: var(--midnight-black);
  border-top: 1px solid rgba(198, 161, 91, 0.25);
  padding: 64px 0;
}

.footer-container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-8);
  align-items: flex-start;
}

.footer-col {
  display: flex;
  flex-direction: column;
}

/* ---- Column headings ---- */
.col-heading {
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: var(--weight-semibold);
  color: var(--champagne);
  margin-bottom: var(--space-4);
}

/* ---- Col 1 ---- */
.church-logo {
  height: 60px;
  width: auto;
  margin-bottom: var(--space-4);
  display: block;
  align-self: flex-start;
}

.church-address {
  font-family: var(--font-body);
  font-size: 1.125rem;
  color: var(--champagne);
  line-height: 1.6;
  margin-bottom: var(--space-3);
}

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

/* ---- Col 2 ---- */
.schedule-items {
  display: flex;
  flex-direction: column;
}

.schedule-item {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-3);
}

.schedule-item:last-child { margin-bottom: 0; }

.schedule-label {
  font-family: var(--font-body);
  font-size: 1.125rem;
  font-weight: var(--weight-medium);
  color: var(--champagne);
}

.schedule-time {
  font-family: var(--font-body);
  font-size: 1.125rem;
  color: var(--champagne);
}

/* ---- Col 3 ---- */
.fb-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 20px;
  background-color: transparent;
  color: var(--champagne);
  border: 1px solid rgba(198, 161, 91, 0.55);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: var(--weight-medium);
  text-decoration: none;
  cursor: pointer;
  align-self: flex-start;
  transition: border-color var(--duration-fast) var(--ease-out),
              color var(--duration-fast) var(--ease-out);
}

.fb-btn:hover {
  border-color: var(--antique-gold);
  color: var(--antique-gold);
}

.fb-btn:focus-visible {
  outline: 3px solid var(--champagne);
  outline-offset: 2px;
}

/* ---- Col 4 ---- */
.give-text {
  font-family: var(--font-body);
  font-size: 1.125rem;
  color: var(--champagne);
  line-height: 1.6;
  margin-bottom: var(--space-4);
}

.give-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  min-height: 48px;
  padding: 0 24px;
  background: transparent;
  color: var(--champagne);
  border: 1px solid rgba(198, 161, 91, 0.55);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-weight: var(--weight-medium);
  font-size: 1.125rem;
  cursor: pointer;
  transition: border-color var(--duration-fast) var(--ease-out),
              color var(--duration-fast) var(--ease-out),
              transform var(--duration-fast) var(--ease-out);
}

.give-btn:hover {
  border-color: var(--antique-gold);
  color: var(--antique-gold);
}

.give-btn:active { transform: scale(0.97); }
.give-btn:focus-visible {
  outline: 3px solid var(--champagne);
  outline-offset: 2px;
}

/* ---- Copyright ---- */
.copyright-row {
  text-align: center;
  padding-top: var(--space-8);
  margin-top: var(--space-8);
  border-top: 1px solid rgba(198, 161, 91, 0.30);
}

.copyright-text {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--champagne);
}

/* ================================================================
   Responsive
   ================================================================ */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-8);
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: var(--space-12);
  }
}
</style>
