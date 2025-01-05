import { ReactNode, createContext, useContext, useState } from 'react';

type ProgramContextType = {
  programName: string;
  programId: string;
  workoutName: string;
  workoutId: string;
  setProgramInfo: (name: string, id: string) => void;
  setWorkoutInfo: (name: string, id: string) => void;
};

const ProgramContext = createContext<ProgramContextType | null>(null);

export function ProgramProvider({ children }: { children: ReactNode }) {
  const [programName, setProgramName] = useState('');
  const [programId, setProgramId] = useState('');
  const [workoutName, setWorkoutName] = useState('');
  const [workoutId, setWorkoutId] = useState('');

  const setProgramInfo = (name: string, id: string) => {
    setProgramName(name);
    setProgramId(id);
  };

  const setWorkoutInfo = (name: string, id: string) => {
    setWorkoutName(name);
    setWorkoutId(id);
  };

  return (
    <ProgramContext.Provider
      value={{
        programName,
        programId,
        workoutName,
        workoutId,
        setProgramInfo,
        setWorkoutInfo
      }}
    >
      {children}
    </ProgramContext.Provider>
  );
}

export const useProgramContext = () => {
  const context = useContext(ProgramContext);
  if (!context) {
    throw new Error('useProgramContext doit être utilisé avec un ProgramProvider');
  }
  return context;
};
