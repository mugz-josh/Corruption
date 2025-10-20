import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, AuthContextType } from '../types';



import { getCurrentUser, setCurrentUser, findUserByEmail, addUser, initializeStorage } from '../utilis/storage';


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeStorage();
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // password is not currently used for local storage-based auth; reference it to avoid unused variable error
    void password;
    const foundUser = findUserByEmail(email);
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }
    setUser(foundUser);
    setCurrentUser(foundUser);
  };

  const register = async (email: string, _password: string, name: string, phone?: string): Promise<void> => {
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      phone,
      isAdmin: false,
    };
    
    addUser(newUser);
    setUser(newUser);
    setCurrentUser(newUser);
  };

  const logout = (): void => {
    setUser(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};