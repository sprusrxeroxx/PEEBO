import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useRecipeStore } from '../../../store/recipe';
import { useBreakpointValue } from '@chakra-ui/react';

export function useCookingMode({ isOpen, onClose, recipe }) {
  const {
    recipeSteps,
    currentStepIndex,
    isLoadingSteps,
    fetchRecipeSteps,
    goToNextStep,
    goToPrevStep,
    resetCookingProgress
  } = useRecipeStore();

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Check if we're on mobile
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  // Calculate progress percentage
  const progress = recipeSteps?.steps?.length 
    ? ((currentStepIndex + 1) / recipeSteps.steps.length) * 100 
    : 0;

  // Current step data
  const currentStep = recipeSteps?.steps?.[currentStepIndex] || {};

  // Setup swipe handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => goToNextStep(),
    onSwipedRight: () => goToPrevStep(),
    preventDefaultTouchmoveEvent: false, // Change this to false
    trackMouse: false,
    passive: true // Add this line
  });

  // Fetch recipe steps when opened
  useEffect(() => {
    if (isOpen && recipe && isInitialLoad) {
      fetchRecipeSteps(recipe.spoonacularId);
      setIsInitialLoad(false);
    }
  }, [isOpen, recipe, isInitialLoad, fetchRecipeSteps]);

  // Reset cooking progress when closed
  useEffect(() => {
    if (!isOpen) {
      setIsInitialLoad(true);
    }
    
    return () => {
      if (!isOpen) {
        resetCookingProgress();
      }
    };
  }, [isOpen, resetCookingProgress]);

  // Handle closing
  const handleClose = () => {
    onClose();
    resetCookingProgress();
  };

  // Check if we're on the final step
  const isLastStep = currentStepIndex === (recipeSteps?.steps?.length - 1);

  // Handle next step or finish
  const handleNext = () => {
    if (isLastStep) {
      handleClose();
    } else {
      goToNextStep();
    }
  };

  return {
    isLoading: isLoadingSteps,
    recipeSteps,
    currentStep,
    currentStepIndex,
    totalSteps: recipeSteps?.steps?.length || 0,
    progress,
    isMobile,
    isLastStep,
    swipeHandlers,
    goToNextStep: handleNext,
    goToPrevStep,
    handleClose,
    recipe: recipeSteps || recipe
  };
}