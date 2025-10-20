export type ReportType = 'red-flag' | 'intervention';

export type ReportStatus = 'draft' | 'under-investigation' | 'resolved' | 'rejected';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  isAdmin: boolean;
}

export interface Report {
  id: string;
  userId: string;
  type: ReportType;
  title: string;
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  status: ReportStatus;
  images?: string[];
  videos?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, phone?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}