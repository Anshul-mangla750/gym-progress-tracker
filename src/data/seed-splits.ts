import type { WorkoutSplit } from '../types';

export const seedSplits: WorkoutSplit[] = [
  {
    "id": "split_ppl",
    "userId": "user_1",
    "name": "Push Pull Legs",
    "description": "Classic 6-day push, pull, legs progressive overload split with balanced compound strength and targeted hypertrophy work.",
    "isTemplate": true,
    "isActive": false,
    "createdAt": "2026-10-20T02:35:36.776738+00:00",
    "updatedAt": "2026-10-20T06:15:40.417+00:00",
    "days": [
      {
        "id": "day_1_1",
        "name": "Push",
        "dayOfWeek": 1,
        "sortOrder": 1,
        "exercises": [
          {
            "id": "pe_1_1",
            "exerciseId": "ex_barbell_bench_press",
            "exerciseName": "Barbell Bench Press",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_1_2",
            "exerciseId": "ex_seated_dumbbell_press",
            "exerciseName": "Seated Dumbbell Press",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_1_3",
            "exerciseId": "ex_barbell_overhead_press",
            "exerciseName": "Barbell Overhead Press",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_1_4",
            "exerciseId": "ex_dumbbell_lateral_raise",
            "exerciseName": "Dumbbell Lateral Raise",
            "sortOrder": 4,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_1_5",
            "exerciseId": "ex_overhead_tricep_extension__db_",
            "exerciseName": "Overhead Tricep Extension (DB)",
            "sortOrder": 5,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_1_6",
            "exerciseId": "ex_incline_dumbbell_press",
            "exerciseName": "Incline Dumbbell Press",
            "sortOrder": 6,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          }
        ]
      },
      {
        "id": "day_1_2",
        "name": "Pull",
        "dayOfWeek": 2,
        "sortOrder": 2,
        "exercises": [
          {
            "id": "pe_2_1",
            "exerciseId": "ex_barbell_deadlift",
            "exerciseName": "Barbell Deadlift",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_2_2",
            "exerciseId": "ex_romanian_deadlift",
            "exerciseName": "Romanian Deadlift",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_2_3",
            "exerciseId": "ex_barbell_curl",
            "exerciseName": "Barbell Curl",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          }
        ]
      },
      {
        "id": "day_1_3",
        "name": "Legs",
        "dayOfWeek": 3,
        "sortOrder": 3,
        "exercises": [
          {
            "id": "pe_3_1",
            "exerciseId": "ex_barbell_back_squat",
            "exerciseName": "Barbell Back Squat",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_3_2",
            "exerciseId": "ex_sumo_squat",
            "exerciseName": "Sumo Squat",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_3_3",
            "exerciseId": "ex_barbell_front_squat",
            "exerciseName": "Barbell Front Squat",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_3_4",
            "exerciseId": "ex_hip_thrust__barbell_",
            "exerciseName": "Hip Thrust (Barbell)",
            "sortOrder": 4,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_3_5",
            "exerciseId": "ex_crunch",
            "exerciseName": "Crunch",
            "sortOrder": 5,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          }
        ]
      },
      {
        "id": "day_1_4",
        "name": "Push",
        "dayOfWeek": 4,
        "sortOrder": 4,
        "exercises": [
          {
            "id": "pe_4_1",
            "exerciseId": "ex_barbell_bench_press",
            "exerciseName": "Barbell Bench Press",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_4_2",
            "exerciseId": "ex_barbell_overhead_press",
            "exerciseName": "Barbell Overhead Press",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_4_3",
            "exerciseId": "ex_tricep_dips",
            "exerciseName": "Tricep Dips",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_4_4",
            "exerciseId": "ex_incline_barbell_press",
            "exerciseName": "Incline Barbell Press",
            "sortOrder": 4,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_4_5",
            "exerciseId": "ex_seated_dumbbell_press",
            "exerciseName": "Seated Dumbbell Press",
            "sortOrder": 5,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_4_6",
            "exerciseId": "ex_close_grip_bench_press",
            "exerciseName": "Close-Grip Bench Press",
            "sortOrder": 6,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          }
        ]
      },
      {
        "id": "day_1_5",
        "name": "Pull",
        "dayOfWeek": 5,
        "sortOrder": 5,
        "exercises": [
          {
            "id": "pe_5_1",
            "exerciseId": "ex_barbell_deadlift",
            "exerciseName": "Barbell Deadlift",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_5_2",
            "exerciseId": "ex_romanian_deadlift",
            "exerciseName": "Romanian Deadlift",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_5_3",
            "exerciseId": "ex_barbell_curl",
            "exerciseName": "Barbell Curl",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          }
        ]
      },
      {
        "id": "day_1_6",
        "name": "Legs",
        "dayOfWeek": 6,
        "sortOrder": 6,
        "exercises": [
          {
            "id": "pe_6_1",
            "exerciseId": "ex_barbell_back_squat",
            "exerciseName": "Barbell Back Squat",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_6_2",
            "exerciseId": "ex_sumo_squat",
            "exerciseName": "Sumo Squat",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_6_3",
            "exerciseId": "ex_barbell_front_squat",
            "exerciseName": "Barbell Front Squat",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_6_4",
            "exerciseId": "ex_hip_thrust__barbell_",
            "exerciseName": "Hip Thrust (Barbell)",
            "sortOrder": 4,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_6_5",
            "exerciseId": "ex_crunch",
            "exerciseName": "Crunch",
            "sortOrder": 5,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          }
        ]
      }
    ],
    "category": "PPL",
    "frequencyDays": 6,
    "level": "Intermediate",
    "tags": [
      "Hypertrophy",
      "Compound",
      "6-Day"
    ]
  },
  {
    "id": "split_recomp",
    "userId": "user_1",
    "name": "Lean Recomp",
    "description": "4-day high-density upper/lower split engineered for fat loss and muscle retention with shorter rest periods and compound supersets.",
    "isTemplate": true,
    "isActive": false,
    "createdAt": "2026-10-25T10:51:24.360975+00:00",
    "updatedAt": "2026-10-25T10:51:24.360975+00:00",
    "days": [
      {
        "id": "day_2_1",
        "name": "Upper A",
        "dayOfWeek": 1,
        "sortOrder": 1,
        "exercises": [
          {
            "id": "pe_1_1",
            "exerciseId": "ex_barbell_bench_press",
            "exerciseName": "Barbell Bench Press",
            "sortOrder": 1,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_1_2",
            "exerciseId": "ex_barbell_row__overhand_",
            "exerciseName": "Barbell Row (Overhand)",
            "sortOrder": 2,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_1_3",
            "exerciseId": "ex_barbell_overhead_press",
            "exerciseName": "Barbell Overhead Press",
            "sortOrder": 3,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_1_4",
            "exerciseId": "ex_lat_pulldown__wide_",
            "exerciseName": "Lat Pulldown (Wide)",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_1_5",
            "exerciseId": "ex_cable_lateral_raise",
            "exerciseName": "Cable Lateral Raise",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_1_6",
            "exerciseId": "ex_ez_bar_curl",
            "exerciseName": "EZ-Bar Curl",
            "sortOrder": 6,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_1_7",
            "exerciseId": "ex_rope_pushdown",
            "exerciseName": "Rope Pushdown",
            "sortOrder": 7,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          }
        ]
      },
      {
        "id": "day_2_2",
        "name": "Lower A",
        "dayOfWeek": 2,
        "sortOrder": 2,
        "exercises": [
          {
            "id": "pe_2_1",
            "exerciseId": "ex_barbell_back_squat",
            "exerciseName": "Barbell Back Squat",
            "sortOrder": 1,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_2_2",
            "exerciseId": "ex_romanian_deadlift",
            "exerciseName": "Romanian Deadlift",
            "sortOrder": 2,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_2_3",
            "exerciseId": "ex_bulgarian_split_squat",
            "exerciseName": "Bulgarian Split Squat",
            "sortOrder": 3,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_2_4",
            "exerciseId": "ex_leg_extension",
            "exerciseName": "Leg Extension",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_2_5",
            "exerciseId": "ex_leg_curl__lying_",
            "exerciseName": "Leg Curl (Lying)",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_2_6",
            "exerciseId": "ex_standing_calf_raise_machine",
            "exerciseName": "Standing Calf Raise Machine",
            "sortOrder": 6,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_2_7",
            "exerciseId": "ex_hanging_leg_raise",
            "exerciseName": "Hanging Leg Raise",
            "sortOrder": 7,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          }
        ]
      },
      {
        "id": "day_2_3",
        "name": "Upper B",
        "dayOfWeek": 3,
        "sortOrder": 3,
        "exercises": [
          {
            "id": "pe_3_1",
            "exerciseId": "ex_dumbbell_bench_press",
            "exerciseName": "Dumbbell Bench Press",
            "sortOrder": 1,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_3_2",
            "exerciseId": "ex_seated_cable_row__close_",
            "exerciseName": "Seated Cable Row (Close)",
            "sortOrder": 2,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_3_3",
            "exerciseId": "ex_seated_dumbbell_press",
            "exerciseName": "Seated Dumbbell Press",
            "sortOrder": 3,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_3_4",
            "exerciseId": "ex_pull_up__overhand_",
            "exerciseName": "Pull-Up (Overhand)",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_3_5",
            "exerciseId": "ex_dumbbell_lateral_raise",
            "exerciseName": "Dumbbell Lateral Raise",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_3_6",
            "exerciseId": "ex_incline_dumbbell_curl",
            "exerciseName": "Incline Dumbbell Curl",
            "sortOrder": 6,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_3_7",
            "exerciseId": "ex_overhead_extension__cable_",
            "exerciseName": "Overhead Extension (Cable)",
            "sortOrder": 7,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          }
        ]
      },
      {
        "id": "day_2_4",
        "name": "Lower B",
        "dayOfWeek": 4,
        "sortOrder": 4,
        "exercises": [
          {
            "id": "pe_4_1",
            "exerciseId": "ex_hack_squat_machine",
            "exerciseName": "Hack Squat Machine",
            "sortOrder": 1,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_4_2",
            "exerciseId": "ex_barbell_deadlift",
            "exerciseName": "Barbell Deadlift",
            "sortOrder": 2,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_4_3",
            "exerciseId": "ex_walking_lunge",
            "exerciseName": "Walking Lunge",
            "sortOrder": 3,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_4_4",
            "exerciseId": "ex_leg_extension",
            "exerciseName": "Leg Extension",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_4_5",
            "exerciseId": "ex_leg_curl__seated_",
            "exerciseName": "Leg Curl (Seated)",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_4_6",
            "exerciseId": "ex_seated_calf_raise",
            "exerciseName": "Seated Calf Raise",
            "sortOrder": 6,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          },
          {
            "id": "pe_4_7",
            "exerciseId": "ex_cable_crunch",
            "exerciseName": "Cable Crunch",
            "sortOrder": 7,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 45
          }
        ]
      }
    ]
  },
  {
    "id": "split_aesthetic",
    "userId": "user_1",
    "name": "Aesthetic PPL + Upper / Lower",
    "description": "5-day hybrid calisthenics and bodyweight progression split prioritizing core stability, shoulder health, and functional athleticism.",
    "isTemplate": true,
    "isActive": false,
    "createdAt": "2026-10-23T06:38:23.430016+00:00",
    "updatedAt": "2026-10-23T06:38:23.430016+00:00",
    "days": [
      {
        "id": "day_3_1",
        "name": "Push",
        "dayOfWeek": 1,
        "sortOrder": 1,
        "exercises": [
          {
            "id": "pe_1_1",
            "exerciseId": "ex_standard_push_up",
            "exerciseName": "Standard Push-Up",
            "sortOrder": 1,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_1_2",
            "exerciseId": "ex_pseudo_planche_push_up",
            "exerciseName": "Pseudo Planche Push-Up",
            "sortOrder": 2,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_1_3",
            "exerciseId": "ex_decline_push_up",
            "exerciseName": "Decline Push-Up",
            "sortOrder": 3,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_1_4",
            "exerciseId": "ex_wide_push_up",
            "exerciseName": "Wide Push-Up",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_1_5",
            "exerciseId": "ex_diamond_push_up",
            "exerciseName": "Diamond Push-Up",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_3_2",
        "name": "Pull",
        "dayOfWeek": 2,
        "sortOrder": 2,
        "exercises": [
          {
            "id": "pe_2_1",
            "exerciseId": "ex_pull_up__overhand_",
            "exerciseName": "Pull-Up (Overhand)",
            "sortOrder": 1,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_2_2",
            "exerciseId": "ex_chin_up__underhand_",
            "exerciseName": "Chin-Up (Underhand)",
            "sortOrder": 2,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_2_3",
            "exerciseId": "ex_hanging_leg_raise",
            "exerciseName": "Hanging Leg Raise",
            "sortOrder": 3,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_3_3",
        "name": "Legs",
        "dayOfWeek": 3,
        "sortOrder": 3,
        "exercises": [
          {
            "id": "pe_3_1",
            "exerciseId": "ex_bodyweight_squat",
            "exerciseName": "Bodyweight Squat",
            "sortOrder": 1,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_3_2",
            "exerciseId": "ex_glute_bridge__floor_",
            "exerciseName": "Glute Bridge (Floor)",
            "sortOrder": 2,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_3_3",
            "exerciseId": "ex_reverse_lunge",
            "exerciseName": "Reverse Lunge",
            "sortOrder": 3,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_3_4",
            "exerciseId": "ex_sissy_squat",
            "exerciseName": "Sissy Squat",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_3_5",
            "exerciseId": "ex_nordic_hamstring_curl",
            "exerciseName": "Nordic Hamstring Curl",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_3_4",
        "name": "Upper",
        "dayOfWeek": 4,
        "sortOrder": 4,
        "exercises": [
          {
            "id": "pe_4_1",
            "exerciseId": "ex_wide_push_up",
            "exerciseName": "Wide Push-Up",
            "sortOrder": 1,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_4_2",
            "exerciseId": "ex_pseudo_planche_push_up",
            "exerciseName": "Pseudo Planche Push-Up",
            "sortOrder": 2,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_4_3",
            "exerciseId": "ex_neutral_grip_pull_up",
            "exerciseName": "Neutral Grip Pull-Up",
            "sortOrder": 3,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_4_4",
            "exerciseId": "ex_chin_up__underhand_",
            "exerciseName": "Chin-Up (Underhand)",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_4_5",
            "exerciseId": "ex_diamond_push_up",
            "exerciseName": "Diamond Push-Up",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_3_5",
        "name": "Lower",
        "dayOfWeek": 5,
        "sortOrder": 5,
        "exercises": [
          {
            "id": "pe_5_1",
            "exerciseId": "ex_bodyweight_squat",
            "exerciseName": "Bodyweight Squat",
            "sortOrder": 1,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_5_2",
            "exerciseId": "ex_single_leg_hip_thrust",
            "exerciseName": "Single-Leg Hip Thrust",
            "sortOrder": 2,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_5_3",
            "exerciseId": "ex_bulgarian_split_squat",
            "exerciseName": "Bulgarian Split Squat",
            "sortOrder": 3,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90,
            "notes": "Starting weight: 5kg. Double progression."
          },
          {
            "id": "pe_5_4",
            "exerciseId": "ex_sissy_squat",
            "exerciseName": "Sissy Squat",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_5_5",
            "exerciseId": "ex_lying_leg_raise",
            "exerciseName": "Lying Leg Raise",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          }
        ]
      }
    ]
  },
  {
    "id": "split_vtaper",
    "userId": "user_1",
    "name": "V-Taper Push Pull Legs",
    "description": "6-day progressive hypertrophy split designed to maximize lat width, lateral delt roundness, and upper chest fullness for an aesthetic V-taper taper.",
    "isTemplate": true,
    "isActive": true,
    "createdAt": "2026-10-23T06:39:09.672173+00:00",
    "updatedAt": "2026-10-25T10:49:53.507+00:00",
    "days": [
      {
        "id": "day_4_1",
        "name": "Pull A",
        "dayOfWeek": 1,
        "sortOrder": 1,
        "exercises": [
          {
            "id": "pe_1_1",
            "exerciseId": "ex_lat_pulldown__wide_",
            "exerciseName": "Lat Pulldown (Wide)",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_1_2",
            "exerciseId": "ex_barbell_row__overhand_",
            "exerciseName": "Barbell Row (Overhand)",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_1_3",
            "exerciseId": "ex_seated_cable_row__close_",
            "exerciseName": "Seated Cable Row (Close)",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_1_4",
            "exerciseId": "ex_face_pull",
            "exerciseName": "Face Pull",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_1_5",
            "exerciseId": "ex_ez_bar_curl",
            "exerciseName": "EZ-Bar Curl",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_1_6",
            "exerciseId": "ex_hanging_leg_raise",
            "exerciseName": "Hanging Leg Raise",
            "sortOrder": 6,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_1_7",
            "exerciseId": "ex_overhead_extension__cable_",
            "exerciseName": "Overhead Extension (Cable)",
            "sortOrder": 7,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_4_2",
        "name": "Push A",
        "dayOfWeek": 2,
        "sortOrder": 2,
        "exercises": [
          {
            "id": "pe_2_1",
            "exerciseId": "ex_barbell_bench_press",
            "exerciseName": "Barbell Bench Press",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_2_2",
            "exerciseId": "ex_barbell_overhead_press",
            "exerciseName": "Barbell Overhead Press",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_2_3",
            "exerciseId": "ex_incline_dumbbell_press",
            "exerciseName": "Incline Dumbbell Press",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_2_4",
            "exerciseId": "ex_cable_crossover__mid_",
            "exerciseName": "Cable Crossover (Mid)",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_2_5",
            "exerciseId": "ex_cable_lateral_raise",
            "exerciseName": "Cable Lateral Raise",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_2_6",
            "exerciseId": "ex_rope_pushdown",
            "exerciseName": "Rope Pushdown",
            "sortOrder": 6,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_4_3",
        "name": "Legs A",
        "dayOfWeek": 3,
        "sortOrder": 3,
        "exercises": [
          {
            "id": "pe_3_1",
            "exerciseId": "ex_barbell_back_squat",
            "exerciseName": "Barbell Back Squat",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_3_2",
            "exerciseId": "ex_romanian_deadlift",
            "exerciseName": "Romanian Deadlift",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_3_3",
            "exerciseId": "ex_bulgarian_split_squat",
            "exerciseName": "Bulgarian Split Squat",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_3_4",
            "exerciseId": "ex_leg_extension",
            "exerciseName": "Leg Extension",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_3_5",
            "exerciseId": "ex_leg_curl__lying_",
            "exerciseName": "Leg Curl (Lying)",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_3_6",
            "exerciseId": "ex_standing_calf_raise_machine",
            "exerciseName": "Standing Calf Raise Machine",
            "sortOrder": 6,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_4_4",
        "name": "Push B",
        "dayOfWeek": 4,
        "sortOrder": 4,
        "exercises": [
          {
            "id": "pe_4_1",
            "exerciseId": "ex_dumbbell_bench_press",
            "exerciseName": "Dumbbell Bench Press",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_4_2",
            "exerciseId": "ex_seated_dumbbell_press",
            "exerciseName": "Seated Dumbbell Press",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_4_3",
            "exerciseId": "ex_incline_barbell_press",
            "exerciseName": "Incline Barbell Press",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_4_4",
            "exerciseId": "ex_pec_deck_machine",
            "exerciseName": "Pec Deck Machine",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_4_5",
            "exerciseId": "ex_dumbbell_lateral_raise",
            "exerciseName": "Dumbbell Lateral Raise",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_4_6",
            "exerciseId": "ex_rope_pushdown",
            "exerciseName": "Rope Pushdown",
            "sortOrder": 6,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_4_5",
        "name": "Pull B",
        "dayOfWeek": 5,
        "sortOrder": 5,
        "exercises": [
          {
            "id": "pe_5_1",
            "exerciseId": "ex_pull_up__overhand_",
            "exerciseName": "Pull-Up (Overhand)",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_5_2",
            "exerciseId": "ex_chest_supported_row",
            "exerciseName": "Chest-Supported Row",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_5_3",
            "exerciseId": "ex_barbell_row__overhand_",
            "exerciseName": "Barbell Row (Overhand)",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_5_4",
            "exerciseId": "ex_reverse_pec_deck",
            "exerciseName": "Reverse Pec Deck",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_5_5",
            "exerciseId": "ex_incline_dumbbell_curl",
            "exerciseName": "Incline Dumbbell Curl",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_5_6",
            "exerciseId": "ex_cable_crunch",
            "exerciseName": "Cable Crunch",
            "sortOrder": 6,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_5_7",
            "exerciseId": "ex_overhead_extension__cable_",
            "exerciseName": "Overhead Extension (Cable)",
            "sortOrder": 7,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_4_6",
        "name": "Legs B",
        "dayOfWeek": 6,
        "sortOrder": 6,
        "exercises": [
          {
            "id": "pe_6_1",
            "exerciseId": "ex_hack_squat_machine",
            "exerciseName": "Hack Squat Machine",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_6_2",
            "exerciseId": "ex_barbell_deadlift",
            "exerciseName": "Barbell Deadlift",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_6_3",
            "exerciseId": "ex_walking_lunge",
            "exerciseName": "Walking Lunge",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_6_4",
            "exerciseId": "ex_leg_extension",
            "exerciseName": "Leg Extension",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_6_5",
            "exerciseId": "ex_leg_curl__seated_",
            "exerciseName": "Leg Curl (Seated)",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_6_6",
            "exerciseId": "ex_seated_calf_raise",
            "exerciseName": "Seated Calf Raise",
            "sortOrder": 6,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          }
        ]
      }
    ],
    "category": "PPL",
    "frequencyDays": 6,
    "level": "Advanced",
    "tags": [
      "V-Taper",
      "Hypertrophy",
      "Lat Focus"
    ]
  },
  {
    "id": "split_arnold",
    "userId": "user_1",
    "name": "Arnold Golden Era Split",
    "description": "Arnold Schwarzenegger's classic high-volume antagonistic superset split. Pairs chest & back, shoulders & arms, and legs & abs for legendary pump and mass.",
    "isTemplate": true,
    "isActive": false,
    "category": "Arnold",
    "frequencyDays": 6,
    "level": "Advanced",
    "tags": [
      "Golden Era",
      "Antagonist Supersets",
      "High Volume",
      "6-Day"
    ],
    "createdAt": "2026-10-25T11:38:34.278Z",
    "updatedAt": "2026-10-25T11:38:34.279Z",
    "days": [
      {
        "id": "day_arnold_1",
        "name": "Chest & Back (Antagonist Volume)",
        "dayOfWeek": 1,
        "sortOrder": 1,
        "exercises": [
          {
            "id": "pe_a1_1",
            "exerciseId": "ex_barbell_bench_press",
            "exerciseName": "Barbell Bench Press",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 90
          },
          {
            "id": "pe_a1_2",
            "exerciseId": "ex_wide_grip_lat_pulldown",
            "exerciseName": "Wide-Grip Lat Pulldown",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_a1_3",
            "exerciseId": "ex_incline_dumbbell_press",
            "exerciseName": "Incline Dumbbell Press",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_a1_4",
            "exerciseId": "ex_bent_over_barbell_row",
            "exerciseName": "Bent-Over Barbell Row",
            "sortOrder": 4,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 90
          },
          {
            "id": "pe_a1_5",
            "exerciseId": "ex_dumbbell_pullover",
            "exerciseName": "Dumbbell Pullover",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          },
          {
            "id": "pe_a1_6",
            "exerciseId": "ex_cable_chest_fly",
            "exerciseName": "Cable Chest Fly",
            "sortOrder": 6,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_arnold_2",
        "name": "Shoulders & Arms (The Ultimate Pump)",
        "dayOfWeek": 2,
        "sortOrder": 2,
        "exercises": [
          {
            "id": "pe_a2_1",
            "exerciseId": "ex_barbell_overhead_press",
            "exerciseName": "Barbell Overhead Press",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 90
          },
          {
            "id": "pe_a2_2",
            "exerciseId": "ex_dumbbell_lateral_raise",
            "exerciseName": "Dumbbell Lateral Raise",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          },
          {
            "id": "pe_a2_3",
            "exerciseId": "ex_barbell_bicep_curl",
            "exerciseName": "Barbell Bicep Curl",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 75
          },
          {
            "id": "pe_a2_4",
            "exerciseId": "ex_skull_crusher",
            "exerciseName": "Skull Crusher (Lying Triceps Extension)",
            "sortOrder": 4,
            "targetSets": 4,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 75
          },
          {
            "id": "pe_a2_5",
            "exerciseId": "ex_incline_dumbbell_curl",
            "exerciseName": "Incline Dumbbell Curl",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_a2_6",
            "exerciseId": "ex_tricep_rope_pushdown",
            "exerciseName": "Tricep Rope Pushdown",
            "sortOrder": 6,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_arnold_3",
        "name": "Legs & Abs (Heavy Compound Wheels)",
        "dayOfWeek": 3,
        "sortOrder": 3,
        "exercises": [
          {
            "id": "pe_a3_1",
            "exerciseId": "ex_barbell_back_squat",
            "exerciseName": "Barbell Back Squat",
            "sortOrder": 1,
            "targetSets": 5,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 120
          },
          {
            "id": "pe_a3_2",
            "exerciseId": "ex_romanian_deadlift",
            "exerciseName": "Romanian Deadlift",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 90
          },
          {
            "id": "pe_a3_3",
            "exerciseId": "ex_leg_press",
            "exerciseName": "Leg Press",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_a3_4",
            "exerciseId": "ex_lying_leg_curl",
            "exerciseName": "Lying Leg Curl",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          },
          {
            "id": "pe_a3_5",
            "exerciseId": "ex_standing_calf_raise",
            "exerciseName": "Standing Calf Raise",
            "sortOrder": 5,
            "targetSets": 4,
            "targetRepsMin": 15,
            "targetRepsMax": 20,
            "restSeconds": 60
          },
          {
            "id": "pe_a3_6",
            "exerciseId": "ex_hanging_leg_raise",
            "exerciseName": "Hanging Leg Raise",
            "sortOrder": 6,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_arnold_4",
        "name": "Chest & Back (Density & Lat Stretch)",
        "dayOfWeek": 4,
        "sortOrder": 4,
        "exercises": [
          {
            "id": "pe_a4_1",
            "exerciseId": "ex_incline_barbell_bench_press",
            "exerciseName": "Incline Barbell Bench Press",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 90
          },
          {
            "id": "pe_a4_2",
            "exerciseId": "ex_pull_up",
            "exerciseName": "Weighted Pull-Up",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 6,
            "targetRepsMax": 10,
            "restSeconds": 90
          },
          {
            "id": "pe_a4_3",
            "exerciseId": "ex_flat_dumbbell_press",
            "exerciseName": "Flat Dumbbell Press",
            "sortOrder": 3,
            "targetSets": 3,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_a4_4",
            "exerciseId": "ex_seated_cable_row",
            "exerciseName": "Seated Cable Row (Close Grip)",
            "sortOrder": 4,
            "targetSets": 4,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 75
          },
          {
            "id": "pe_a4_5",
            "exerciseId": "ex_pec_deck_fly",
            "exerciseName": "Pec Deck Fly",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          },
          {
            "id": "pe_a4_6",
            "exerciseId": "ex_t_bar_row",
            "exerciseName": "T-Bar Row",
            "sortOrder": 6,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 75
          }
        ]
      },
      {
        "id": "day_arnold_5",
        "name": "Shoulders & Arms (Detail & Deltoid Width)",
        "dayOfWeek": 5,
        "sortOrder": 5,
        "exercises": [
          {
            "id": "pe_a5_1",
            "exerciseId": "ex_seated_dumbbell_shoulder_press",
            "exerciseName": "Seated Dumbbell Shoulder Press",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_a5_2",
            "exerciseId": "ex_cable_lateral_raise",
            "exerciseName": "Cable Lateral Raise",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          },
          {
            "id": "pe_a5_3",
            "exerciseId": "ex_face_pull",
            "exerciseName": "Face Pull",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          },
          {
            "id": "pe_a5_4",
            "exerciseId": "ex_preacher_curl",
            "exerciseName": "EZ-Bar Preacher Curl",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_a5_5",
            "exerciseId": "ex_overhead_cable_triceps_ext",
            "exerciseName": "Overhead Cable Triceps Extension",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_a5_6",
            "exerciseId": "ex_hammer_curl",
            "exerciseName": "Dumbbell Hammer Curl",
            "sortOrder": 6,
            "targetSets": 3,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_arnold_6",
        "name": "Legs & Core (Quad Sweep & Calves)",
        "dayOfWeek": 6,
        "sortOrder": 6,
        "exercises": [
          {
            "id": "pe_a6_1",
            "exerciseId": "ex_front_squat",
            "exerciseName": "Barbell Front Squat",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 120
          },
          {
            "id": "pe_a6_2",
            "exerciseId": "ex_bulgarian_split_squat",
            "exerciseName": "Bulgarian Split Squat",
            "sortOrder": 2,
            "targetSets": 3,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_a6_3",
            "exerciseId": "ex_leg_extension",
            "exerciseName": "Leg Extension (Quad Burn)",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          },
          {
            "id": "pe_a6_4",
            "exerciseId": "ex_seated_leg_curl",
            "exerciseName": "Seated Leg Curl",
            "sortOrder": 4,
            "targetSets": 4,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_a6_5",
            "exerciseId": "ex_seated_calf_raise",
            "exerciseName": "Seated Calf Raise",
            "sortOrder": 5,
            "targetSets": 4,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          },
          {
            "id": "pe_a6_6",
            "exerciseId": "ex_cable_woodchopper",
            "exerciseName": "Cable Ab Crunch",
            "sortOrder": 6,
            "targetSets": 3,
            "targetRepsMin": 15,
            "targetRepsMax": 20,
            "restSeconds": 60
          }
        ]
      }
    ]
  },
  {
    "id": "split_bro",
    "userId": "user_1",
    "name": "Classic Bodybuilding Bro Split",
    "description": "The time-tested single muscle group focus routine. Dedicate maximum intensity and volume to one primary body part per workout with 7 full days of recovery.",
    "isTemplate": true,
    "isActive": false,
    "category": "Bro Split",
    "frequencyDays": 5,
    "level": "Intermediate",
    "tags": [
      "Bodybuilding",
      "Single Muscle Focus",
      "High Intensity",
      "5-Day"
    ],
    "createdAt": "2026-10-25T11:38:34.279Z",
    "updatedAt": "2026-10-25T11:38:34.279Z",
    "days": [
      {
        "id": "day_bro_1",
        "name": "Chest Day (Pecs Annihilation)",
        "dayOfWeek": 1,
        "sortOrder": 1,
        "exercises": [
          {
            "id": "pe_b1_1",
            "exerciseId": "ex_barbell_bench_press",
            "exerciseName": "Flat Barbell Bench Press",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 90
          },
          {
            "id": "pe_b1_2",
            "exerciseId": "ex_incline_dumbbell_press",
            "exerciseName": "Incline Dumbbell Press",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_b1_3",
            "exerciseId": "ex_pec_deck_fly",
            "exerciseName": "Pec Deck Machine Fly",
            "sortOrder": 3,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          },
          {
            "id": "pe_b1_4",
            "exerciseId": "ex_dips",
            "exerciseName": "Chest Dips (Forward Lean)",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 75
          },
          {
            "id": "pe_b1_5",
            "exerciseId": "ex_cable_crossover",
            "exerciseName": "Low-to-High Cable Crossover",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_bro_2",
        "name": "Back Day (Width & Thickness)",
        "dayOfWeek": 2,
        "sortOrder": 2,
        "exercises": [
          {
            "id": "pe_b2_1",
            "exerciseId": "ex_barbell_deadlift",
            "exerciseName": "Conventional Barbell Deadlift",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 5,
            "targetRepsMax": 8,
            "restSeconds": 150
          },
          {
            "id": "pe_b2_2",
            "exerciseId": "ex_lat_pulldown",
            "exerciseName": "Wide Lat Pulldown",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_b2_3",
            "exerciseId": "ex_bent_over_barbell_row",
            "exerciseName": "Bent-Over Barbell Row",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 90
          },
          {
            "id": "pe_b2_4",
            "exerciseId": "ex_seated_cable_row",
            "exerciseName": "Seated Cable Row (Close V-Grip)",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 75
          },
          {
            "id": "pe_b2_5",
            "exerciseId": "ex_straight_arm_pulldown",
            "exerciseName": "Straight-Arm Lat Pulldown",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_bro_3",
        "name": "Shoulders & Traps (3D Delts)",
        "dayOfWeek": 3,
        "sortOrder": 3,
        "exercises": [
          {
            "id": "pe_b3_1",
            "exerciseId": "ex_overhead_press",
            "exerciseName": "Standing Barbell Overhead Press",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 6,
            "targetRepsMax": 8,
            "restSeconds": 120
          },
          {
            "id": "pe_b3_2",
            "exerciseId": "ex_dumbbell_lateral_raise",
            "exerciseName": "Dumbbell Lateral Raise",
            "sortOrder": 2,
            "targetSets": 5,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          },
          {
            "id": "pe_b3_3",
            "exerciseId": "ex_face_pull",
            "exerciseName": "Rope Face Pull (Rear Delts)",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          },
          {
            "id": "pe_b3_4",
            "exerciseId": "ex_front_plate_raise",
            "exerciseName": "Front Plate Raise",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_b3_5",
            "exerciseId": "ex_dumbbell_shrug",
            "exerciseName": "Heavy Dumbbell Shrugs",
            "sortOrder": 5,
            "targetSets": 4,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_bro_4",
        "name": "Leg Day (Quads, Hams & Calves)",
        "dayOfWeek": 4,
        "sortOrder": 4,
        "exercises": [
          {
            "id": "pe_b4_1",
            "exerciseId": "ex_barbell_back_squat",
            "exerciseName": "Barbell Back Squat",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 6,
            "targetRepsMax": 10,
            "restSeconds": 120
          },
          {
            "id": "pe_b4_2",
            "exerciseId": "ex_romanian_deadlift",
            "exerciseName": "Romanian Deadlift (Hamstrings)",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 90
          },
          {
            "id": "pe_b4_3",
            "exerciseId": "ex_leg_press",
            "exerciseName": "45-Degree Leg Press",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_b4_4",
            "exerciseId": "ex_leg_extension",
            "exerciseName": "Leg Extension",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          },
          {
            "id": "pe_b4_5",
            "exerciseId": "ex_lying_leg_curl",
            "exerciseName": "Lying Leg Curl",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_b4_6",
            "exerciseId": "ex_standing_calf_raise",
            "exerciseName": "Standing Machine Calf Raise",
            "sortOrder": 6,
            "targetSets": 4,
            "targetRepsMin": 15,
            "targetRepsMax": 20,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_bro_5",
        "name": "Arm Day & Abs (Guns & Core)",
        "dayOfWeek": 5,
        "sortOrder": 5,
        "exercises": [
          {
            "id": "pe_b5_1",
            "exerciseId": "ex_barbell_curl",
            "exerciseName": "Standing Barbell Bicep Curl",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 75
          },
          {
            "id": "pe_b5_2",
            "exerciseId": "ex_skull_crusher",
            "exerciseName": "EZ-Bar Skull Crusher",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 75
          },
          {
            "id": "pe_b5_3",
            "exerciseId": "ex_incline_dumbbell_curl",
            "exerciseName": "Incline Dumbbell Bicep Curl",
            "sortOrder": 3,
            "targetSets": 3,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_b5_4",
            "exerciseId": "ex_tricep_pushdown",
            "exerciseName": "Tricep Cable Pushdown",
            "sortOrder": 4,
            "targetSets": 4,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_b5_5",
            "exerciseId": "ex_hammer_curl",
            "exerciseName": "Standing Dumbbell Hammer Curl",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_b5_6",
            "exerciseId": "ex_hanging_leg_raise",
            "exerciseName": "Hanging Leg Raise",
            "sortOrder": 6,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          }
        ]
      }
    ]
  },
  {
    "id": "split_upper_lower",
    "userId": "user_1",
    "name": "Upper / Lower Power & Hypertrophy",
    "description": "The gold-standard 4-day split for busy lifters. Alternates heavy strength compound lifting with targeted hypertrophy volume for maximum athletic longevity.",
    "isTemplate": true,
    "isActive": false,
    "category": "Upper/Lower",
    "frequencyDays": 4,
    "level": "Intermediate",
    "tags": [
      "Upper/Lower",
      "Power & Hypertrophy",
      "4-Day",
      "Strength"
    ],
    "createdAt": "2026-10-25T11:38:34.279Z",
    "updatedAt": "2026-10-25T11:38:34.279Z",
    "days": [
      {
        "id": "day_ul_1",
        "name": "Upper Body Power",
        "dayOfWeek": 1,
        "sortOrder": 1,
        "exercises": [
          {
            "id": "pe_ul1_1",
            "exerciseId": "ex_barbell_bench_press",
            "exerciseName": "Barbell Bench Press (Heavy 5x5)",
            "sortOrder": 1,
            "targetSets": 5,
            "targetRepsMin": 5,
            "targetRepsMax": 5,
            "restSeconds": 150
          },
          {
            "id": "pe_ul1_2",
            "exerciseId": "ex_bent_over_barbell_row",
            "exerciseName": "Bent-Over Barbell Row",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 6,
            "targetRepsMax": 8,
            "restSeconds": 120
          },
          {
            "id": "pe_ul1_3",
            "exerciseId": "ex_barbell_overhead_press",
            "exerciseName": "Barbell Overhead Press",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 6,
            "targetRepsMax": 8,
            "restSeconds": 90
          },
          {
            "id": "pe_ul1_4",
            "exerciseId": "ex_pull_up",
            "exerciseName": "Weighted Pull-Up",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 6,
            "targetRepsMax": 8,
            "restSeconds": 90
          },
          {
            "id": "pe_ul1_5",
            "exerciseId": "ex_barbell_curl",
            "exerciseName": "Barbell Bicep Curl",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 60
          },
          {
            "id": "pe_ul1_6",
            "exerciseId": "ex_skull_crusher",
            "exerciseName": "Skull Crusher",
            "sortOrder": 6,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_ul_2",
        "name": "Lower Body Power",
        "dayOfWeek": 2,
        "sortOrder": 2,
        "exercises": [
          {
            "id": "pe_ul2_1",
            "exerciseId": "ex_barbell_back_squat",
            "exerciseName": "Barbell Back Squat (Heavy 5x5)",
            "sortOrder": 1,
            "targetSets": 5,
            "targetRepsMin": 5,
            "targetRepsMax": 5,
            "restSeconds": 180
          },
          {
            "id": "pe_ul2_2",
            "exerciseId": "ex_romanian_deadlift",
            "exerciseName": "Romanian Deadlift",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 6,
            "targetRepsMax": 8,
            "restSeconds": 120
          },
          {
            "id": "pe_ul2_3",
            "exerciseId": "ex_leg_press",
            "exerciseName": "Leg Press",
            "sortOrder": 3,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 90
          },
          {
            "id": "pe_ul2_4",
            "exerciseId": "ex_lying_leg_curl",
            "exerciseName": "Lying Leg Curl",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 60
          },
          {
            "id": "pe_ul2_5",
            "exerciseId": "ex_standing_calf_raise",
            "exerciseName": "Standing Calf Raise",
            "sortOrder": 5,
            "targetSets": 4,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_ul2_6",
            "exerciseId": "ex_hanging_leg_raise",
            "exerciseName": "Hanging Leg Raise",
            "sortOrder": 6,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_ul_3",
        "name": "Upper Body Hypertrophy",
        "dayOfWeek": 4,
        "sortOrder": 3,
        "exercises": [
          {
            "id": "pe_ul3_1",
            "exerciseId": "ex_incline_dumbbell_press",
            "exerciseName": "Incline Dumbbell Press",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_ul3_2",
            "exerciseId": "ex_lat_pulldown",
            "exerciseName": "Wide-Grip Lat Pulldown",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 75
          },
          {
            "id": "pe_ul3_3",
            "exerciseId": "ex_dumbbell_lateral_raise",
            "exerciseName": "Cable Lateral Raise",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          },
          {
            "id": "pe_ul3_4",
            "exerciseId": "ex_seated_cable_row",
            "exerciseName": "Seated Cable Row",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 75
          },
          {
            "id": "pe_ul3_5",
            "exerciseId": "ex_incline_dumbbell_curl",
            "exerciseName": "Incline Dumbbell Curl",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_ul3_6",
            "exerciseId": "ex_tricep_rope_pushdown",
            "exerciseName": "Tricep Rope Pushdown",
            "sortOrder": 6,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_ul_4",
        "name": "Lower Body Hypertrophy",
        "dayOfWeek": 5,
        "sortOrder": 4,
        "exercises": [
          {
            "id": "pe_ul4_1",
            "exerciseId": "ex_front_squat",
            "exerciseName": "Barbell Front Squat",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 120
          },
          {
            "id": "pe_ul4_2",
            "exerciseId": "ex_walking_lunge",
            "exerciseName": "Dumbbell Walking Lunge",
            "sortOrder": 2,
            "targetSets": 3,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_ul4_3",
            "exerciseId": "ex_leg_extension",
            "exerciseName": "Leg Extension",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          },
          {
            "id": "pe_ul4_4",
            "exerciseId": "ex_seated_leg_curl",
            "exerciseName": "Seated Hamstring Curl",
            "sortOrder": 4,
            "targetSets": 4,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          },
          {
            "id": "pe_ul4_5",
            "exerciseId": "ex_seated_calf_raise",
            "exerciseName": "Seated Calf Raise",
            "sortOrder": 5,
            "targetSets": 4,
            "targetRepsMin": 15,
            "targetRepsMax": 20,
            "restSeconds": 60
          },
          {
            "id": "pe_ul4_6",
            "exerciseId": "ex_cable_woodchopper",
            "exerciseName": "Cable Crunch",
            "sortOrder": 6,
            "targetSets": 3,
            "targetRepsMin": 15,
            "targetRepsMax": 20,
            "restSeconds": 60
          }
        ]
      }
    ]
  },
  {
    "id": "split_full_body_3day",
    "userId": "user_1",
    "name": "Full Body Compound Foundation",
    "description": "High-frequency 3-day split ideal for natural lifters, busy schedules, or beginner-to-intermediate athletes. Stimulates every muscle group 3x weekly with high recovery.",
    "isTemplate": true,
    "isActive": false,
    "category": "Full Body",
    "frequencyDays": 3,
    "level": "Beginner",
    "tags": [
      "Full Body",
      "3-Day",
      "Efficiency",
      "High Frequency"
    ],
    "createdAt": "2026-10-25T11:38:34.279Z",
    "updatedAt": "2026-10-25T11:38:34.279Z",
    "days": [
      {
        "id": "day_fb_1",
        "name": "Full Body A (Squat & Press Focus)",
        "dayOfWeek": 1,
        "sortOrder": 1,
        "exercises": [
          {
            "id": "pe_fb1_1",
            "exerciseId": "ex_barbell_back_squat",
            "exerciseName": "Barbell Back Squat",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 6,
            "targetRepsMax": 8,
            "restSeconds": 120
          },
          {
            "id": "pe_fb1_2",
            "exerciseId": "ex_barbell_bench_press",
            "exerciseName": "Barbell Bench Press",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 6,
            "targetRepsMax": 8,
            "restSeconds": 120
          },
          {
            "id": "pe_fb1_3",
            "exerciseId": "ex_bent_over_barbell_row",
            "exerciseName": "Bent-Over Barbell Row",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 90
          },
          {
            "id": "pe_fb1_4",
            "exerciseId": "ex_dumbbell_lateral_raise",
            "exerciseName": "Dumbbell Lateral Raise",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          },
          {
            "id": "pe_fb1_5",
            "exerciseId": "ex_tricep_pushdown",
            "exerciseName": "Tricep Pushdown",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_fb_2",
        "name": "Full Body B (Deadlift & Overhead Focus)",
        "dayOfWeek": 3,
        "sortOrder": 2,
        "exercises": [
          {
            "id": "pe_fb2_1",
            "exerciseId": "ex_barbell_deadlift",
            "exerciseName": "Barbell Conventional Deadlift",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 5,
            "targetRepsMax": 6,
            "restSeconds": 150
          },
          {
            "id": "pe_fb2_2",
            "exerciseId": "ex_barbell_overhead_press",
            "exerciseName": "Standing Barbell Overhead Press",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 6,
            "targetRepsMax": 8,
            "restSeconds": 120
          },
          {
            "id": "pe_fb2_3",
            "exerciseId": "ex_lat_pulldown",
            "exerciseName": "Lat Pulldown (Neutral Grip)",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_fb2_4",
            "exerciseId": "ex_incline_dumbbell_press",
            "exerciseName": "Incline Dumbbell Press",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_fb2_5",
            "exerciseId": "ex_barbell_curl",
            "exerciseName": "Barbell Bicep Curl",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_fb_3",
        "name": "Full Body C (Leg Press & Hypertrophy)",
        "dayOfWeek": 5,
        "sortOrder": 3,
        "exercises": [
          {
            "id": "pe_fb3_1",
            "exerciseId": "ex_leg_press",
            "exerciseName": "45-Degree Leg Press",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_fb3_2",
            "exerciseId": "ex_romanian_deadlift",
            "exerciseName": "Romanian Deadlift",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 90
          },
          {
            "id": "pe_fb3_3",
            "exerciseId": "ex_dips",
            "exerciseName": "Bodyweight or Weighted Dips",
            "sortOrder": 3,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_fb3_4",
            "exerciseId": "ex_seated_cable_row",
            "exerciseName": "Seated Cable Row",
            "sortOrder": 4,
            "targetSets": 4,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 75
          },
          {
            "id": "pe_fb3_5",
            "exerciseId": "ex_face_pull",
            "exerciseName": "Face Pull",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          },
          {
            "id": "pe_fb3_6",
            "exerciseId": "ex_standing_calf_raise",
            "exerciseName": "Standing Calf Raise",
            "sortOrder": 6,
            "targetSets": 4,
            "targetRepsMin": 15,
            "targetRepsMax": 20,
            "restSeconds": 60
          }
        ]
      }
    ]
  },
  {
    "id": "split_powerbuilding_5x5",
    "userId": "user_1",
    "name": "Powerbuilding 5x5 Overload",
    "description": "Hybrid raw powerlifting and hypertrophy program. Builds unstoppable 1RM strength in the Big 3 (Squat, Bench, Deadlift) followed by targeted bodybuilding accessory pumps.",
    "isTemplate": true,
    "isActive": false,
    "category": "Powerbuilding",
    "frequencyDays": 4,
    "level": "Advanced",
    "tags": [
      "Powerbuilding",
      "5x5 Strength",
      "Heavy Compounds",
      "4-Day"
    ],
    "createdAt": "2026-10-25T11:38:34.279Z",
    "updatedAt": "2026-10-25T11:38:34.279Z",
    "days": [
      {
        "id": "day_pb_1",
        "name": "Heavy Bench & Chest Overload",
        "dayOfWeek": 1,
        "sortOrder": 1,
        "exercises": [
          {
            "id": "pe_pb1_1",
            "exerciseId": "ex_barbell_bench_press",
            "exerciseName": "Barbell Bench Press (5x5 Progressive)",
            "sortOrder": 1,
            "targetSets": 5,
            "targetRepsMin": 5,
            "targetRepsMax": 5,
            "restSeconds": 180
          },
          {
            "id": "pe_pb1_2",
            "exerciseId": "ex_close_grip_bench_press",
            "exerciseName": "Close-Grip Bench Press",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 6,
            "targetRepsMax": 8,
            "restSeconds": 120
          },
          {
            "id": "pe_pb1_3",
            "exerciseId": "ex_incline_dumbbell_press",
            "exerciseName": "Incline Dumbbell Bench Press",
            "sortOrder": 3,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 90
          },
          {
            "id": "pe_pb1_4",
            "exerciseId": "ex_cable_chest_fly",
            "exerciseName": "Cable Pec Fly",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          },
          {
            "id": "pe_pb1_5",
            "exerciseId": "ex_tricep_pushdown",
            "exerciseName": "Overhead Rope Tricep Extension",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_pb_2",
        "name": "Heavy Squat & Quad Dominance",
        "dayOfWeek": 2,
        "sortOrder": 2,
        "exercises": [
          {
            "id": "pe_pb1_2",
            "exerciseId": "ex_barbell_back_squat",
            "exerciseName": "Barbell Back Squat (5x5 Progressive)",
            "sortOrder": 1,
            "targetSets": 5,
            "targetRepsMin": 5,
            "targetRepsMax": 5,
            "restSeconds": 180
          },
          {
            "id": "pe_pb2_2",
            "exerciseId": "ex_front_squat",
            "exerciseName": "Barbell Front Squat",
            "sortOrder": 2,
            "targetSets": 3,
            "targetRepsMin": 6,
            "targetRepsMax": 8,
            "restSeconds": 120
          },
          {
            "id": "pe_pb2_3",
            "exerciseId": "ex_walking_lunge",
            "exerciseName": "Walking Barbell Lunges",
            "sortOrder": 3,
            "targetSets": 3,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_pb2_4",
            "exerciseId": "ex_leg_extension",
            "exerciseName": "Leg Extension",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          },
          {
            "id": "pe_pb2_5",
            "exerciseId": "ex_hanging_leg_raise",
            "exerciseName": "Hanging Leg Raise (Abs)",
            "sortOrder": 5,
            "targetSets": 4,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_pb_3",
        "name": "Heavy Overhead Press & Upper Back",
        "dayOfWeek": 4,
        "sortOrder": 3,
        "exercises": [
          {
            "id": "pe_pb3_1",
            "exerciseId": "ex_barbell_overhead_press",
            "exerciseName": "Barbell Overhead Press (5x5)",
            "sortOrder": 1,
            "targetSets": 5,
            "targetRepsMin": 5,
            "targetRepsMax": 5,
            "restSeconds": 180
          },
          {
            "id": "pe_pb3_2",
            "exerciseId": "ex_pull_up",
            "exerciseName": "Weighted Pull-Up",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 5,
            "targetRepsMax": 6,
            "restSeconds": 120
          },
          {
            "id": "pe_pb3_3",
            "exerciseId": "ex_bent_over_barbell_row",
            "exerciseName": "Pendlay Barbell Row",
            "sortOrder": 3,
            "targetSets": 4,
            "targetRepsMin": 6,
            "targetRepsMax": 8,
            "restSeconds": 120
          },
          {
            "id": "pe_pb3_4",
            "exerciseId": "ex_dumbbell_lateral_raise",
            "exerciseName": "Dumbbell Lateral Raise",
            "sortOrder": 4,
            "targetSets": 4,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          },
          {
            "id": "pe_pb3_5",
            "exerciseId": "ex_barbell_curl",
            "exerciseName": "Heavy Barbell Bicep Curl",
            "sortOrder": 5,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_pb_4",
        "name": "Heavy Deadlift & Posterior Chain",
        "dayOfWeek": 5,
        "sortOrder": 4,
        "exercises": [
          {
            "id": "pe_pb4_1",
            "exerciseId": "ex_barbell_deadlift",
            "exerciseName": "Conventional Barbell Deadlift (1x5 + 3x5)",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 5,
            "targetRepsMax": 5,
            "restSeconds": 210
          },
          {
            "id": "pe_pb4_2",
            "exerciseId": "ex_romanian_deadlift",
            "exerciseName": "Romanian Deadlift",
            "sortOrder": 2,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 120
          },
          {
            "id": "pe_pb4_3",
            "exerciseId": "ex_lying_leg_curl",
            "exerciseName": "Lying Hamstring Curl",
            "sortOrder": 3,
            "targetSets": 3,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_pb4_4",
            "exerciseId": "ex_dumbbell_shrug",
            "exerciseName": "Heavy Barbell Shrugs",
            "sortOrder": 4,
            "targetSets": 4,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_pb4_5",
            "exerciseId": "ex_standing_calf_raise",
            "exerciseName": "Standing Calf Raise",
            "sortOrder": 5,
            "targetSets": 4,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          }
        ]
      }
    ]
  },
  {
    "id": "split_calisthenics",
    "userId": "user_1",
    "name": "Calisthenics & Bodyweight Mastery",
    "description": "Gymnastics strength and bodyweight hypertrophy. Leverages straight-arm strength, planche progressions, weighted pull-ups, dips, and pistol squats.",
    "isTemplate": true,
    "isActive": false,
    "category": "Calisthenics",
    "frequencyDays": 4,
    "level": "Advanced",
    "tags": [
      "Calisthenics",
      "Bodyweight",
      "Skill",
      "4-Day"
    ],
    "createdAt": "2026-10-25T11:38:34.279Z",
    "updatedAt": "2026-10-25T11:38:34.279Z",
    "days": [
      {
        "id": "day_cal_1",
        "name": "Upper Body Push (Planche & Dips)",
        "dayOfWeek": 1,
        "sortOrder": 1,
        "exercises": [
          {
            "id": "pe_c1_1",
            "exerciseId": "ex_pseudo_planche_pushup",
            "exerciseName": "Pseudo Planche Push-Up",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 90
          },
          {
            "id": "pe_c1_2",
            "exerciseId": "ex_dips",
            "exerciseName": "Parallel Bar Dips (Weighted)",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 12,
            "restSeconds": 90
          },
          {
            "id": "pe_c1_3",
            "exerciseId": "ex_pike_push_up",
            "exerciseName": "Elevated Pike Push-Up (HSPU Prep)",
            "sortOrder": 3,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 90
          },
          {
            "id": "pe_c1_4",
            "exerciseId": "ex_pushup",
            "exerciseName": "Diamond Push-Ups (Triceps)",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 12,
            "targetRepsMax": 15,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_cal_2",
        "name": "Upper Body Pull (Muscle-Up & Lever)",
        "dayOfWeek": 2,
        "sortOrder": 2,
        "exercises": [
          {
            "id": "pe_c2_1",
            "exerciseId": "ex_pull_up",
            "exerciseName": "Weighted Pull-Up",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 6,
            "targetRepsMax": 8,
            "restSeconds": 120
          },
          {
            "id": "pe_c2_2",
            "exerciseId": "ex_chin_up",
            "exerciseName": "Strict Chin-Ups (Bicep Overload)",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 90
          },
          {
            "id": "pe_c2_3",
            "exerciseId": "ex_inverted_row",
            "exerciseName": "Inverted Bodyweight Rows",
            "sortOrder": 3,
            "targetSets": 3,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 75
          },
          {
            "id": "pe_c2_4",
            "exerciseId": "ex_front_lever_tuck",
            "exerciseName": "Tuck Front Lever Hold (Seconds)",
            "sortOrder": 4,
            "targetSets": 4,
            "targetRepsMin": 15,
            "targetRepsMax": 20,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_cal_3",
        "name": "Lower Body & Core (Pistols & L-Sit)",
        "dayOfWeek": 4,
        "sortOrder": 3,
        "exercises": [
          {
            "id": "pe_c3_1",
            "exerciseId": "ex_pistol_squat",
            "exerciseName": "Pistol Squats (Single Leg)",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 6,
            "targetRepsMax": 8,
            "restSeconds": 90
          },
          {
            "id": "pe_c3_2",
            "exerciseId": "ex_nordic_curl",
            "exerciseName": "Nordic Hamstring Curl",
            "sortOrder": 2,
            "targetSets": 4,
            "targetRepsMin": 6,
            "targetRepsMax": 8,
            "restSeconds": 90
          },
          {
            "id": "pe_c3_3",
            "exerciseId": "ex_sissy_squat",
            "exerciseName": "Bodyweight Sissy Squat",
            "sortOrder": 3,
            "targetSets": 3,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 60
          },
          {
            "id": "pe_c3_4",
            "exerciseId": "ex_hanging_leg_raise",
            "exerciseName": "Hanging Leg Raise (Strict L-Sit)",
            "sortOrder": 4,
            "targetSets": 4,
            "targetRepsMin": 10,
            "targetRepsMax": 12,
            "restSeconds": 60
          }
        ]
      },
      {
        "id": "day_cal_4",
        "name": "Full Body Skills & Conditioning",
        "dayOfWeek": 5,
        "sortOrder": 4,
        "exercises": [
          {
            "id": "pe_c4_1",
            "exerciseId": "ex_handstand_push_up",
            "exerciseName": "Wall Handstand Push-Ups",
            "sortOrder": 1,
            "targetSets": 4,
            "targetRepsMin": 5,
            "targetRepsMax": 8,
            "restSeconds": 120
          },
          {
            "id": "pe_c4_2",
            "exerciseId": "ex_archer_pullup",
            "exerciseName": "Archer Pull-Ups",
            "sortOrder": 2,
            "targetSets": 3,
            "targetRepsMin": 6,
            "targetRepsMax": 8,
            "restSeconds": 90
          },
          {
            "id": "pe_c4_3",
            "exerciseId": "ex_ring_dips",
            "exerciseName": "Ring Dips (Stability Focus)",
            "sortOrder": 3,
            "targetSets": 3,
            "targetRepsMin": 8,
            "targetRepsMax": 10,
            "restSeconds": 75
          },
          {
            "id": "pe_c4_4",
            "exerciseId": "ex_dragon_flag",
            "exerciseName": "Dragon Flag Core Negatives",
            "sortOrder": 4,
            "targetSets": 3,
            "targetRepsMin": 6,
            "targetRepsMax": 8,
            "restSeconds": 60
          }
        ]
      }
    ]
  }
];
