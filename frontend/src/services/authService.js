import api from './api';

const authService = {
  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response;
  },

  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response;
  },

  // Get current user profile
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response;
  },

  // Update user profile
  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    return response;
  },

  // Request password reset
  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response;
  },

  // Reset password with token
  resetPassword: async (token, newPassword) => {
    const response = await api.post('/auth/reset-password', { token, newPassword });
    return response;
  },

  // Verify email
  verifyEmail: async (token) => {
    const response = await api.post('/auth/verify-email', { token });
    return response;
  },

  // Resend verification email
  resendVerification: async (email) => {
    const response = await api.post('/auth/resend-verification', { email });
    return response;
  },

  // Logout (optional - could be client-side only)
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Even if API fails, we should clear client-side token
      console.warn('Logout API failed, clearing client token:', error.message);
    }
    return { success: true };
  },

  // Check KYC status
  getKYCStatus: async () => {
    const response = await api.get('/auth/kyc-status');
    return response;
  },

  // Submit KYC documents
  submitKYC: async (kycData) => {
    const formData = new FormData();
    
    // Append KYC data to form data
    Object.keys(kycData).forEach(key => {
      if (kycData[key] !== null && kycData[key] !== undefined) {
        formData.append(key, kycData[key]);
      }
    });

    const response = await api.post('/auth/kyc', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  },

  // Check if email exists (for registration validation)
  checkEmailExists: async (email) => {
    const response = await api.get('/auth/check-email', { params: { email } });
    return response;
  },

  // Get user preferences
  getPreferences: async () => {
    const response = await api.get('/auth/preferences');
    return response;
  },

  // Update user preferences
  updatePreferences: async (preferences) => {
    const response = await api.put('/auth/preferences', preferences);
    return response;
  },

  // Get user notifications
  getNotifications: async () => {
    const response = await api.get('/auth/notifications');
    return response;
  },

  // Mark notification as read
  markNotificationAsRead: async (notificationId) => {
    const response = await api.patch(`/auth/notifications/${notificationId}/read`);
    return response;
  },

  // Clear all notifications
  clearNotifications: async () => {
    const response = await api.delete('/auth/notifications');
    return response;
  },
};

export default authService;