import type { Report, User } from '../types';

const REPORTS_KEY = 'reports';
const USERS_KEY = 'users';
const SESSION_KEY = 'loggedInUserId';

export const getLoggedInUserId = (): string | null => {
  return localStorage.getItem(SESSION_KEY);
};

export const getAllReports = (): Report[] => {
  return JSON.parse(localStorage.getItem(REPORTS_KEY) || '[]');
};

export const getReportsByUser = (userId: string): Report[] => {
  return getAllReports().filter((r) => r.createdBy === userId);
};

export const saveReport = (report: Report): void => {
  const reports = getAllReports();
  reports.push(report);
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
};

export const updateReport = (updated: Report): void => {
  const reports = getAllReports().map((r) => (r.id === updated.id ? updated : r));
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
};

export const deleteReport = (id: string): void => {
  const reports = getAllReports().filter((r) => r.id !== id);
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
};

export const getAllUsers = (): User[] => {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
};

export const saveUser = (user: User): void => {
  const users = getAllUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const findUserByEmail = (email: string): User | undefined => {
  return getAllUsers().find((u) => u.email === email);
};

export const isAdminUser = (): boolean => {
  return localStorage.getItem('isAdmin') === 'true';
};
