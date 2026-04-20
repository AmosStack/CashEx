const API_BASE = localStorage.getItem('apiBase') || 'http://localhost:5000';

function getToken() {
  return localStorage.getItem('token') || '';
}

function setToken(token) {
  if (token) {
    localStorage.setItem('token', token);
  }
}

function clearToken() {
  localStorage.removeItem('token');
}

async function apiRequest(path, { method = 'GET', body, auth = false } = {}) {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (auth && getToken()) {
    headers.Authorization = `Bearer ${getToken()}`;
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  const text = await response.text();
  let data = {};

  if (text) {
    try {
      data = JSON.parse(text);
    } catch (_error) {
      data = { message: text };
    }
  }

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

window.CashExApi = {
  API_BASE,
  getToken,
  setToken,
  clearToken,
  apiRequest
};
