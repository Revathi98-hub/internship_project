// Global configuration for backend API endpoint
window.API_BASE_URL = (function() {
  // If explicitly defined via custom window variable, use that
  if (window.CUSTOM_API_BASE_URL) {
    return window.CUSTOM_API_BASE_URL;
  }
  
  const origin = window.location.origin;
  
  // If running on local Live Server or dev port (like 8080, 5500, 3000) separate from Express on 5000:
  if (origin.includes('localhost') || origin.includes('127.0.0.1') || origin.includes('192.168.')) {
    if (window.location.port !== '5000' && window.location.port !== '') {
      return 'http://localhost:5000';
    }
  }
  
  // Otherwise, in production (served by Express on same origin), use relative paths
  return '';
})();

console.log('[Config] Active API_BASE_URL:', window.API_BASE_URL || '(Same Origin)');
