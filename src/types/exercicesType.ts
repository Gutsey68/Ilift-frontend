import { MuscleGroupType } from './musclesType';

export type BaseEntityType = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ExerciseMuscleGroupType = {
  muscleGroups: MuscleGroupType;
};

export type ExerciseType = BaseEntityType & {
  musclesGroups: ExerciseMuscleGroupType[];
};

export type WorkoutType = {
  id: string;
  name: string;
  program: {
    id: string;
    name: string;
  };
};

export type ResponseType<T> = {
  message: string;
  data: T;
};

export type ExerciseResponseType = ResponseType<{
  exercices: ExerciseType[];
  workout: WorkoutType;
}>;

export type AllExercisesResponseType = ResponseType<ExerciseType[]>;
export type WorkoutExercisesResponseType = ExerciseResponseType;
