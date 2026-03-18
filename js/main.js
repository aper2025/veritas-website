/* ============================================
   Veritas AI Solutions - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile Menu Toggle ---------- */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMobile = document.querySelector('.nav-mobile');

  if (mobileToggle && navMobile) {
    mobileToggle.addEventListener('click', function () {
      navMobile.classList.toggle('active');
      mobileToggle.classList.toggle('active');
      document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMobile.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- Mobile Dropdown Toggles ---------- */
  document.querySelectorAll('.mobile-dropdown-toggle').forEach(function (toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      var items = this.nextElementSibling;
      if (items) {
        items.classList.toggle('active');
        this.classList.toggle('open');
      }
    });
  });

  /* ---------- Header Scroll Effect ---------- */
  var header = document.querySelector('.header');
  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- Scroll Reveal Animation ---------- */
  var revealElements = document.querySelectorAll('.reveal');

  function checkReveal() {
    var windowHeight = window.innerHeight;
    revealElements.forEach(function (el) {
      var top = el.getBoundingClientRect().top;
      if (top < windowHeight - 80) {
        el.classList.add('revealed');
      }
    });
  }

  if (revealElements.length) {
    window.addEventListener('scroll', checkReveal);
    checkReveal();
  }

  /* ---------- Contact Form Handler (Google Apps Script) ---------- */
  // SETUP: Replace this URL with your deployed Google Apps Script Web App URL
  var FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycby78EwSxVZZJXYR40aHtttDL0rpr5jOD5i6RLUlmmqrG6wY4xHNJmXKgM0ziaYkC3_i/exec';

  var contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = contactForm.querySelector('button[type="submit"]');
      var originalText = btn.textContent;

      // Show sending state
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // If endpoint not configured yet, show success anyway (for testing)
      if (FORM_ENDPOINT === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        btn.textContent = 'Message Sent!';
        btn.style.backgroundColor = '#1B3A5C';
        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          btn.disabled = false;
          contactForm.reset();
        }, 3000);
        return;
      }

      // Submit to Google Apps Script
      var formData = new FormData(contactForm);
      fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      })
      .then(function () {
        btn.textContent = 'Message Sent!';
        btn.style.backgroundColor = '#1B3A5C';
        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          btn.disabled = false;
          contactForm.reset();
        }, 3000);
      })
      .catch(function () {
        btn.textContent = 'Error — Try Again';
        btn.style.backgroundColor = '#cc0000';
        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          btn.disabled = false;
        }, 3000);
      });
    });
  }

  /* ---------- Newsletter Form Handler (via Google Apps Script → Brevo) ---------- */
  // SETUP: Replace with your deployed Google Apps Script URL for newsletter
  var NEWSLETTER_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxYLIgDDKBy-61NcB2jFgfqo27mxqMNgMopX3vM7-uVUlkBxdgzRgUD0vfiBWuZqqV0BQ/exec';

  document.querySelectorAll('.newsletter-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button');
      var emailInput = form.querySelector('input[type="email"]');
      var originalText = btn.textContent;

      btn.textContent = 'Subscribing...';
      btn.disabled = true;

      // If endpoint not configured yet, show success for testing
      if (NEWSLETTER_ENDPOINT === 'YOUR_NEWSLETTER_APPS_SCRIPT_URL_HERE') {
        btn.textContent = 'Subscribed!';
        btn.style.backgroundColor = '#1B3A5C';
        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          btn.disabled = false;
          form.reset();
        }, 3000);
        return;
      }

      fetch(NEWSLETTER_ENDPOINT + '?email=' + encodeURIComponent(emailInput.value), {
        method: 'GET',
        mode: 'cors'
      })
      .then(function (response) { return response.json(); })
      .then(function () {
        btn.textContent = 'Subscribed!';
        btn.style.backgroundColor = '#1B3A5C';
        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          btn.disabled = false;
          form.reset();
        }, 3000);
      })
      .catch(function () {
        btn.textContent = 'Error — Try Again';
        btn.style.backgroundColor = '#cc0000';
        setTimeout(function () {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
          btn.disabled = false;
        }, 3000);
      });
    });
  });

});
