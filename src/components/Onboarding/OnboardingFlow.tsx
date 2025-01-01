import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { completeOnboarding, updateOnboardingStep } from '../../services/onBoardingService';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import FollowUsersStep from './steps/FollowUsersStep';
import ProfilePhotoStep from './steps/ProfilePhotoStep';
import UserInfoStep from './steps/UserInfoStep';

const OnboardingFlow = () => {
  const { user } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState(user?.onboardingStep || 0);
  const queryClient = useQueryClient();

  const { mutate: updateStep } = useMutation({
    mutationFn: updateOnboardingStep,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    }
  });

  const { mutate: complete } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      toast.success('Profil complété avec succès!');
    },
    onError: () => {
      toast.error("Erreur lors de la finalisation de l'onboarding");
    }
  });

  useEffect(() => {
    if (user?.onboardingStep !== undefined && user.onboardingStep !== currentStep) {
      setCurrentStep(user.onboardingStep);
    }
  }, [user?.onboardingStep]);

  const handleNextStep = () => {
    if (currentStep === steps.length - 1) {
      complete();
    } else {
      updateStep(currentStep + 1);
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      updateStep(currentStep - 1);
      setCurrentStep(prev => prev - 1);
    }
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

  if (currentStep >= steps.length) return null;

  return (
    <Modal>
      <Card size="lg" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 p-6">
          <div className="mb-4 justify-between text-sm text-neutral-11">
            Étape {currentStep + 1} sur {steps.length}
          </div>
          <div className="mb-4 flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 rounded-full ${index === currentStep ? 'bg-green-9' : index < currentStep ? 'bg-green-8' : 'bg-green-6'}`}
              />
            ))}
          </div>

          <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
          <p className="text-sm text-neutral-11">{steps[currentStep].description}</p>
        </div>

        <div className="flex-1 px-6">{steps[currentStep].component}</div>

        <div className="flex items-center justify-between border-t border-neutral-6 p-6">
          <Button variant="secondary" onClick={handlePreviousStep} className={currentStep === 0 ? 'invisible' : ''}>
            Retour
          </Button>

          <Button onClick={handleNextStep}>{currentStep === steps.length - 1 ? 'Terminer' : 'Suivant'}</Button>
        </div>
      </Card>
    </Modal>
  );
};

export default OnboardingFlow;
