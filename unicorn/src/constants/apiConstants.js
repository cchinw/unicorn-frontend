const env = process.env.NODE_ENV
export const API_BASE_URL =
  env === 'development'
    ? 'http://127.0.0.1:8000'
    : window.location.protocol === 'https:'
    ? process.env.REACT_APP_API_BASE_URL_SSL
    : process.env.REACT_APP_API_BASE_URL_NO_SSL

console.log('BASE: ', API_BASE_URL)
