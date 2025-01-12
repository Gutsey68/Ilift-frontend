import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { completeOnboarding, updateOnboardingStep } from '../../services/onBoardingService';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import FollowUsersStep from './steps/FollowUsersStep';
import ProfilePhotoStep from './steps/ProfilePhotoStep';
import UserInfoStep from './steps/UserInfoStep';

const OnboardingFlow = () => {
  const { user, setUser } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState(user?.onboardingStep || 1);
  const queryClient = useQueryClient();

  const { mutate: updateStep } = useMutation({
    mutationFn: updateOnboardingStep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  });

  const { mutate: complete } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: async () => {
      if (user) {
        setUser({
          ...user,
          isOnboardingCompleted: true,
          onboardingStep: 3
        });
      }
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  });

  const handleNextStep = () => {
    const nextStep = currentStep + 1;
    if (nextStep > steps.length) {
      complete();
    } else {
      updateStep(nextStep);
      setCurrentStep(nextStep);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      updateStep(prevStep);
      setCurrentStep(prevStep);
    }
  };

  const handleSkip = () => {
    handleNextStep();
  };

  const steps = [
    {
      component: <ProfilePhotoStep onComplete={handleNextStep} />,
      title: 'Ajoutez une photo de profil',
      description: 'Personnalisez votre profil avec une photo qui vous représente'
    },
    {
      component: <UserInfoStep onComplete={handleNextStep} />,
      title: 'Complétez votre profil',
      description: 'Ajoutez une bio et votre ville pour mieux vous connaître'
    },
    {
      component: <FollowUsersStep />,
      title: 'Suivez des utilisateurs',
      description: 'Trouvez des personnes intéressantes à suivre'
    }
  ];

  if (!user || user.isOnboardingCompleted) return null;

  return (
    <Modal>
      <Card size="lg" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-neutral-11">
              Étape {currentStep} sur {steps.length}
            </div>
            <Button variant="ghost" onClick={handleSkip}>
              {currentStep === steps.length ? 'Terminer' : 'Passer cette étape'}
            </Button>
          </div>

          <div className="mb-4 flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full ${index === currentStep - 1 ? 'bg-green-9' : index < currentStep - 1 ? 'bg-green-8' : 'bg-green-6'}`}
              />
            ))}
          </div>

          <h2 className="text-2xl font-bold">{steps[currentStep - 1].title}</h2>
          <p className="text-sm text-neutral-11">{steps[currentStep - 1].description}</p>
        </div>

        <div className="flex-1 px-6">{steps[currentStep - 1].component}</div>

        <div className="flex items-center justify-between border-t border-neutral-6 p-6">
          <Button variant="secondary" onClick={handlePreviousStep} className={currentStep === 1 ? 'invisible' : ''}>
            Retour
          </Button>

          <Button onClick={handleNextStep}>{currentStep === steps.length ? 'Terminer' : 'Suivant'}</Button>
        </div>
      </Card>
    </Modal>
  );
};

export default OnboardingFlow;
