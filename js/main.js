// Mobile nav toggle
const hamburger = document.querySelector('.hamburger')
const mobileMenu = document.querySelector('.mobile-menu')

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open')
    mobileMenu.classList.toggle('open')
  })
}

// Set active nav link
const currentPath = window.location.pathname.split('/').pop() || 'index.html'
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href')
  if (href === currentPath || (currentPath === '' && href === 'index.html')) {
    link.classList.add('active')
  }
})

// Contact form handler
const form = document.getElementById('quote-form')
const successMsg = document.getElementById('form-success')

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    form.style.display = 'none'
    if (successMsg) {
      successMsg.style.display = 'block'
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' })
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
