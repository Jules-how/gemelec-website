// Mobile nav toggle
const hamburger = document.querySelector('.hamburger')
const mobileMenu = document.querySelector('.mobile-menu')

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open')
    mobileMenu.classList.toggle('open')
    hamburger.setAttribute('aria-expanded', hamburger.classList.contains('open') ? 'true' : 'false')
  })
}

// Active nav state is handled by hard-coded class="active" in each page's HTML.

// Contact form handler
const form = document.getElementById('quote-form')
const successMsg = document.getElementById('form-success')
const errorMsg = document.getElementById('form-error')

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (successMsg) successMsg.style.display = 'none'
    if (errorMsg) errorMsg.style.display = 'none'

    if (form.reportValidity && !form.reportValidity()) {
      const firstInvalid = form.querySelector(':invalid')
      if (firstInvalid && typeof firstInvalid.focus === 'function') {
        firstInvalid.focus()
      }
      return
    }

    const submitButton = form.querySelector('button[type="submit"]')
    const originalButtonText = submitButton ? submitButton.textContent : ''
    const formData = new FormData(form)
    const params = new URLSearchParams(window.location.search)
    const payload = Object.fromEntries(formData.entries())

    payload.source = 'website'
    payload.form_name = 'quote-form'
    payload.page_url = window.location.href
    payload.landing_page = window.location.pathname.split('/').pop() || 'index.html'
    payload.referrer = document.referrer || ''
    payload.utm_source = params.get('utm_source') || ''
    payload.utm_medium = params.get('utm_medium') || ''
    payload.utm_campaign = params.get('utm_campaign') || ''
    payload.utm_term = params.get('utm_term') || ''
    payload.utm_content = params.get('utm_content') || ''

    if (submitButton) {
      submitButton.disabled = true
      submitButton.textContent = 'Sending...'
    }

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok || result.ok === false) {
        throw new Error(result.message || 'The enquiry could not be sent.')
      }

      form.reset()
      form.style.display = 'none'
      if (successMsg) {
        successMsg.style.display = 'block'
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    } catch (error) {
      if (errorMsg) {
        errorMsg.textContent = error.message || 'Sorry, the enquiry could not be sent. Please call 0498 351 351.'
        errorMsg.style.display = 'block'
        errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' })
        if (!errorMsg.hasAttribute('tabindex')) {
          errorMsg.setAttribute('tabindex', '-1')
        }
        if (typeof errorMsg.focus === 'function') {
          errorMsg.focus()
        }
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false
        submitButton.textContent = originalButtonText
      }
    }
  })
}

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'))
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (mobileMenu) mobileMenu.classList.remove('open')
      if (hamburger) hamburger.classList.remove('open')
    }
  })
})
