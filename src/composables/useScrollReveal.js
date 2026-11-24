import { onMounted, onUnmounted } from 'vue'

/**
 * Composable for scroll-reveal animations.
 * Adds the 'revealed' class when elements with the 'reveal' class
 * enter the viewport. Respects prefers-reduced-motion.
 */
export function useScrollReveal() {
  let observer = null

  onMounted(() => {
    /* Skip animation entirely if user prefers reduced motion */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('revealed')
      })
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el)
    })
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })
}
