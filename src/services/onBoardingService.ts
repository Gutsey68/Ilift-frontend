import { fetchWithToken } from '../lib/fetchWithToken';

/**
 * Marque le processus d'onboarding comme terminé
 */
export const completeOnboarding = () => {
  return fetchWithToken('/api/onboarding/complete', {
    method: 'POST'
  });
};

/**
 * Met à jour l'étape actuelle de l'onboarding
 * @param step - Numéro de l'étape
 */
export const updateOnboardingStep = (step: number) => {
  return fetchWithToken('/api/onboarding/step', {
    method: 'PUT',
    body: JSON.stringify({ step })
  });
};
