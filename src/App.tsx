import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { Toaster } from 'sonner';

export default function App() {
  return (
    <AuthProvider>
      <WorkoutProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/active-workout" element={<ActiveWorkout />} />
              <Route path="/splits" element={<WorkoutPlanner />} />
              <Route path="/exercises" element={<ExerciseLibrary />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/community" element={<Community />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
          <Toaster
            theme="light"
            position="top-right"
            richColors
            toastOptions={{
              className: 'rounded-2xl border border-[#E2E8E4] shadow-md font-sans text-xs',
            }}
          />
        </BrowserRouter>
      </WorkoutProvider>
    </AuthProvider>
  );
}
