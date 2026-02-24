// API configuration based on environment
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// API endpoints
export const API_ENDPOINTS = {
  MENU: `${API_BASE_URL}/api/menu`,
  ORDERS: `${API_BASE_URL}/api/orders`,
  ORDER_STATUS: (id: string) => `${API_BASE_URL}/api/orders/${id}`,
  UPDATE_ORDER_STATUS: (id: string) => `${API_BASE_URL}/api/orders/${id}/status`,
} as const;
