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
  isLoading: boolean;
  updateUser: (updates: Partial<User>) => Promise<User>;
  updateUnitPreference: (unit: WeightUnit) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    void mockApi.getUser()
      .then((localUser) => { if (mounted) setUser(localUser); })
      .catch((error: unknown) => console.error('Failed to load local athlete profile:', error))
      .finally(() => { if (mounted) setIsLoading(false); });
    return () => { mounted = false; };
  }, []);

  const updateUser = useCallback(async (updates: Partial<User>) => {
    const updatedUser = await mockApi.updateUser(updates);
    setUser(updatedUser);
    return updatedUser;
  }, []);

  const updateUnitPreference = useCallback(async (unit: WeightUnit) => {
    await updateUser({ unitPreference: unit });
  }, [updateUser]);

  return (
    <AuthContext.Provider value={{ user, isLoading, updateUser, updateUnitPreference }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
