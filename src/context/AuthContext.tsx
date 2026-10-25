import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { User, WeightUnit } from '../types';
import { mockApi } from '../api/mock-adapter';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateUser: (updates: Partial<User>) => Promise<User>;
  updateUnitPreference: (unit: WeightUnit) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const u = await mockApi.getUser();
        setUser(u);
      } catch (err) {
        console.error('Failed to load user:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, []);

  const updateUser = useCallback(async (updates: Partial<User>) => {
    const updated = await mockApi.updateUser(updates);
    setUser(updated);
    return updated;
  }, []);

  const updateUnitPreference = useCallback(
    async (unit: WeightUnit) => {
      const updated = await mockApi.updateUser({ unitPreference: unit });
      setUser(updated);
    },
    []
  );

  const logout = useCallback(async () => {
    // In mock demo mode, reload initial user
    const u = await mockApi.getUser();
    setUser(u);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        updateUser,
        updateUnitPreference,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
