console.log('ENV:', import.meta.env.VITE_ENVIRONMENT);
console.log('BACKEND:', import.meta.env.VITE_BACKEND);
export const host =
  import.meta.env.VITE_ENVIRONMENT !== 'development' &&
  import.meta.env.VITE_BACKEND
    ? `${import.meta.env.VITE_BACKEND}/api/`
    : '/api/';
