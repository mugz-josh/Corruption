export type ReportType = 'red-flag' | 'intervention';
export type ReportStatus = 'draft' | 'under-investigation' | 'resolved' | 'rejected';

export interface Report {
  id: string;
  userId: string; // usually the email of the creator
  type: ReportType;
  title: string;
  description: string;
  location?: string;
  latitude?: number;
  longitude?: number;
  status: ReportStatus;
  images?: string[];
  videos?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  email: string;
  name: string;
  phone?: string;
  isAdmin?: boolean;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, name: string, phone?: string) => Promise<User>;
  logout: () => void;
}
