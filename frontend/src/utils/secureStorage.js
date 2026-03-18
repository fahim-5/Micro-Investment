/**
 * Secure Storage Utility for Authentication Tokens and User Data
 * Provides safe storage with encryption support
 */

// Encryption key (in production, this should come from environment variables)
const ENCRYPTION_KEY = 'micro-invest-pro-secure-key-2024';

// Storage keys
const STORAGE_KEYS = {
  AUTH_TOKEN: 'microinvest_auth_token',
  USER_DATA: 'microinvest_user_data',
  THEME_PREFERENCE: 'microinvest_theme',
  SESSION_ID: 'microinvest_session_id',
  REFRESH_TOKEN: 'microinvest_refresh_token',
  KYC_STATUS: 'microinvest_kyc_status',
};

/**
 * Simple encryption (Base64 for demo, use crypto-js in production)
 */
const encrypt = (text) => {
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch (error) {
    console.error('Encryption error:', error);
    return text;
  }
};

/**
 * Simple decryption
 */
const decrypt = (encryptedText) => {
  try {
    return decodeURIComponent(escape(atob(encryptedText)));
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedText;
  }
};

/**
 * Store authentication token securely
 */
export const setToken = (token) => {
  try {
    if (!token) {
      console.warn('Attempted to store empty token');
      return false;
    }

    const encryptedToken = encrypt(token);
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, encryptedToken);
    
    // Also set in session storage for additional security
    sessionStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    
    // Generate session ID
    const sessionId = generateSessionId();
    localStorage.setItem(STORAGE_KEYS.SESSION_ID, sessionId);
    
    return true;
  } catch (error) {
    console.error('Error storing token:', error);
    return false;
  }
};

/**
 * Get authentication token
 */
export const getToken = () => {
  try {
    // Try session storage first (more secure)
    const sessionToken = sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (sessionToken) {
      return sessionToken;
    }

    // Fall back to localStorage
    const encryptedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (!encryptedToken) {
      return null;
    }

    const token = decrypt(encryptedToken);
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

/**
 * Clear all authentication data
 */
export const clearToken = () => {
  try {
    // Clear from all storage locations
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    localStorage.removeItem(STORAGE_KEYS.SESSION_ID);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.KYC_STATUS);
    
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    sessionStorage.clear(); // Clear all session data
    
    // Clear any cookies
    document.cookie.split(';').forEach(cookie => {
      document.cookie = cookie
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
    
    return true;
  } catch (error) {
    console.error('Error clearing token:', error);
    return false;
  }
};

/**
 * Store user data securely
 */
export const setUserData = (userData) => {
  try {
    if (!userData) {
      console.warn('Attempted to store empty user data');
      return false;
    }

    const encryptedData = encrypt(JSON.stringify(userData));
    localStorage.setItem(STORAGE_KEYS.USER_DATA, encryptedData);
    
    return true;
  } catch (error) {
    console.error('Error storing user data:', error);
    return false;
  }
};

/**
 * Get user data
 */
export const getUserData = () => {
  try {
    const encryptedData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    if (!encryptedData) {
      return null;
    }

    const userData = JSON.parse(decrypt(encryptedData));
    return userData;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

/**
 * Update specific user data fields
 */
export const updateUserData = (updates) => {
  try {
    const currentData = getUserData();
    if (!currentData) {
      return false;
    }

    const updatedData = { ...currentData, ...updates };
    return setUserData(updatedData);
  } catch (error) {
    console.error('Error updating user data:', error);
    return false;
  }
};

/**
 * Store refresh token
 */
export const setRefreshToken = (refreshToken) => {
  try {
    const encryptedToken = encrypt(refreshToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, encryptedToken);
    return true;
  } catch (error) {
    console.error('Error storing refresh token:', error);
    return false;
  }
};

/**
 * Get refresh token
 */
export const getRefreshToken = () => {
  try {
    const encryptedToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    if (!encryptedToken) {
      return null;
    }
    return decrypt(encryptedToken);
  } catch (error) {
    console.error('Error getting refresh token:', error);
    return null;
  }
};

/**
 * Store KYC status
 */
export const setKYCStatus = (status) => {
  try {
    localStorage.setItem(STORAGE_KEYS.KYC_STATUS, JSON.stringify(status));
    return true;
  } catch (error) {
    console.error('Error storing KYC status:', error);
    return false;
  }
};

/**
 * Get KYC status
 */
export const getKYCStatus = () => {
  try {
    const status = localStorage.getItem(STORAGE_KEYS.KYC_STATUS);
    return status ? JSON.parse(status) : null;
  } catch (error) {
    console.error('Error getting KYC status:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  try {
    const token = getToken();
    if (!token) {
      return false;
    }

    // Check if token is expired (JWT token expiry check)
    const tokenParts = token.split('.');
    if (tokenParts.length === 3) {
      try {
        const payload = JSON.parse(atob(tokenParts[1]));
        if (payload.exp && payload.exp * 1000 < Date.now()) {
          // Token expired
          clearToken();
          return false;
        }
      } catch (e) {
        // Not a JWT token, continue with basic check
      }
    }

    return true;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

/**
 * Generate unique session ID
 */
const generateSessionId = () => {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

/**
 * Get current session ID
 */
export const getSessionId = () => {
  return localStorage.getItem(STORAGE_KEYS.SESSION_ID);
};

/**
 * Check storage availability
 */
export const isStorageAvailable = () => {
  try {
    const testKey = 'test_storage';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.error('Storage not available:', error);
    return false;
  }
};

/**
 * Clear all app data (logout + cleanup)
 */
export const clearAllAppData = () => {
  try {
    // Clear all localStorage items that start with our app prefix
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('microinvest_')) {
        localStorage.removeItem(key);
      }
    });

    // Clear all sessionStorage
    sessionStorage.clear();

    // Clear cookies
    document.cookie.split(';').forEach(cookie => {
      const [name] = cookie.split('=');
      document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    return true;
  } catch (error) {
    console.error('Error clearing app data:', error);
    return false;
  }
};

/**
 * Set theme preference
 */
export const setTheme = (theme) => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME_PREFERENCE, theme);
    return true;
  } catch (error) {
    console.error('Error storing theme:', error);
    return false;
  }
};

/**
 * Get theme preference
 */
export const getTheme = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME_PREFERENCE) || 'dark';
  } catch (error) {
    console.error('Error getting theme:', error);
    return 'dark';
  }
};

/**
 * Export all functions
 */
export default {
  setToken,
  getToken,
  clearToken,
  setUserData,
  getUserData,
  updateUserData,
  setRefreshToken,
  getRefreshToken,
  setKYCStatus,
  getKYCStatus,
  isAuthenticated,
  getSessionId,
  isStorageAvailable,
  clearAllAppData,
  setTheme,
  getTheme,
  STORAGE_KEYS
};