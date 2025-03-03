const CONFIG = {
    LOCAL_API_URL: "http://localhost:8082/api/jobbox", // Local API URL
    LOCAL_APP_ENV: "development",
  
    LIVE_API_URL: "https://app.jobbox.one:8081/api/jobbox", // Production API URL
    LIVE_APP_ENV: "production"
  };
  
  // Auto-select API based on window location
// Improved API selection logic
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    CONFIG.API_URL = CONFIG.LOCAL_API_URL;
} else {
    CONFIG.API_URL = CONFIG.LIVE_API_URL;
}
  