import type { Exercise } from '../types';

let _id = 0;
const eid = () => `ex_${++_id}`;

export const seedExercises: Exercise[] = [
  // ── Chest ────────────────────────────────────────────────
  {
    id: eid(), name: 'Barbell Bench Press', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'],
    equipment: 'barbell', exerciseType: 'compound', trackingType: 'weight_reps', defaultRestSeconds: 120,
    instructions: 'Lie on a flat bench. Grip the bar slightly wider than shoulder-width. Lower to mid-chest, press up.',
    techniqueNotes: 'Keep shoulder blades retracted and feet flat. Drive through the floor.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Incline Dumbbell Press', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'],
    equipment: 'dumbbell', exerciseType: 'compound', trackingType: 'weight_reps', defaultRestSeconds: 90,
    instructions: 'Set bench to 30-45 degrees. Press dumbbells up from shoulder level.',
    techniqueNotes: 'Control the eccentric. Keep elbows at ~45 degrees.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Chest Fly (Dumbbell)', primaryMuscle: 'chest', secondaryMuscles: ['shoulders'],
    equipment: 'dumbbell', exerciseType: 'isolation', trackingType: 'weight_reps', defaultRestSeconds: 75,
    instructions: 'Lie flat, arms extended with slight elbow bend. Open arms wide, then squeeze back together.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Cable Crossover', primaryMuscle: 'chest', secondaryMuscles: ['shoulders'],
    equipment: 'cable', exerciseType: 'isolation', trackingType: 'weight_reps', defaultRestSeconds: 60,
    instructions: 'Stand between cable stations. Bring handles together in front of chest with slight forward lean.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Push-ups', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders', 'core'],
    equipment: 'bodyweight', exerciseType: 'compound', trackingType: 'bodyweight_reps', defaultRestSeconds: 60,
    instructions: 'Hands shoulder-width apart, body straight. Lower chest to floor, push back up.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Dips (Chest)', primaryMuscle: 'chest', secondaryMuscles: ['triceps', 'shoulders'],
    equipment: 'bodyweight', exerciseType: 'compound', trackingType: 'bodyweight_reps', defaultRestSeconds: 90,
    instructions: 'Lean forward on parallel bars. Lower until upper arms are parallel to floor.',
    techniqueNotes: 'Forward lean targets chest. Upright targets triceps.',
    isCustom: false, createdAt: new Date().toISOString(),
  },

  // ── Back ─────────────────────────────────────────────────
  {
    id: eid(), name: 'Lat Pulldown', primaryMuscle: 'back', secondaryMuscles: ['biceps'],
    equipment: 'cable', exerciseType: 'compound', trackingType: 'weight_reps', defaultRestSeconds: 90,
    instructions: 'Grip bar wider than shoulders. Pull down to upper chest, squeeze lats.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Pull-ups', primaryMuscle: 'back', secondaryMuscles: ['biceps', 'core'],
    equipment: 'bodyweight', exerciseType: 'compound', trackingType: 'bodyweight_reps', defaultRestSeconds: 120,
    instructions: 'Hang from bar with overhand grip. Pull chin above bar.',
    techniqueNotes: 'Initiate with lats, not arms. Full extension at bottom.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Barbell Row', primaryMuscle: 'back', secondaryMuscles: ['biceps', 'core'],
    equipment: 'barbell', exerciseType: 'compound', trackingType: 'weight_reps', defaultRestSeconds: 90,
    instructions: 'Hinge at hips, pull barbell to lower chest/upper abdomen.',
    techniqueNotes: 'Keep back flat. Squeeze shoulder blades at top.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Seated Cable Row', primaryMuscle: 'back', secondaryMuscles: ['biceps'],
    equipment: 'cable', exerciseType: 'compound', trackingType: 'weight_reps', defaultRestSeconds: 75,
    instructions: 'Sit upright, pull handle to lower chest. Squeeze back muscles.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'One-arm Dumbbell Row', primaryMuscle: 'back', secondaryMuscles: ['biceps'],
    equipment: 'dumbbell', exerciseType: 'compound', trackingType: 'weight_reps', defaultRestSeconds: 75,
    instructions: 'Support one knee and hand on bench. Row dumbbell to hip.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'T-Bar Row', primaryMuscle: 'back', secondaryMuscles: ['biceps', 'core'],
    equipment: 'barbell', exerciseType: 'compound', trackingType: 'weight_reps', defaultRestSeconds: 90,
    instructions: 'Straddle the bar, row using V-grip handle to chest.',
    isCustom: false, createdAt: new Date().toISOString(),
  },

  // ── Shoulders ────────────────────────────────────────────
  {
    id: eid(), name: 'Overhead Press', primaryMuscle: 'shoulders', secondaryMuscles: ['triceps'],
    equipment: 'barbell', exerciseType: 'compound', trackingType: 'weight_reps', defaultRestSeconds: 120,
    instructions: 'Press barbell from shoulder level to overhead. Lock out at top.',
    techniqueNotes: 'Brace core. Keep bar path close to face.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Lateral Raises', primaryMuscle: 'shoulders', secondaryMuscles: [],
    equipment: 'dumbbell', exerciseType: 'isolation', trackingType: 'weight_reps', defaultRestSeconds: 60,
    instructions: 'Raise dumbbells to sides until arms are parallel to floor.',
    techniqueNotes: 'Slight bend in elbows. Lead with elbows, not hands.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Rear Delt Fly', primaryMuscle: 'shoulders', secondaryMuscles: ['back'],
    equipment: 'dumbbell', exerciseType: 'isolation', trackingType: 'weight_reps', defaultRestSeconds: 60,
    instructions: 'Bend forward, raise dumbbells out to sides targeting rear delts.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Face Pulls', primaryMuscle: 'shoulders', secondaryMuscles: ['back'],
    equipment: 'cable', exerciseType: 'isolation', trackingType: 'weight_reps', defaultRestSeconds: 60,
    instructions: 'Pull rope attachment towards face with elbows high. Rotate hands outward.',
    techniqueNotes: 'Great for shoulder health and posture.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Arnold Press', primaryMuscle: 'shoulders', secondaryMuscles: ['triceps'],
    equipment: 'dumbbell', exerciseType: 'compound', trackingType: 'weight_reps', defaultRestSeconds: 90,
    instructions: 'Start with palms facing you. Rotate and press overhead.',
    isCustom: false, createdAt: new Date().toISOString(),
  },

  // ── Biceps ───────────────────────────────────────────────
  {
    id: eid(), name: 'Barbell Curl', primaryMuscle: 'biceps', secondaryMuscles: ['forearms'],
    equipment: 'barbell', exerciseType: 'isolation', trackingType: 'weight_reps', defaultRestSeconds: 60,
    instructions: 'Stand upright, curl barbell to shoulders. Control the descent.',
    techniqueNotes: 'Keep elbows stationary at your sides.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Dumbbell Curl', primaryMuscle: 'biceps', secondaryMuscles: ['forearms'],
    equipment: 'dumbbell', exerciseType: 'isolation', trackingType: 'weight_reps', defaultRestSeconds: 60,
    instructions: 'Curl dumbbells alternately or simultaneously. Supinate at the top.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Hammer Curl', primaryMuscle: 'biceps', secondaryMuscles: ['forearms'],
    equipment: 'dumbbell', exerciseType: 'isolation', trackingType: 'weight_reps', defaultRestSeconds: 60,
    instructions: 'Curl with neutral (hammer) grip. Targets brachialis and brachioradialis.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Preacher Curl', primaryMuscle: 'biceps', secondaryMuscles: [],
    equipment: 'dumbbell', exerciseType: 'isolation', trackingType: 'weight_reps', defaultRestSeconds: 60,
    instructions: 'Use preacher bench to isolate biceps. Curl weight up, control descent.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Cable Curl', primaryMuscle: 'biceps', secondaryMuscles: ['forearms'],
    equipment: 'cable', exerciseType: 'isolation', trackingType: 'weight_reps', defaultRestSeconds: 60,
    instructions: 'Stand facing cable machine with low pulley. Curl bar/handle upward.',
    isCustom: false, createdAt: new Date().toISOString(),
  },

  // ── Triceps ──────────────────────────────────────────────
  {
    id: eid(), name: 'Triceps Pushdown', primaryMuscle: 'triceps', secondaryMuscles: [],
    equipment: 'cable', exerciseType: 'isolation', trackingType: 'weight_reps', defaultRestSeconds: 60,
    instructions: 'Push cable handle down until arms are fully extended. Keep elbows at sides.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Overhead Triceps Extension', primaryMuscle: 'triceps', secondaryMuscles: [],
    equipment: 'dumbbell', exerciseType: 'isolation', trackingType: 'weight_reps', defaultRestSeconds: 60,
    instructions: 'Hold dumbbell overhead with both hands. Lower behind head, extend up.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Skull Crushers', primaryMuscle: 'triceps', secondaryMuscles: [],
    equipment: 'barbell', exerciseType: 'isolation', trackingType: 'weight_reps', defaultRestSeconds: 75,
    instructions: 'Lie on bench, lower bar to forehead. Extend using triceps.',
    techniqueNotes: 'Use an EZ-bar for wrist comfort.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Close-grip Bench Press', primaryMuscle: 'triceps', secondaryMuscles: ['chest', 'shoulders'],
    equipment: 'barbell', exerciseType: 'compound', trackingType: 'weight_reps', defaultRestSeconds: 90,
    instructions: 'Bench press with hands shoulder-width apart to emphasize triceps.',
    isCustom: false, createdAt: new Date().toISOString(),
  },

  // ── Legs ─────────────────────────────────────────────────
  {
    id: eid(), name: 'Barbell Squat', primaryMuscle: 'legs', secondaryMuscles: ['glutes', 'core'],
    equipment: 'barbell', exerciseType: 'compound', trackingType: 'weight_reps', defaultRestSeconds: 150,
    instructions: 'Bar on upper back. Squat to at least parallel. Drive through heels.',
    techniqueNotes: 'Keep chest up, knees tracking over toes.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Leg Press', primaryMuscle: 'legs', secondaryMuscles: ['glutes'],
    equipment: 'machine', exerciseType: 'compound', trackingType: 'weight_reps', defaultRestSeconds: 120,
    instructions: 'Feet shoulder-width on platform. Lower platform to 90° knee angle, press up.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Romanian Deadlift', primaryMuscle: 'legs', secondaryMuscles: ['glutes', 'back'],
    equipment: 'barbell', exerciseType: 'compound', trackingType: 'weight_reps', defaultRestSeconds: 90,
    instructions: 'Hinge at hips with slight knee bend. Lower bar along legs until hamstring stretch.',
    techniqueNotes: 'Keep back flat throughout. Feel stretch in hamstrings.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Leg Curl', primaryMuscle: 'legs', secondaryMuscles: [],
    equipment: 'machine', exerciseType: 'isolation', trackingType: 'weight_reps', defaultRestSeconds: 60,
    instructions: 'Lying or seated, curl weight by bending knees. Squeeze hamstrings.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Leg Extension', primaryMuscle: 'legs', secondaryMuscles: [],
    equipment: 'machine', exerciseType: 'isolation', trackingType: 'weight_reps', defaultRestSeconds: 60,
    instructions: 'Seated, extend legs until straight. Squeeze quads at top.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Calf Raises', primaryMuscle: 'calves', secondaryMuscles: [],
    equipment: 'machine', exerciseType: 'isolation', trackingType: 'weight_reps', defaultRestSeconds: 45,
    instructions: 'Standing or seated, raise heels as high as possible. Squeeze at top.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Lunges', primaryMuscle: 'legs', secondaryMuscles: ['glutes'],
    equipment: 'dumbbell', exerciseType: 'compound', trackingType: 'weight_reps', defaultRestSeconds: 75,
    instructions: 'Step forward, lower rear knee toward floor. Drive back to start.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Bulgarian Split Squat', primaryMuscle: 'legs', secondaryMuscles: ['glutes'],
    equipment: 'dumbbell', exerciseType: 'compound', trackingType: 'weight_reps', defaultRestSeconds: 90,
    instructions: 'Rear foot elevated on bench. Lower until front thigh is parallel.',
    isCustom: false, createdAt: new Date().toISOString(),
  },

  // ── Core ─────────────────────────────────────────────────
  {
    id: eid(), name: 'Plank', primaryMuscle: 'core', secondaryMuscles: ['shoulders'],
    equipment: 'bodyweight', exerciseType: 'isolation', trackingType: 'duration', defaultRestSeconds: 60,
    instructions: 'Hold forearm plank with body straight. Brace abs throughout.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Cable Crunch', primaryMuscle: 'core', secondaryMuscles: [],
    equipment: 'cable', exerciseType: 'isolation', trackingType: 'weight_reps', defaultRestSeconds: 60,
    instructions: 'Kneel before cable machine. Crunch downward using abs, not arms.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Hanging Leg Raise', primaryMuscle: 'core', secondaryMuscles: [],
    equipment: 'bodyweight', exerciseType: 'isolation', trackingType: 'bodyweight_reps', defaultRestSeconds: 60,
    instructions: 'Hang from bar. Raise legs to parallel or higher. Control descent.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Ab Wheel Rollout', primaryMuscle: 'core', secondaryMuscles: ['shoulders'],
    equipment: 'other', exerciseType: 'isolation', trackingType: 'bodyweight_reps', defaultRestSeconds: 60,
    instructions: 'Kneel, roll wheel forward as far as controllable. Roll back using abs.',
    isCustom: false, createdAt: new Date().toISOString(),
  },

  // ── Compound / Full Body ─────────────────────────────────
  {
    id: eid(), name: 'Deadlift', primaryMuscle: 'back', secondaryMuscles: ['legs', 'glutes', 'core', 'forearms'],
    equipment: 'barbell', exerciseType: 'compound', trackingType: 'weight_reps', defaultRestSeconds: 180,
    instructions: 'Stand behind bar. Hinge and grip. Drive through floor, lock out at top.',
    techniqueNotes: 'Maintain neutral spine. Bar stays close to body.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
  {
    id: eid(), name: 'Farmers Walk', primaryMuscle: 'forearms', secondaryMuscles: ['core', 'shoulders', 'legs'],
    equipment: 'dumbbell', exerciseType: 'compound', trackingType: 'duration', defaultRestSeconds: 90,
    instructions: 'Hold heavy dumbbells at sides. Walk with upright posture.',
    isCustom: false, createdAt: new Date().toISOString(),
  },
];
