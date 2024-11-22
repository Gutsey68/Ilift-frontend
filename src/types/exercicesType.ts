export type ExerciseType = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ExercicesDataType = {
  exercices: ExerciseType[];
  workout: {
    name: string;
    id: string;
    program: {
      name: string;
      id: string;
    };
  };
};
