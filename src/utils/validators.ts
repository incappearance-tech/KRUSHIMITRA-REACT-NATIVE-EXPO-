export const validators = {
  phone: (phone: string) => /^[0-9]{10}$/.test(phone),
  email: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  otp: (otp: string) => /^[0-9]{6}$/.test(otp),
  name: (name: string) => name.trim().length >= 2,
  farmSize: (size: number) => size > 0,
  password: (pwd: string) => pwd.length >= 6,
};
