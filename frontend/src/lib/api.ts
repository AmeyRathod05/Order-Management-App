// API configuration based on environment
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' && window.location.origin) || 
  'http://localhost:3001';

// Environment detection
export const ENVIRONMENT = process.env.NODE_ENV || 'development';
export const IS_PRODUCTION = ENVIRONMENT === 'production';
export const IS_DEVELOPMENT = ENVIRONMENT === 'development';

// Debug info
export const DEBUG_INFO = {
  environment: ENVIRONMENT,
  isProduction: IS_PRODUCTION,
  isDevelopment: IS_DEVELOPMENT,
  apiUrl: API_BASE_URL,
  envVar: process.env.NEXT_PUBLIC_API_URL || 'Not set',
  windowOrigin: typeof window !== 'undefined' ? window.location.origin : 'N/A'
};

// API endpoints
export const API_ENDPOINTS = {
  MENU: `${API_BASE_URL}/api/menu`,
  ORDERS: `${API_BASE_URL}/api/orders`,
  ORDER_STATUS: (id: string) => `${API_BASE_URL}/api/orders/${id}`,
  UPDATE_ORDER_STATUS: (id: string) => `${API_BASE_URL}/api/orders/${id}/status`,
} as const;
