function updateNavAuthState() {
  const token = localStorage.getItem('token');
  const authState = document.getElementById('auth-state');
  const protectedLinks = document.querySelectorAll('.requires-auth');
  const onProtectedPage = document.body?.dataset?.authRequired === 'true';
  const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  
  if (onProtectedPage && !token) {
    window.location.href = './auth.html?next=' + encodeURIComponent(window.location.pathname.split('/').pop() || 'index.html');
    return;
  }

  protectedLinks.forEach((link) => {
    if (!(link instanceof HTMLAnchorElement)) return;
    if (token) {
      link.style.display = '';
      link.removeAttribute('aria-disabled');
      link.title = '';
    } else {
      link.style.display = 'none';
      link.setAttribute('aria-disabled', 'true');
      link.title = 'Login required';
    }
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    if (!(link instanceof HTMLAnchorElement)) return;
    const linkPage = (link.getAttribute('href') || '').replace('./', '').toLowerCase();
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  if (!authState) return;

  if (token) {
    authState.innerHTML = `
      <span>Logged in</span>
      <button id="globalLogout" class="secondary">Logout</button>
    `;
    const logoutBtn = document.getElementById('globalLogout');
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        localStorage.removeItem('token');
        updateNavAuthState();
        if (onProtectedPage) {
          window.location.href = './auth.html';
          return;
        }
        alert('Logged out');
      };
    }
  } else {
    authState.innerHTML = `<a href="./auth.html">Login</a>`;
  }
}

// Init on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateNavAuthState);
} else {
  updateNavAuthState();
}

// Update API base display if present (for index.html)
const currentBase = document.getElementById('currentBase');
if (currentBase) {
  currentBase.textContent = localStorage.getItem('apiBase') || 'http://localhost:5000';
}

