<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-vue-next'
import { buildingFund } from '@/data/content.js'

const hasVideo = !!buildingFund.videoSrc

const videoRef = ref(null)
const frameRef = ref(null)
const isMuted = ref(true)
const isPaused = ref(false)
const isFullscreen = ref(false)
const isMobile = ref(false)
const showPlayOverlay = ref(true)

function checkMobile() {
  isMobile.value = window.innerWidth < 1200
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  document.addEventListener('fullscreenchange', onFullscreenChange)
  document.addEventListener('webkitfullscreenchange', onFullscreenChange)

  /* Ensure autoplay on desktop: programmatic play() is more reliable than the HTML attribute */
  if (hasVideo && !isMobile.value) {
    const v = videoRef.value
    if (v) {
      v.muted = true
      v.play().catch(() => { /* browser blocked autoplay, user can click play */ })
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  document.removeEventListener('fullscreenchange', onFullscreenChange)
  document.removeEventListener('webkitfullscreenchange', onFullscreenChange)
})

function togglePause() {
  const v = videoRef.value
  if (!v) return
  if (isPaused.value) { v.play(); isPaused.value = false }
  else { v.pause(); isPaused.value = true }
}

function toggleMute() {
  const v = videoRef.value
  if (!v) return
  isMuted.value = !isMuted.value
  v.muted = isMuted.value
}

function handleMobilePlay() {
  const v = videoRef.value
  if (!v) return
  showPlayOverlay.value = false
  v.play()
  isPaused.value = false
}

function toggleFullscreen() {
  if (isFullscreen.value) exitFullscreen()
  else enterFullscreen()
}

function enterFullscreen() {
  const v = videoRef.value
  const f = frameRef.value
  if (!v || !f) return

  if (v.webkitEnterFullscreen && !f.requestFullscreen) {
    v.webkitEnterFullscreen()
    return
  }

  const request = f.requestFullscreen || f.webkitRequestFullscreen
  if (request) {
    request.call(f)
    v.muted = false
    isMuted.value = false
    v.controls = true
  }
}

function exitFullscreen() {
  const exit = document.exitFullscreen || document.webkitExitFullscreen
  if (exit) exit.call(document)
}

function onFullscreenChange() {
  const fsEl = document.fullscreenElement || document.webkitFullscreenElement
  isFullscreen.value = !!fsEl
  const v = videoRef.value
  if (!v) return

  if (!isFullscreen.value) {
    v.muted = true
    isMuted.value = true
    v.controls = false
    if (window.innerWidth >= 1200) {
      v.play()
      isPaused.value = false
    }
  }
}

const prefersReducedMotion = ref(false)
onMounted(() => {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mq.matches
  mq.addEventListener?.('change', (e) => { prefersReducedMotion.value = e.matches })
})
</script>

<template>
  <section :id="buildingFund.sectionId" class="bf-section">
    <div class="bf-container">
      <div class="bf-grid">

        <!-- LEFT: Video column (flex column so frame fills height) -->
        <div class="bf-video-col">
          <div ref="frameRef" class="bf-frame" :class="{ 'is-placeholder': !hasVideo }">
            <video
              v-if="hasVideo"
              ref="videoRef"
              class="bf-video"
              :src="buildingFund.videoSrc"
              :poster="buildingFund.posterSrc"
              preload="metadata"
              playsinline
              loop
              :autoplay="!isMobile && !prefersReducedMotion"
              :muted="isMuted"
              aria-label="Zion Baptist Church building overview video"
            />

            <button
              v-if="hasVideo && isMobile && showPlayOverlay"
              type="button"
              class="mobile-play-btn"
              aria-label="Play video"
              @click="handleMobilePlay"
            >
              <Play :size="48" :stroke-width="1.5" aria-hidden="true" />
            </button>

            <div v-if="!hasVideo" class="bf-placeholder">
              <span class="placeholder-tag">Video placeholder</span>
            </div>
          </div>

          <!-- Controls row under the frame -->
          <div v-if="hasVideo" class="bf-controls">
            <button type="button" class="ctrl-btn" :aria-label="isPaused ? 'Play video' : 'Pause video'" @click="togglePause">
              <component :is="isPaused ? Play : Pause" :size="20" :stroke-width="1.75" aria-hidden="true" />
            </button>
            <button type="button" class="ctrl-btn" :aria-label="isMuted ? 'Unmute video' : 'Mute video'" @click="toggleMute">
              <component :is="isMuted ? VolumeX : Volume2" :size="20" :stroke-width="1.75" aria-hidden="true" />
            </button>
            <button type="button" class="ctrl-btn ctrl-btn-fs" :aria-label="isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'" :aria-pressed="isFullscreen" @click="toggleFullscreen">
              <component :is="isFullscreen ? Minimize : Maximize" :size="20" :stroke-width="1.75" aria-hidden="true" />
              <span class="ctrl-fs-text">{{ isFullscreen ? 'Exit fullscreen' : 'Fullscreen' }}</span>
            </button>
          </div>
        </div>

        <!-- RIGHT: Text column -->
        <div class="bf-details-col">
          <h2 class="bf-heading">
            Help Us Build<br />a Permanent<br />Home for Zion
          </h2>
          <div class="bf-rule" aria-hidden="true" />
          <div class="bf-paragraphs">
            <p v-for="(p, i) in buildingFund.paragraphs" :key="i" class="bf-paragraph">
              {{ p }}
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* ================================================================
   Section 2: Building Fund
   ================================================================ */
.bf-section {
  background-color: var(--midnight-black);
  padding: 64px 0;
}

.bf-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 32px;
}

/*
  Desktop grid: text column decides the row height.
  Video column stretches to match via align-items: stretch.
*/
.bf-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: 48px;
  align-items: stretch;
}

/* ---- Left: Video column ---- */
.bf-video-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

/*
  Frame fills all remaining height (flex: 1 1 auto).
  Video inside is position:absolute so it never pushes the row taller.
*/
.bf-frame {
  position: relative;
  width: 100%;
  flex: 1 1 auto;
  min-height: 360px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(198, 161, 91, 0.60);
  background-color: var(--deep-blue);
}

.bf-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* Fullscreen: show the whole video, no crop */
.bf-frame:fullscreen {
  background-color: var(--midnight-black);
  border: none;
  border-radius: 0;
}
.bf-frame:fullscreen .bf-video,
.bf-frame:-webkit-full-screen .bf-video {
  object-fit: contain;
}

/* Placeholder */
.bf-placeholder {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-start;
  padding: var(--space-3) var(--space-4);
}

.placeholder-tag {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: rgba(240, 217, 165, 0.45);
  line-height: 1;
}

/* Mobile play overlay */
.mobile-play-btn {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(8, 13, 24, 0.40);
  border: none;
  cursor: pointer;
  color: var(--antique-gold);
  z-index: 3;
}

.mobile-play-btn:focus-visible {
  outline: 3px solid var(--champagne);
  outline-offset: -3px;
}

/* ---- Controls row: under frame, right-aligned ---- */
.bf-controls {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  flex-shrink: 0;
}

.ctrl-btn {
  min-height: 48px;
  min-width: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0 12px;
  background-color: transparent;
  border: 1px solid rgba(198, 161, 91, 0.55);
  border-radius: var(--radius-md);
  color: var(--champagne);
  cursor: pointer;
  flex-shrink: 0;
  transition: border-color var(--duration-fast) var(--ease-out);
}

.ctrl-btn:hover { border-color: var(--antique-gold); }
.ctrl-btn:focus-visible {
  outline: 3px solid var(--champagne);
  outline-offset: 2px;
}

.ctrl-btn-fs { padding: 0 16px; }

.ctrl-fs-text {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: var(--weight-medium);
  white-space: nowrap;
}

/* ---- Right: Text ---- */
.bf-details-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}

.bf-heading {
  font-family: var(--font-display);
  font-weight: var(--weight-semibold);
  font-size: clamp(1.75rem, 2.5vw, 2.75rem);
  line-height: 1.1;
  color: var(--champagne);
  margin-top: 0;
  margin-bottom: 20px;
}

.bf-rule {
  width: 64px;
  height: 2px;
  background-color: var(--antique-gold);
  margin-bottom: 20px;
  flex-shrink: 0;
}

.bf-paragraphs {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 62ch;
}

.bf-paragraph {
  font-family: var(--font-body);
  font-size: clamp(1.125rem, 1vw, 1.25rem);
  line-height: 1.7;
  color: var(--champagne);
}

/* Last paragraph: no bottom margin so bottom aligns with controls */
.bf-paragraph:last-child {
  margin-bottom: 0;
}

/* ================================================================
   Below 1200px: stack single column
   ================================================================ */
@media (max-width: 1199px) {
  .bf-container {
    padding: 0 24px;
  }

  .bf-grid {
    grid-template-columns: 1fr;
    gap: 32px;
    align-items: start;
  }

  .bf-video-col { order: 1; }
  .bf-details-col { order: 2; }

  /* Restore fixed aspect ratio when stacked */
  .bf-frame {
    flex: none;
    aspect-ratio: 16 / 9;
    min-height: 0;
  }

  .bf-heading {
    font-size: clamp(1.5rem, 5vw, 2rem);
  }

  .bf-paragraph {
    font-size: 1.125rem;
    line-height: 1.65;
  }
}

@media (max-width: 768px) {
  .bf-section {
    padding: 40px 0;
  }
}
</style>
