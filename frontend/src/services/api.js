import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL || import.meta.env.REACT_APP_BASE_URL || 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Dashboard
  async getDashboard() {
    const response = await api.get('/api/admin/dashboard');
    return response.data;
  },

  async getDashboardCharts(period = 'week') {
    const response = await api.get('/api/admin/dashboard/charts', { params: { period } });
    return response.data;
  },

  async getDashboardCategories() {
    const response = await api.get('/api/admin/dashboard/categories');
    return response.data;
  },

  // Users
  async getUsers(params = {}) {
    const response = await api.get('/api/admin/users', { params });
    return response.data;
  },

  async deleteUser(id) {
    const response = await api.delete(`/api/admin/users/${id}`);
    return response.data;
  },

  async approveUser(id) {
    const response = await api.patch(`/api/admin/users/approve/${id}`);
    return response.data;
  },

  async blockUser(id) {
    const response = await api.patch(`/api/admin/users/block/${id}`);
    return response.data;
  },

  // Products
  async getProducts(params = {}) {
    const response = await api.get('/api/admin/products', { params });
    return response.data;
  },

  async getPendingProducts() {
    const response = await api.get('/api/admin/products/pending');
    return response.data;
  },

  async getLiveAuctions() {
    const response = await api.get('/api/admin/products/live');
    return response.data;
  },

  async getProductById(id) {
    const response = await api.get(`/api/admin/products/${id}`);
    return response.data;
  },

  async approveProduct(id, data = {}) {
    const response = await api.patch(`/api/admin/products/approve/${id}`, data);
    return response.data;
  },

  async rejectProduct(id, data = {}) {
    const response = await api.patch(`/api/admin/products/reject/${id}`, data);
    return response.data;
  },

  // Orders
  async getOrders(params = {}) {
    const response = await api.get('/api/admin/orders', { params });
    return response.data;
  },

  async getOrderStats() {
    const response = await api.get('/api/admin/orders/stats');
    return response.data;
  },

  async updateOrderStatus(id, data) {
    const response = await api.patch(`/api/admin/orders/${id}/status`, data);
    return response.data;
  },

  // Analytics
  async getWeeklyAnalytics() {
    const response = await api.get('/api/admin/analytics/weekly');
    return response.data;
  },

  async getMonthlyAnalytics() {
    const response = await api.get('/api/admin/analytics/monthly');
    return response.data;
  },

  async getCategoryAnalytics() {
    const response = await api.get('/api/admin/analytics/categories');
    return response.data;
  },

  async getTopProducts() {
    const response = await api.get('/api/admin/analytics/top-products');
    return response.data;
  },
};

export default api;

