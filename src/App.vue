<script setup>
import { useScrollReveal } from '@/composables/useScrollReveal'

import NavBar from '@/components/NavBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import BuildingFundSection from '@/components/BuildingFundSection.vue'
import RegistrationSection from '@/components/RegistrationSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'

useScrollReveal()
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <BuildingFundSection />
    <RegistrationSection />
  </main>
  <SiteFooter />
</template>

<style scoped>
main {
  overflow-x: hidden;
}
</style>
