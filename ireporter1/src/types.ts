// types.ts

// Report type
export type Report = {
  id: string;
  title: string;
  description: string;
  type: 'red-flag' | 'intervention'; // only these two allowed
  latitude: string;
  longitude: string;
  status: 'draft' | 'under investigation' | 'resolved' | 'rejected';
  createdBy: string;
  media: string[];
};

// User type
export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
};

// Optional: for AuthContext
export type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, name: string, phone?: string) => Promise<User>;
  logout: () => void;
  isLoading: boolean;
};

// Optional: if you use a status filter in AdminPage
export type ReportStatus = 'draft' | 'under investigation' | 'resolved' | 'rejected';
