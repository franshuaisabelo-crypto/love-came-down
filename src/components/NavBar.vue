<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import { nav, siteInfo } from '@/data/content.js'
import logo from '@/assets/zbc-logo.png'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' && isMenuOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <header class="navbar">
    <div class="nav-container">
      <!-- Left: Logo -->
      <div class="nav-brand-wrapper">
        <a href="#" class="nav-brand" :aria-label="siteInfo.churchName">
          <img :src="logo" :alt="siteInfo.churchName" class="nav-logo" />
        </a>
      </div>

      <!-- Center: Nav links (Desktop) -->
      <nav class="nav-links desktop-only" aria-label="Main Navigation">
        <a
          v-for="link in nav.links"
          :key="link.href"
          :href="link.href"
          class="nav-link"
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- Right: CTA Button (Desktop) -->
      <div class="nav-actions desktop-only">
        <a :href="nav.cta.href" class="cta-button">
          {{ nav.cta.label }}
        </a>
      </div>

      <!-- Mobile Hamburger Button -->
      <button
        type="button"
        class="menu-toggle mobile-only"
        :aria-expanded="isMenuOpen"
        :aria-label="isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
        aria-controls="mobile-nav-panel"
        @click="toggleMenu"
      >
        <component :is="isMenuOpen ? X : Menu" :size="24" :stroke-width="1.5" class="toggle-icon" />
      </button>
    </div>

    <!-- Mobile Dropdown Panel -->
    <Transition name="slide-down">
      <div
        v-if="isMenuOpen"
        id="mobile-nav-panel"
        class="mobile-panel mobile-only"
      >
        <nav class="mobile-links" aria-label="Mobile Navigation">
          <a
            v-for="link in nav.links"
            :key="link.href"
            :href="link.href"
            class="mobile-link"
            @click="closeMenu"
          >
            {{ link.label }}
          </a>
        </nav>
        <div class="mobile-actions">
          <a
            :href="nav.cta.href"
            class="cta-button mobile-cta-button"
            @click="closeMenu"
          >
            {{ nav.cta.label }}
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--nav-height);
  background-color: var(--midnight-black);
  border-bottom: 1px solid rgba(198, 161, 91, 0.30);
  z-index: 100;
}

.nav-container {
  max-width: var(--container-max);
  height: 100%;
  margin: 0 auto;
  padding: 0 var(--container-padding);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.nav-brand-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.nav-brand {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.nav-logo {
  height: 48px;
  width: auto;
  display: block;
}

.nav-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-8);
}

.nav-link {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--champagne);
  text-decoration: none;
  line-height: var(--leading-normal);
  transition: color var(--duration-fast) var(--ease-out);
  padding: var(--space-2) 0;
  opacity: 0.85;
}

.nav-link:hover {
  color: var(--antique-gold);
  opacity: 1;
}

.nav-actions {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

/* Primary gold button */
.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--antique-gold);
  color: var(--midnight-black);
  font-family: var(--font-body);
  font-weight: var(--weight-semibold);
  font-size: var(--text-sm);
  padding: var(--space-2) var(--space-6);
  border-radius: var(--radius-md);
  text-decoration: none;
  border: none;
  cursor: pointer;
  line-height: var(--leading-normal);
  transition: opacity var(--duration-fast) var(--ease-out),
              transform var(--duration-fast) var(--ease-out);
}

.cta-button:hover {
  opacity: 0.88;
  transform: translateY(-1px);
}

.cta-button:active {
  transform: scale(0.97) translateY(0);
}

.cta-button:focus-visible,
.nav-link:focus-visible,
.nav-brand:focus-visible,
.mobile-link:focus-visible,
.menu-toggle:focus-visible {
  outline: 2px solid var(--champagne);
  outline-offset: 2px;
}

.desktop-only {
  display: flex;
}

.mobile-only {
  display: none;
}

.menu-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  padding: var(--space-2);
  color: var(--champagne);
  background: none;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  line-height: 1;
}

.toggle-icon {
  display: block;
}

@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: flex;
  }

  .nav-brand-wrapper {
    flex: initial;
  }

  .mobile-panel {
    position: absolute;
    top: var(--nav-height);
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    background-color: var(--midnight-black);
    border-bottom: 1px solid rgba(198, 161, 91, 0.30);
    padding: var(--space-4) var(--container-padding) var(--space-6);
    gap: var(--space-4);
  }

  .mobile-links {
    display: flex;
    flex-direction: column;
  }

  .mobile-link {
    font-family: var(--font-body);
    font-size: var(--text-base);
    font-weight: var(--weight-medium);
    color: var(--champagne);
    text-decoration: none;
    padding: var(--space-3) 0;
    border-bottom: 1px solid rgba(198, 161, 91, 0.20);
    opacity: 0.85;
    transition: color var(--duration-fast) var(--ease-out);
  }

  .mobile-link:last-child {
    border-bottom: none;
  }

  .mobile-link:hover {
    color: var(--antique-gold);
    opacity: 1;
  }

  .mobile-actions {
    display: flex;
    padding-top: var(--space-2);
  }

  .mobile-cta-button {
    width: 100%;
    padding: var(--space-3) var(--space-6);
    font-size: var(--text-base);
  }
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: transform var(--duration-normal) var(--ease-out),
              opacity var(--duration-normal) var(--ease-out);
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}
</style>
