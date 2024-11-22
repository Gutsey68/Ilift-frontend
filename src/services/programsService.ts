import useAuth from '../hooks/useAuth';

export const fetchProgramsOfUser = async (id: string) => {
  const { checkAuth } = useAuth();
  const token = localStorage.getItem('token');

  await checkAuth();

  const response = await fetch(`http://localhost:3000/api/programs/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw { message: errorData.error || 'Non autorisé', status: response.status };
  }

  return response.json();
};

export const fetchWorkoutsOfProgram = async (id: string) => {
  const { checkAuth } = useAuth();
  const token = localStorage.getItem('token');

  await checkAuth();

  const response = await fetch(`http://localhost:3000/api/programs/${id}/workouts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw { message: errorData.error || 'Non autorisé', status: response.status };
  }

  return response.json();
};

export const fetchExercicesOfWorkout = async (id: string) => {
  const { checkAuth } = useAuth();
  const token = localStorage.getItem('token');

  await checkAuth();

  const response = await fetch(`http://localhost:3000/api/programs/workouts/${id}/exercices`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw { message: errorData.error || 'Non autorisé', status: response.status };
  }

  return response.json();
};
