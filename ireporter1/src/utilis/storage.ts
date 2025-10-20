import type { User, Report } from '../types';

// Storage keys
const USERS_KEY = 'ireporter_users';
const REPORTS_KEY = 'ireporter_reports';
const CURRENT_USER_KEY = 'ireporter_current_user';

// Initialize with demo data
export const initializeStorage = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    const demoUsers: User[] = [
      {
        id: '1',
        email: 'admin@ireporter.com',
        name: 'Joshua User',
        isAdmin: true,
      },
      {
        id: '2',
        email: 'user@example.com',
        name: 'Joshua Doe',
        isAdmin: false,
      },
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers));
  }

  if (!localStorage.getItem(REPORTS_KEY)) {
    const demoReports: Report[] = [
      {
        id: '1',
        userId: '2',
        type: 'red-flag',
        title: 'Corruption in Public Procurement',
        description: 'Witnessed officials demanding bribes for contract awards at the city council.',
        location: 'City Hall, Nairobi',
        latitude: -1.2864,
        longitude: 36.8172,
        status: 'under-investigation',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: '2',
        userId: '2',
        type: 'intervention',
        title: 'Collapsed Bridge on Mombasa Road',
        description: 'The bridge has completely collapsed causing major traffic issues and safety concerns.',
        location: 'Mombasa Road, Km 15',
        latitude: -1.3467,
        longitude: 36.8522,
        status: 'resolved',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];
    localStorage.setItem(REPORTS_KEY, JSON.stringify(demoReports));
  }
};

// User operations
export const getUsers = (): User[] => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const addUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const findUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find(u => u.email === email);
};

export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

// Report operations
export const getReports = (): Report[] => {
  const data = localStorage.getItem(REPORTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getReportsByUser = (userId: string): Report[] => {
  return getReports().filter(r => r.userId === userId);
};

export const getReportById = (id: string): Report | undefined => {
  return getReports().find(r => r.id === id);
};

export const addReport = (report: Report): void => {
  const reports = getReports();
  reports.push(report);
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
};

export const updateReport = (id: string, updates: Partial<Report>): void => {
  const reports = getReports();
  const index = reports.findIndex(r => r.id === id);
  if (index !== -1) {
    reports[index] = { ...reports[index], ...updates, updatedAt: new Date().toISOString() };
    localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
  }
};

export const deleteReport = (id: string): void => {
  const reports = getReports().filter(r => r.id !== id);
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
};