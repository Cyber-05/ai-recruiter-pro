/**
 * API Configuration
 * Automatically detects environment and sets correct API URL
 */

// Determine API URL based on environment
const getAPIUrl = () => {
  // If on localhost or 127.0.0.1, use local backend
  if (window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname === '0.0.0.0') {
    return 'http://localhost:5000/api';
  }
  
  // If on deployed domain, use deployed backend
  // For Railway: https://your-app.railway.app/api
  // For Render: https://your-app.onrender.com/api
  // For Vercel: Use environment variable
  
  const deployedBackend = localStorage.getItem('backendUrl');
  if (deployedBackend) {
    return deployedBackend;
  }
  
  // Default: assume backend is on same domain
  return `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api`;
};

window.API_URL = getAPIUrl();

// Log for debugging
console.log('API URL:', window.API_URL);
console.log('Environment:', 
  window.location.hostname === 'localhost' ? 'LOCAL' : 'PRODUCTION');

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getAPIUrl };
}
