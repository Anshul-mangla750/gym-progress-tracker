import { ArrowRight, BarChart3, Check, Dumbbell, Sparkles, Utensils, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroAthleteImg from '../assets/hero_athlete.jpg';

const features = [
  {
    icon: Dumbbell,
    number: '01',
    title: 'Train with a plan',
    description: 'Build a routine around your schedule and log every set as you progress.',
    tone: 'violet',
  },
  {
    icon: Utensils,
    number: '02',
    title: 'Fuel with clarity',
    description: 'Track meals, calories, and macros in one simple daily view.',
    tone: 'amber',
  },
  {
    icon: BarChart3,
    number: '03',
    title: 'See your progress',
    description: 'Follow training volume, personal records, and weekly consistency.',
    tone: 'blue',
  },
];

export function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FBFAFD] text-[#171321]">
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Link to="/" className="flex items-center gap-3" aria-label="VYQOR home">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7C3AED] text-white shadow-lg shadow-violet-300/40">
            <Zap size={20} fill="currentColor" />
          </span>
          <span>
            <span className="block font-heading text-xl font-black tracking-tight">VYQOR</span>
            <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-[#777184]">Fitness, with direction</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[#625D70] md:flex" aria-label="Main navigation">
          <a href="#approach" className="transition-colors hover:text-violet-700">Our approach</a>
          <a href="#features" className="transition-colors hover:text-violet-700">Features</a>
          <a href="#meaning" className="transition-colors hover:text-violet-700">The VYQOR mindset</a>
        </nav>

        <Link to="/auth" className="inline-flex items-center gap-2 rounded-xl bg-[#171321] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-violet-800 sm:px-5 sm:text-sm">
          Open app <ArrowRight size={15} />
        </Link>
      </header>

      <section id="approach" className="relative mx-auto grid min-h-[590px] w-full max-w-7xl items-center gap-8 px-5 pb-16 pt-8 sm:px-8 md:grid-cols-[1fr_0.9fr] md:pb-24 md:pt-12 lg:px-12">
        <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-violet-200/60 blur-3xl" />
        <div className="relative z-10 max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-violet-800 shadow-sm sm:text-xs">
            <Sparkles size={14} /> A clearer path to progress
          </div>
          <h1 className="font-heading text-[clamp(3.1rem,7vw,6.4rem)] font-extrabold leading-[0.98] tracking-[-0.07em]">
            Your vision.<br />
            <span className="bg-gradient-to-r from-violet-700 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">Your results.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-[#625D70] sm:text-lg sm:leading-8">
            Meet VYQOR: the fitness companion that brings your training, nutrition, and progress into one focused place.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/auth?mode=signup" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-300/40 transition hover:-translate-y-0.5 hover:bg-[#6D28D9]">
              Start your quest <ArrowRight size={17} />
            </Link>
            <a href="#features" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#E6E1EC] bg-white/80 px-6 py-3 text-sm font-semibold text-[#343044] transition hover:border-violet-300 hover:bg-violet-50/70">
              Explore the features
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[#777184]">
            <span className="inline-flex items-center gap-1.5"><Check size={14} className="text-violet-700" /> Workouts that adapt to you</span>
            <span className="inline-flex items-center gap-1.5"><Check size={14} className="text-violet-700" /> Progress you can measure</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] md:ml-auto">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-violet-300/70 via-fuchsia-200/45 to-indigo-200/60 blur-2xl" />
          <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br from-[#EDE5FA] via-[#F7F1FF] to-[#E8E3F4] shadow-[0_28px_80px_-32px_rgba(91,33,182,0.45)] sm:min-h-[430px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(255,255,255,0.8),transparent_36%)]" />
            <img src={heroAthleteImg} alt="Athlete training with a dumbbell" className="absolute inset-0 h-full w-full object-cover object-[58%_center] mix-blend-multiply opacity-90 grayscale-[0.35]" />
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#21133D]/90 via-[#21133D]/35 to-transparent" />
            <div className="absolute left-5 top-5 rounded-2xl border border-white/70 bg-white/75 px-4 py-3 shadow-lg backdrop-blur-md sm:left-7 sm:top-7">
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#777184]">Your next rep</p>
              <p className="mt-1 font-heading text-lg font-extrabold text-[#21133D]">Starts with a plan.</p>
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white sm:bottom-7 sm:left-7 sm:right-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-200">Vision · Quest · Overcome · Results</p>
                <p className="mt-2 font-heading text-2xl font-extrabold sm:text-3xl">Make progress yours.</p>
              </div>
              <span className="mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur"><Zap size={18} fill="currentColor" /></span>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-[#EEEAF3] bg-white/80 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-700 sm:text-xs">Everything works together</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">A stronger routine, made simpler.</h2>
            <p className="mt-4 text-sm leading-6 text-[#625D70] sm:text-base">Spend less time piecing your plan together and more time showing up for it.</p>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {features.map(({ icon: Icon, number, title, description, tone }) => (
              <article key={number} className="group rounded-2xl border border-[#EEEAF3] bg-[#FBFAFD] p-5 transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:bg-white hover:shadow-xl hover:shadow-violet-950/5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone === 'violet' ? 'bg-violet-100 text-violet-700' : tone === 'amber' ? 'bg-amber-100 text-amber-700' : 'bg-sky-100 text-sky-700'}`}>
                    <Icon size={20} />
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#AAA4B4]">{number}</span>
                </div>
                <h3 className="mt-6 font-heading text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#777184]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="meaning" className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-16 sm:px-8 md:flex-row md:items-center md:justify-between md:py-20 lg:px-12">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-700 sm:text-xs">The VYQOR mindset</p>
          <h2 className="mt-3 max-w-2xl font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">Vision sets the direction.<br className="hidden sm:block" /> Your quest creates the change.</h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#625D70] sm:text-base">Overcome the plateaus with steady effort. Let the results speak for themselves.</p>
        </div>
        <Link to="/auth?mode=signup" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#171321] px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-800">
          Go to your dashboard <ArrowRight size={16} />
        </Link>
      </section>

      <footer className="border-t border-[#EEEAF3] bg-white/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-[#777184] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <span className="font-heading font-extrabold tracking-wide text-[#343044]">VYQOR</span>
          <span>Vision · Your Quest · Overcome · Results</span>
        </div>
      </footer>
    </main>
  );
}
