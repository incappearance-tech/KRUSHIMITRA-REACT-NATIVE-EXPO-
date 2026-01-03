export const ROLES = {
  FARMER: 'farmer',
  LABOUR: 'labour',
  TRANSPORTER: 'transporter',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
