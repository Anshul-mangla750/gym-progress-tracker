import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type { User, WeightUnit } from '../types';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { setMockStorageUser } from '../api/mock-adapter';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<boolean>;
  updateUser: (updates: Partial<User>) => Promise<User>;
  updateUnitPreference: (unit: WeightUnit) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

function mapSupabaseUser(authUser: SupabaseUser): User {
  const metadata = authUser.user_metadata || {};
  const name = String(metadata.name || metadata.full_name || authUser.email?.split('@')[0] || 'Athlete');
  const level = metadata.experienceLevel;
  const progression = metadata.progressionSettings;

  return {
    id: authUser.id,
    email: authUser.email || '',
    name,
    displayName: String(metadata.display_name || metadata.displayName || name.split(' ')[0]),
    unitPreference: metadata.unitPreference === 'lb' ? 'lb' : 'kg',
    experienceLevel: level === 'beginner' || level === 'advanced' ? level : 'intermediate',
    availableDays: Array.isArray(metadata.availableDays) ? metadata.availableDays : [1, 2, 3, 5, 6],
    fitnessGoals: Array.isArray(metadata.fitnessGoals) ? metadata.fitnessGoals : ['Strength', 'Consistency'],
    timezone: String(metadata.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'),
    profilePicUrl: authUser.user_metadata?.avatar_url,
    activeSplitId: metadata.activeSplitId,
    progressionSettings: progression && typeof progression === 'object'
      ? progression as User['progressionSettings']
      : {
          defaultWeightIncrementKg: 2.5,
          defaultWeightIncrementLb: 5,
          progressionThreshold: 'all_sets',
          repTargetPosition: 'top',
        },
    createdAt: authUser.created_at,
    updatedAt: String(metadata.updated_at || authUser.updated_at || authUser.created_at),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    let mounted = true;
    supabase.auth.getSession()
      .then(({ data, error }) => {
        if (error) console.error('Failed to restore Supabase session:', error.message);
        if (mounted) {
          const sessionUser = data.session?.user;
          return setMockStorageUser(sessionUser?.id || null).then(() => {
            if (mounted) setUser(sessionUser ? mapSupabaseUser(sessionUser) : null);
          });
        }
        return undefined;
      })
      .catch((error: unknown) => console.error('Failed to restore Supabase session:', error))
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const sessionUser = session?.user;
      if (!sessionUser || event === 'SIGNED_OUT') {
        void setMockStorageUser(null);
        setUser(null);
        setIsLoading(false);
        return;
      }

      if (event === 'TOKEN_REFRESHED') return;
      if (event === 'USER_UPDATED') {
        setUser(mapSupabaseUser(sessionUser));
        return;
      }

      setIsLoading(true);
      void setMockStorageUser(sessionUser.id)
        .then(() => setUser(mapSupabaseUser(sessionUser)))
        .catch((error: unknown) => {
          console.error('Failed to load VYQOR account data:', error);
          setUser(mapSupabaseUser(sessionUser));
        })
        .finally(() => setIsLoading(false));
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase is not configured. Add the VYQOR Supabase environment variables.');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    await setMockStorageUser(data.user?.id || null);
    setUser(data.user ? mapSupabaseUser(data.user) : null);
  }, []);

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    if (!supabase) throw new Error('Supabase is not configured. Add the VYQOR Supabase environment variables.');
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, display_name: name.trim().split(/\s+/)[0] },
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) throw error;
    if (data.user && data.session) {
      await setMockStorageUser(data.user.id);
      setUser(mapSupabaseUser(data.user));
    }
    return !data.session;
  }, []);

  const updateUser = useCallback(async (updates: Partial<User>) => {
    if (!supabase) throw new Error('Supabase is not configured.');
    const { data, error } = await supabase.auth.updateUser({
      data: {
        ...(updates.name !== undefined ? { name: updates.name } : {}),
        ...(updates.displayName !== undefined ? { display_name: updates.displayName } : {}),
        ...(updates.unitPreference !== undefined ? { unitPreference: updates.unitPreference } : {}),
        ...(updates.experienceLevel !== undefined ? { experienceLevel: updates.experienceLevel } : {}),
        ...(updates.availableDays !== undefined ? { availableDays: updates.availableDays } : {}),
        ...(updates.fitnessGoals !== undefined ? { fitnessGoals: updates.fitnessGoals } : {}),
        ...(updates.timezone !== undefined ? { timezone: updates.timezone } : {}),
        ...(updates.progressionSettings !== undefined ? { progressionSettings: updates.progressionSettings } : {}),
        updated_at: new Date().toISOString(),
      },
    });
    if (error) throw error;
    if (!data.user) throw new Error('Your session has expired. Please sign in again.');
    const updatedUser = mapSupabaseUser(data.user);
    setUser(updatedUser);
    return updatedUser;
  }, []);

  const updateUnitPreference = useCallback(async (unit: WeightUnit) => {
    await updateUser({ unitPreference: unit });
  }, [updateUser]);

  const logout = useCallback(async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    await setMockStorageUser(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isConfigured: isSupabaseConfigured,
        signIn,
        signUp,
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
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
