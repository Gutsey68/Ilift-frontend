import { fetchWithToken } from '../lib/fetchWithToken';

export const completeOnboarding = () => {
  return fetchWithToken('/api/onboarding/complete', {
    method: 'POST'
  });
};

export const updateOnboardingStep = (step: number) => {
  return fetchWithToken('/api/onboarding/step', {
    method: 'PUT',
    body: JSON.stringify({ step })
  });
};
