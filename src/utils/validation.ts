export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
};

export const validateMobile = (mobile: string): boolean => {
  return /^\d{10}$/.test(mobile);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};