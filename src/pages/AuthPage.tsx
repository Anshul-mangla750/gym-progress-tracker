import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Mail, Sparkles, Zap } from 'lucide-react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import heroAthleteImg from '../assets/hero_athlete.jpg';

export function AuthPage() {
  const { isAuthenticated, isConfigured, signIn, signUp } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>(() => new URLSearchParams(location.search).get('mode') === 'signup' ? 'signup' : 'signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const destination = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || '/dashboard';
  if (isAuthenticated) return <Navigate to={destination} replace />;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);
    try {
      if (mode === 'signup') {
        const needsEmailConfirmation = await signUp(email.trim(), password, name.trim());
        if (needsEmailConfirmation) {
          setMessage('Account created. Check your inbox to confirm your email, then come back to sign in.');
          setMode('signin');
          return;
        }
      } else {
        await signIn(email.trim(), password);
      }
      navigate(destination, { replace: true });
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'We could not complete that request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBFAFD] text-[#171321] lg:grid lg:grid-cols-2">
      <section className="flex min-h-screen flex-col px-5 py-5 sm:px-10 lg:px-14 xl:px-20">
        <Link to="/" className="inline-flex w-fit items-center gap-3" aria-label="Back to VYQOR home">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7C3AED] text-white shadow-md shadow-violet-300/40"><Zap size={19} fill="currentColor" /></span>
          <span>
            <span className="block font-heading text-lg font-black tracking-tight">VYQOR</span>
            <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-[#777184]">Vision · Quest · Results</span>
          </span>
        </Link>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <Link to="/" className="mb-7 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-[#777184] transition hover:text-violet-700"><ArrowLeft size={14} /> Back to home</Link>

          {!isConfigured ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <h1 className="font-heading text-xl font-bold text-amber-950">Supabase setup needed</h1>
              <p className="mt-2 text-sm leading-6 text-amber-900">Add <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> to your local environment file, then restart the development server.</p>
            </div>
          ) : (
            <>
              <div className="mb-7">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700"><Sparkles size={19} /></div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-700">Your next chapter</p>
                <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">{mode === 'signin' ? 'Welcome back.' : 'Start your quest.'}</h1>
                <p className="mt-2 text-sm leading-6 text-[#777184]">{mode === 'signin' ? 'Sign in to pick up where your progress left off.' : 'Create your account and bring your training into focus.'}</p>
              </div>

              <div className="mb-6 grid grid-cols-2 rounded-xl border border-[#E9E4F0] bg-white p-1">
                {(['signin', 'signup'] as const).map((tab) => (
                  <button key={tab} type="button" onClick={() => { setMode(tab); setError(''); setMessage(''); }} className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${mode === tab ? 'bg-[#7C3AED] text-white shadow-sm' : 'text-[#777184] hover:bg-violet-50'}`}>
                    {tab === 'signin' ? 'Sign in' : 'Create account'}
                  </button>
                ))}
              </div>

              {message && <p role="status" className="mb-4 rounded-xl border border-violet-200 bg-violet-50 px-3.5 py-3 text-sm leading-5 text-violet-900">{message}</p>}
              {error && <p role="alert" className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-3 text-sm leading-5 text-rose-800">{error}</p>}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <label className="block space-y-1.5 text-xs font-semibold text-[#484355]">
                    Your name
                    <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required maxLength={80} placeholder="e.g. Alex Vance" className="h-12 w-full rounded-xl border border-[#E4DFEA] bg-white px-3.5 text-sm text-[#171321] outline-none transition placeholder:text-[#AAA4B4] focus:border-violet-400 focus:ring-4 focus:ring-violet-100" />
                  </label>
                )}
                <label className="block space-y-1.5 text-xs font-semibold text-[#484355]">
                  Email address
                  <span className="relative block">
                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#AAA4B4]" />
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required placeholder="you@example.com" className="h-12 w-full rounded-xl border border-[#E4DFEA] bg-white pl-10 pr-3.5 text-sm text-[#171321] outline-none transition placeholder:text-[#AAA4B4] focus:border-violet-400 focus:ring-4 focus:ring-violet-100" />
                  </span>
                </label>
                <label className="block space-y-1.5 text-xs font-semibold text-[#484355]">
                  Password
                  <span className="relative block">
                    <LockKeyhole size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#AAA4B4]" />
                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} required minLength={6} placeholder="At least 6 characters" className="h-12 w-full rounded-xl border border-[#E4DFEA] bg-white pl-10 pr-12 text-sm text-[#171321] outline-none transition placeholder:text-[#AAA4B4] focus:border-violet-400 focus:ring-4 focus:ring-violet-100" />
                    <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#8A8494] hover:text-violet-700">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </span>
                </label>
                <button type="submit" disabled={isSubmitting} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-5 text-sm font-bold text-white shadow-lg shadow-violet-300/40 transition hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-60">
                  {isSubmitting ? 'Please wait…' : mode === 'signin' ? 'Sign in to VYQOR' : 'Create your account'}
                  {!isSubmitting && <ArrowRight size={16} />}
                </button>
              </form>

              <p className="mt-5 text-center text-[11px] leading-5 text-[#8A8494]">By continuing, you agree to use VYQOR responsibly and keep your account credentials private.</p>
            </>
          )}
        </div>
        <p className="pb-2 text-center text-[10px] font-medium text-[#AAA4B4]">Vision · Your Quest · Overcome · Results</p>
      </section>

      <aside className="relative hidden overflow-hidden bg-[#201239] lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_20%,rgba(139,92,246,0.55),transparent_48%)]" />
        <img src={heroAthleteImg} alt="Athlete training with a dumbbell" className="absolute inset-0 h-full w-full object-cover object-[58%_center] opacity-70 mix-blend-screen grayscale" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#160D27] via-[#211239]/35 to-[#211239]/15" />
        <div className="absolute bottom-12 left-8 right-8 z-10 mx-auto max-w-xl text-white xl:bottom-20 xl:left-14 xl:right-14">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-200">VISION · YOUR QUEST · OVERCOME · RESULTS</p>
          <h2 className="mt-4 font-heading text-4xl font-extrabold leading-tight tracking-tight xl:text-5xl">Make every session move you forward.</h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-violet-100/80">One place for your training plan, nutrition habits, and the progress you earn day by day.</p>
        </div>
      </aside>
    </main>
  );
}
