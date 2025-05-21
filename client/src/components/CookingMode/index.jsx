import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box
} from "@chakra-ui/react";
import { useCookingMode } from "./hooks/useCookingMode";
import CookingHeader from "./components/CookingHeader";
import StepMetadata from "./components/StepMetadata";
import StepContent from "./components/StepContent";
import NavigationControls from "./components/NavigationControls";
import LoadingState from "./components/LoadingState";

const CookingMode = ({ isOpen, onClose, recipe }) => {
  const {
    isLoading,
    currentStep,
    currentStepIndex,
    totalSteps,
    progress,
    isMobile,
    swipeHandlers,
    goToNextStep,
    goToPrevStep,
    handleClose,
    recipe: recipeData
  } = useCookingMode({ isOpen, onClose, recipe });

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      size="full" 
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent bg={isMobile ? "transparent" : undefined}>
        {/* Header with progress indicator */}
        <CookingHeader 
          title={recipeData?.title || recipe?.title || "Cooking Mode"} 
          progress={progress} 
          onClose={handleClose}
          source={recipeData?.source} 
        />
        
        <ModalBody p={0}>
          {isLoading ? (
            <LoadingState />
          ) : (
            <>
              {/* Step indicator and recipe metadata */}
              <StepMetadata 
                currentStep={currentStep} 
                currentStepIndex={currentStepIndex} 
                totalSteps={totalSteps}
                readyInMinutes={recipeData?.readyInMinutes || recipe?.readyInMinutes}
                servings={recipeData?.servings || recipe?.servings}
              />
              
              {/* Step content area - swipeable on mobile */}
              <Box 
                {...(isMobile ? swipeHandlers : {})} 
                p={6} 
                h="calc(100vh - 180px)"
                overflowY="auto"
              >
                {totalSteps > 0 ? (
                  <StepContent 
                    step={currentStep}
                    index={currentStepIndex}
                    totalSteps={totalSteps}
                    image={recipeData.image || recipe.image}
                    isFirstStep={currentStepIndex === 0}
                  />
                ) : (
                  <Text textAlign="center" py={10}>
                    No cooking instructions available for this recipe.
                  </Text>
                )}
              </Box>
              
              {/* Navigation controls */}
              <NavigationControls 
                onPrev={goToPrevStep}
                onNext={goToNextStep}
                isFirstStep={currentStepIndex === 0}
                isLastStep={currentStepIndex === (totalSteps - 1)}
                isMobile={isMobile}
              />
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CookingMode;