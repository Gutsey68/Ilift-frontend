export type WorkoutType = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  programId: string;
  userId: string;
  program: {
    name: string;
    id: string;
  };
};

export type WorkoutsDataType = {
  workouts: WorkoutType[];
  program: {
    name: string;
    id: string;
  };
};
