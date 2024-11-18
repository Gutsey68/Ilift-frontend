export type ExerciseResult = {
  id: string;
  createdAt: string;
  updatedAt: string;
  exerciceId: string;
  userId: string;
  sets: {
    id: string;
    reps: number;
    weight: number;
    createdAt: string;
    updatedAt: string;
    exerciceResultId: string;
  }[];
};
