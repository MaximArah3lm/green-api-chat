export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'https://api.green-api.com',
  idInstance: import.meta.env.VITE_ID_INSTANCE ?? '',
  apiTokenInstance: import.meta.env.VITE_API_TOKEN_INSTANCE ?? '',
}
