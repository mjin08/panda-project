/**
 * API Service Module
 *
 * Centralizes all HTTP requests to the Express backend.
 * Vue components call these functions — they never fetch() directly.
 *
 * CS Note: Separating the API layer from components makes it trivial
 * to swap backends, add auth headers, or mock data for tests.
 */

const API_BASE = '/api';

/**
 * Generic fetch wrapper with error handling.
 * @param {string} path — e.g. '/pandas', '/countries/1'
 * @param {object} options — fetch options
 * @returns {Promise<object>} parsed JSON response
 */
async function request(path, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error(`[API] ${path} failed:`, err.message);
    throw err;
  }
}

/* ── Health ────────────────────────────────────────────── */

export const fetchHealth = () => request('/health');

/* ── Countries ─────────────────────────────────────────── */

export const fetchCountries = () => request('/countries');
export const fetchCountry   = (id) => request(`/countries/${id}`);

/* ── Panda Programs ────────────────────────────────────── */

export const fetchPandas   = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/pandas${query ? '?' + query : ''}`);
};

export const fetchPanda    = (id) => request(`/pandas/${id}`);

/* ── Convenience: filtered queries ─────────────────────── */

export const fetchPandasByEra     = (era)     => fetchPandas({ era });
export const fetchPandasByStatus  = (status)  => fetchPandas({ status });
export const fetchPandasByCountry = (countryId) => fetchPandas({ country_id: countryId });