export type UserRole = 'farmer' | 'labour' | 'transporter';

export interface IUser {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
}
