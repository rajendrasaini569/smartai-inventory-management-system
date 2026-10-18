const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;
  if (!response.ok) throw new Error(data?.message || data?.error || `API request failed (${response.status})`);
  return data;
}

export const api = {
  products: () => request('/products'),
  createProduct: (body) => request('/products', { method: 'POST', body: JSON.stringify(body) }),
  updateProduct: (id, body) => request(`/products/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(body) }),
  deleteProduct: (id) => request(`/products/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  suppliers: () => request('/suppliers'),
  createSupplier: (body) => request('/suppliers', { method: 'POST', body: JSON.stringify(body) }),
  sales: () => request('/sales'),
  createSale: (body) => request('/sales', { method: 'POST', body: JSON.stringify(body) }),
  purchases: () => request('/purchases'),
  createPurchase: (body) => request('/purchases', { method: 'POST', body: JSON.stringify(body) }),
  customers: () => request('/customers'),
  reminders: (email) => request(`/reminders?email=${encodeURIComponent(email)}`),
  saveReminders: (body) => request('/reminders', { method: 'POST', body: JSON.stringify(body) }),
  notifications: (email) => request(`/notifications?email=${encodeURIComponent(email)}`),
  health: () => request('/health'),
};
