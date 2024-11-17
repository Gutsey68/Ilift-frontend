export type WorkoutType = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  programId: string;
  userId: string;
  program: {
    name: string;
  };
};
