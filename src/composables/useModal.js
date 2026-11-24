import { watch, onUnmounted, nextTick } from 'vue'

/**
 * Composable for modal behavior:
 * - ESC key to close
 * - Click outside to close (optional, default true)
 * - Focus trap (Tab / Shift+Tab cycle)
 * - Scroll lock on body
 * - Return focus to trigger element on close
 *
 * @param {import('vue').Ref<boolean>} isOpen
 * @param {() => void} onClose
 * @param {{ closeOnOutsideClick?: boolean }} options
 */
export function useModal(isOpen, onClose, options = {}) {
  const { closeOnOutsideClick = true } = options
  let previouslyFocused = null

  function getFocusableElements(container) {
    if (!container) return []
    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"]), iframe'
      )
    )
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
      return
    }

    if (e.key === 'Tab') {
      const modal = document.querySelector('[data-modal]')
      if (!modal) return

      const focusable = getFocusableElements(modal)
      if (focusable.length === 0) {
        e.preventDefault()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
  }

  function handleOutsideClick(e) {
    if (!closeOnOutsideClick) return
    const modal = document.querySelector('[data-modal]')
    if (modal && !modal.contains(e.target)) {
      onClose()
    }
  }

  function lockScroll() {
    document.body.classList.add('scroll-locked')
  }

  function unlockScroll() {
    document.body.classList.remove('scroll-locked')
  }

  watch(
    isOpen,
    async (open) => {
      if (open) {
        previouslyFocused = document.activeElement
        lockScroll()
        document.addEventListener('keydown', handleKeydown)
        if (closeOnOutsideClick) {
          /* Delay so the opening click doesn't immediately close */
          setTimeout(() => {
            document.addEventListener('mousedown', handleOutsideClick)
          }, 0)
        }
        await nextTick()
        const modal = document.querySelector('[data-modal]')
        if (modal) {
          const focusable = getFocusableElements(modal)
          if (focusable.length > 0) {
            focusable[0].focus()
          }
        }
      } else {
        unlockScroll()
        document.removeEventListener('keydown', handleKeydown)
        document.removeEventListener('mousedown', handleOutsideClick)
        if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
          previouslyFocused.focus()
        }
        previouslyFocused = null
      }
    },
    { immediate: true }
  )

  onUnmounted(() => {
    unlockScroll()
    document.removeEventListener('keydown', handleKeydown)
    document.removeEventListener('mousedown', handleOutsideClick)
  })
}
