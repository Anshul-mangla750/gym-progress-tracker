import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WorkoutProvider } from './context/WorkoutContext';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Workouts } from './pages/Workouts';
import { ActiveWorkout } from './pages/ActiveWorkout';
import { WorkoutPlanner } from './pages/WorkoutPlanner';
import { ExerciseLibrary } from './pages/ExerciseLibrary';
import { Nutrition } from './pages/Nutrition';
import { Community } from './pages/Community';
import { Progress } from './pages/Progress';
import { Profile } from './pages/Profile';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { Toaster } from 'sonner';
import { useAuth } from './hooks/useAuth';

function RequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-[#FBFAFD] text-sm font-semibold text-violet-800">Loading your VYQOR account…</div>;
  }
  if (!isAuthenticated) return <Navigate to="/auth" replace state={{ from: location }} />;
  return <Outlet />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route element={<RequireAuth />}>
            <Route element={<WorkoutProvider><AppLayout /></WorkoutProvider>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/active-workout" element={<ActiveWorkout />} />
              <Route path="/splits" element={<WorkoutPlanner />} />
              <Route path="/exercises" element={<ExerciseLibrary />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/community" element={<Community />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster
          theme="light"
          position="top-right"
          richColors
          toastOptions={{
            className: 'rounded-2xl border border-[#E9E4F0] shadow-md font-sans text-xs',
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  );
}
