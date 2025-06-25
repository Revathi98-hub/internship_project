// Helper function to show Bootstrap alert
function showBootstrapAlert(message, type = 'success') {
    let alertPlaceholder = document.getElementById('alertPlaceholder');
    if (!alertPlaceholder) {
        alertPlaceholder = document.createElement('div');
        alertPlaceholder.id = 'alertPlaceholder';
        document.body.prepend(alertPlaceholder);
    }
    alertPlaceholder.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert" style="position:fixed;top:15px;right:15px;z-index:9999;min-width:200px;">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    setTimeout(() => {
        alertPlaceholder.innerHTML = '';
    }, 3000);
}

// Password visibility toggle
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');
if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function () {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePassword.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16"><path d="M13.359 11.238c.415-.387.812-.803 1.18-1.238C16 8 13 2.5 8 2.5c-1.036 0-2.02.195-2.938.535l1.493 1.493A5.978 5.978 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457.39.39.75.81 1.08 1.243-.33.433-.69.853-1.08 1.243-.335.335-.68.655-1.034.957l1.225 1.225z"/><path d="M11.354 13.354A7.978 7.978 0 0 1 8 13.5c-5 0-8-5.5-8-5.5a15.978 15.978 0 0 1 2.122-2.727l1.415 1.415A13.133 13.133 0 0 0 1.172 8c.058.087.122.183.195.288.335.48.83 1.12 1.465 1.755C4.121 11.332 5.88 12.5 8 12.5c.667 0 1.308-.067 1.922-.192l1.432 1.432z"/><path d="M3.707 2.293a1 1 0 0 0-1.414 1.414l10 10a1 1 0 0 0 1.414-1.414l-10-10z"/></svg>`;
        } else {
            passwordInput.type = 'password';
            togglePassword.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16"><path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.12 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/><path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>`;
        }
    });
}

// Caps Lock warning
const capsLockWarning = document.getElementById('capsLockWarning');
if (passwordInput && capsLockWarning) {
    passwordInput.addEventListener('keyup', function(e) {
        if (e.getModifierState && e.getModifierState('CapsLock')) {
            capsLockWarning.style.display = 'block';
        } else {
            capsLockWarning.style.display = 'none';
        }
    });
    passwordInput.addEventListener('blur', function() {
        capsLockWarning.style.display = 'none';
    });
}

// Password strength meter
const passwordStrength = document.getElementById('passwordStrength');
function getPasswordStrength(pw) {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
}
function renderStrengthBar(score) {
    let width = (score / 5) * 100;
    let color = '#d9534f';
    if (score >= 4) color = '#28a745';
    else if (score >= 3) color = '#ffc107';
    else if (score >= 2) color = '#fd7e14';
    passwordStrength.innerHTML = `<div class="password-strength-bar" style="width:${width}%;background:${color};"></div>`;
}
if (passwordInput && passwordStrength) {
    passwordInput.addEventListener('input', function() {
        const score = getPasswordStrength(passwordInput.value);
        renderStrengthBar(score);
    });
}

// Dark/Light theme toggle
const themeIcon = document.getElementById('themeIcon');
const themeLabel = document.getElementById('themeLabel');
function setTheme(dark) {
    if (typeof themeLabel === 'undefined' || !themeLabel) return; // Defensive check
    if (dark) {
        document.body.classList.add('dark-mode');
        themeLabel.textContent = 'Dark Mode';
        if (typeof themeIcon !== 'undefined' && themeIcon) themeIcon.innerHTML = '<i class="bi bi-moon"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        themeLabel.textContent = 'Light Mode';
        if (typeof themeIcon !== 'undefined' && themeIcon) themeIcon.innerHTML = '<i class="bi bi-sun"></i>';
    }
}
function toggleTheme() {
    const isDark = document.body.classList.contains('dark-mode');
    setTheme(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
}
if (themeIcon) {
    themeIcon.addEventListener('click', toggleTheme);
    themeIcon.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    });
}
// Load theme from storage
if (localStorage.getItem('theme') === 'dark') {
    setTheme(true);
} else {
    setTheme(false);
}

// Tooltip focus and blur handlers for help icons (works for help-icons inside input-group)
function setupHelpIconTooltips() {
    const helpIcons = document.querySelectorAll('.help-icon');
    helpIcons.forEach(icon => {
        icon.tabIndex = 0;
        icon.setAttribute('role', 'button');
        icon.addEventListener('focus', function() {
            showTooltip(icon);
        });
        icon.addEventListener('blur', function() {
            hideTooltip(icon);
        });
        icon.addEventListener('mouseenter', function() {
            showTooltip(icon);
        });
        icon.addEventListener('mouseleave', function() {
            hideTooltip(icon);
        });
        icon.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                showTooltip(icon);
            }
            if (e.key === 'Escape') {
                hideTooltip(icon);
            }
        });
    });
}

function showTooltip(icon) {
    let tooltip = icon.querySelector('.custom-tooltip');
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.innerText = icon.getAttribute('data-tooltip');
        icon.appendChild(tooltip);
    }
    tooltip.style.display = 'block';
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.top = '-36px';
    tooltip.setAttribute('role', 'tooltip');
}

function hideTooltip(icon) {
    const tooltip = icon.querySelector('.custom-tooltip');
    if (tooltip) tooltip.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    setupHelpIconTooltips();

    // Loading spinner in Login button
    window.loginBtn = document.getElementById('loginBtn');
    window.loginBtnText = document.getElementById('loginBtnText');
    window.loginSpinner = document.getElementById('loginSpinner');
});


// Button ripple effect
const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
    loginBtn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        const rect = loginBtn.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        loginBtn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
    });
}

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    if (loginBtn && loginSpinner && loginBtnText) {
        loginBtn.disabled = true;
        loginSpinner.style.display = 'inline-block';
        loginBtnText.textContent = 'Logging in...';
    }
    const empno = document.getElementById('empno').value.trim();
    const password = document.getElementById('password').value.trim();

    const loginData = { empno, password };

    try {
        const response = await fetch('https://backend-jyi3te79k-revathis-projects-e1be93d0.vercel.app/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        });
        const result = await response.json();
        if (result.success) {
            showBootstrapAlert('Login successful!', 'success');
            setTimeout(() => {
                console.log('Redirecting to delay.html...');
                window.location.href = 'delay.html';
            }, 1200);
        } else {
            showBootstrapAlert(result.message || 'Login failed', 'danger');
        }
    } catch (error) {
        showBootstrapAlert('Server error', 'danger');
    } finally {
        if (loginBtn && loginSpinner && loginBtnText) {
            loginBtn.disabled = false;
            loginSpinner.style.display = 'none';
            loginBtnText.textContent = 'Login';
        }
    }
});
