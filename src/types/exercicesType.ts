export type ExerciseType = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  workouts: {
    workout: {
      name: string;
      id: string;
    };
  }[];
};
