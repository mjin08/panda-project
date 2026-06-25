/**
 * API Service Module (Axios)
 *
 * Centralizes all HTTP requests to the Express backend.
 * Vue components call these functions — they never make HTTP calls directly.
 *
 * CS Note: Axios provides automatic JSON parsing, request/response interceptors,
 * timeout handling, and error normalization — advantages over raw fetch().
 * The Vite dev proxy forwards /api to localhost:3001, so all requests
 * go to a single origin in development.
 */

import axios from 'axios';

// Create a pre-configured Axios instance
const apiClient = axios.create({
  baseURL: '/api',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Response interceptor — unwrap data and normalize errors.
 * All controller methods return { count, data } or { data }.
 * This interceptor returns the full response body so callers
 * get consistent shape without worrying about Axios wrappers.
 */
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error || error.message || 'Unknown API error';
    console.error(`[API] ${error.config?.url} failed:`, message);
    return Promise.reject(new Error(message));
  }
);

/* ── Health ────────────────────────────────────────────── */

export const fetchHealth = () => apiClient.get('/health');

/* ── Countries ─────────────────────────────────────────── */

/** Fetch all countries (alphabetical) */
export const fetchCountries = () => apiClient.get('/countries');

/** Fetch a single country by ID */
export const fetchCountry = (id) => apiClient.get(`/countries/${id}`);

/* ── Panda Programs ────────────────────────────────────── */

/**
 * Fetch panda programs with optional filters.
 * @param {object} params — { era, status, country_id }
 */
export const fetchPandas = (params = {}) => apiClient.get('/pandas', { params });

/** Fetch a single panda program by ID */
export const fetchPanda = (id) => apiClient.get(`/pandas/${id}`);

/* ── Convenience: filtered queries ─────────────────────── */

export const fetchPandasByEra     = (era)       => fetchPandas({ era });
export const fetchPandasByStatus  = (status)    => fetchPandas({ status });
export const fetchPandasByCountry = (countryId) => fetchPandas({ country_id: countryId });