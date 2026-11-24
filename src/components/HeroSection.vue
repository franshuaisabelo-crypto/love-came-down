<script setup>
import { hero } from '@/data/content.js'
import heroDesktop from '@/assets/hero-desktop.jpg'
import heroMobile  from '@/assets/hero-mobile.jpg'
import { computed } from 'vue'

const artworkStyle = computed(() => ({
  '--hero-bg-desktop': `url("${heroDesktop}")`,
  '--hero-bg-mobile':  `url("${heroMobile}")`,
}))
</script>

<template>
  <section id="hero" class="hero-section">
    <div class="hero-artwork" :style="artworkStyle">
      <h1 class="sr-only">{{ hero.headline }} — {{ hero.eyebrow }}</h1>
    </div>

    <!-- Caption band: tight padding, one centered button -->
    <div class="hero-caption">
      <a :href="hero.cta.href" class="hero-cta">
        {{ hero.cta.label }}
      </a>
    </div>
  </section>
</template>

<style scoped>
/* ================================================================
   Hero Section
   ================================================================ */
.hero-section {
  display: flex;
  flex-direction: column;
  background-color: var(--midnight-black);
  padding-top: var(--nav-height);
  --hero-curve: clamp(16px, 2.5vw, 40px);
}

/* ---- Artwork ---- */
.hero-artwork {
  width: 100%;
  aspect-ratio: 2560 / 1440;
  background-image: var(--hero-bg-desktop);
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  position: relative;
  border-bottom-left-radius:  50% var(--hero-curve);
  border-bottom-right-radius: 50% var(--hero-curve);
  overflow: hidden;
}

@media (max-width: 768px) {
  .hero-artwork {
    aspect-ratio: 1080 / 1350;
    background-image: var(--hero-bg-mobile);
    background-position: center center;
  }
}

/* ---- Caption band: tight, just the button ---- */
.hero-caption {
  padding: 28px var(--container-padding) 36px;
  display: flex;
  justify-content: center;
}

/* Button: compact outline style with presence */
.hero-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  min-height: 52px;
  padding: 0 36px;
  background-color: transparent;
  color: var(--champagne);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1.125rem;
  border: 2px solid var(--antique-gold);
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color var(--duration-fast) var(--ease-out),
              transform var(--duration-fast) var(--ease-out);
}

.hero-cta:hover {
  background-color: rgba(198, 161, 91, 0.15);
}

.hero-cta:active {
  transform: scale(0.97);
}

.hero-cta:focus-visible {
  outline: 3px solid var(--champagne);
  outline-offset: 3px;
}

/* ---- Mobile ---- */
@media (max-width: 768px) {
  .hero-section {
    --hero-curve: clamp(10px, 2vw, 24px);
  }

  .hero-caption {
    padding: 24px var(--container-padding) 28px;
  }
}
</style>
