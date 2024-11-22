import { create } from 'zustand';

type StoreState = {
  programId: string | null;
  programName: string | null;
  workoutId: string | null;
  workoutName: string | null;
  exerciseId: string | null;
  exerciseName: string | null;
  setProgram: (id: string, name: string) => void;
  setWorkout: (id: string, name: string) => void;
  setExercise: (id: string, name: string) => void;
};

const useStore = create<StoreState>(set => ({
  programId: null,
  programName: null,
  workoutId: null,
  workoutName: null,
  exerciseId: null,
  exerciseName: null,
  setProgram: (id, name) => set({ programId: id, programName: name }),
  setWorkout: (id, name) => set({ workoutId: id, workoutName: name }),
  setExercise: (id, name) => set({ exerciseId: id, exerciseName: name })
}));

export default useStore;
