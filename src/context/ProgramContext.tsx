import { ReactNode, createContext, useContext, useState } from 'react';

/**
 * Type définissant la structure du contexte de programme
 */
type ProgramContextType = {
  programName: string;
  programId: string;
  workoutName: string;
  workoutId: string;
  setProgramInfo: (name: string, id: string) => void;
  setWorkoutInfo: (name: string, id: string) => void;
};

/**
 * Contexte pour gérer les informations des programmes et des séances
 */
const ProgramContext = createContext<ProgramContextType | null>(null);

/**
 * Provider pour gérer l'état global des programmes et des séances
 * @param children - Composants enfants
 */
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

/**
 * Hook personnalisé pour utiliser le contexte de programme
 * @throws {Error} Si utilisé en dehors d'un ProgramProvider
 */
export const useProgramContext = () => {
  const context = useContext(ProgramContext);
  if (!context) {
    throw new Error('useProgramContext doit être utilisé avec un ProgramProvider');
  }
  return context;
};
