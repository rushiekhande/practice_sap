document.addEventListener('DOMContentLoaded', () => {
  /* Mobile menu */
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');

  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  /* Back to top */
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    toTop.classList.toggle('visible', window.scrollY > 400);
  });
  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* Contact form validation */
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  function setError(name, msg) {
    const input = form[name];
    const field = input.closest('.field');
    const err = form.querySelector(`.error[data-for="${name}"]`);
    if (msg) {
      field.classList.add('invalid');
      err.textContent = msg;
    } else {
      field.classList.remove('invalid');
      err.textContent = '';
    }
  }

  function validate() {
    let ok = true;
    const name = form.name.value.trim();
    if (!name) {
      setError('name', 'Please enter your name.');
      ok = false;
    } else {
      setError('name', '');
    }

    const email = form.email.value.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError('email', 'Please enter your email.');
      ok = false;
    } else if (!emailRe.test(email)) {
      setError('email', 'Please enter a valid email.');
      ok = false;
    } else {
      setError('email', '');
    }

    const message = form.message.value.trim();
    if (!message) {
      setError('message', 'Please enter a message.');
      ok = false;
    } else if (message.length < 10) {
      setError('message', 'Message should be at least 10 characters.');
      ok = false;
    } else {
      setError('message', '');
    }
    return ok;
  }

  ['name', 'email', 'message'].forEach(n => {
    form[n].addEventListener('blur', validate);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.textContent = '';
    formStatus.style.color = '';

    if (!validate()) {
      formStatus.style.color = '#ef4444';
      formStatus.textContent = 'Please fix the highlighted fields.';
      return;
    }

    // Simulated success — connect to Formspree / backend later
    formStatus.style.color = '#0d9488';
    formStatus.textContent = 'Message sent — thanks! I’ll get back to you soon.';
    form.reset();
  });
});
