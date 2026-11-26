<script setup>
import { buildingFund } from '@/data/content.js'

const hasVideo = !!buildingFund.youtubeId
const embedUrl = hasVideo
  ? `https://www.youtube-nocookie.com/embed/${buildingFund.youtubeId}?rel=0&playsinline=1`
  : ''
</script>

<template>
  <section :id="buildingFund.sectionId" class="bf-section">
    <div class="bf-container">
      <div class="bf-grid">

        <!-- LEFT on desktop: Video column -->
        <div class="bf-video-col">
          <div class="bf-frame" :class="{ 'is-placeholder': !hasVideo }">
            <iframe
              v-if="hasVideo"
              class="bf-iframe"
              :src="embedUrl"
              title="Zion Baptist Church building overview video"
              loading="lazy"
              allowfullscreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
            <div v-else class="bf-placeholder">
              <span class="placeholder-tag">Video placeholder</span>
            </div>
          </div>
        </div>

        <!-- RIGHT on desktop: Text column -->
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
  min-width: 0;
}

/*
  Frame fills all remaining height (flex: 1 1 auto).
  Uses aspect-ratio as a fallback minimum shape.
*/
.bf-frame {
  position: relative;
  width: 100%;
  flex: 1 1 auto;
  min-height: 360px;
  aspect-ratio: 16 / 9;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(198, 161, 91, 0.60);
  background-color: var(--deep-blue);
}

.bf-iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: none;
  display: block;
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

/* Last paragraph: no bottom margin */
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

  .bf-frame {
    flex: none;
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

/* ================================================================
   Mobile (768px and below): heading above video, then paragraphs
   ================================================================ */
@media (max-width: 768px) {
  .bf-section {
    padding: 40px 0;
  }

  /*
    Use grid areas so the heading (inside the text column)
    appears above the video without duplicating markup.
  */
  .bf-grid {
    grid-template-columns: 1fr;
    grid-template-areas:
      "heading"
      "video"
      "text";
    gap: 24px;
  }

  .bf-video-col {
    grid-area: video;
    justify-self: center;
    width: 100%;
    max-width: 480px;
  }

  .bf-frame {
    background-color: transparent;
  }

  .bf-details-col {
    display: contents;
  }

  .bf-heading {
    grid-area: heading;
    text-align: center;
    width: 100%;
  }

  .bf-rule {
    grid-area: video;
    display: none;
  }

  .bf-paragraphs {
    grid-area: text;
  }
}
</style>
