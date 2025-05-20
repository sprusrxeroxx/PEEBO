import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Progress,
  Text,
  IconButton,
  useColorModeValue,
  Image,
  VStack,
  HStack,
  useBreakpointValue,
  Badge,
  Icon
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";
import { useSwipeable } from "react-swipeable";
import { FaUtensils, FaClock } from "react-icons/fa";
import { useRecipeStore } from "../store/recipe";

const CookingMode = ({ isOpen, onClose, recipe }) => {
  const { 
    isLoadingSteps, 
    recipeSteps, 
    currentStepIndex, 
    fetchRecipeSteps, 
    goToNextStep, 
    goToPrevStep, 
    resetCookingProgress 
  } = useRecipeStore();
  
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Color mode values
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const accentColor = useColorModeValue("brand.primary", "brand.secondary");
  const stepNumberBg = useColorModeValue("brand.primary", "brand.secondary");
  
  // Check if we're on mobile
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  // Setup swipe handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => goToNextStep(),
    onSwipedRight: () => goToPrevStep(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: false
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
  
  // Calculate progress percentage
  const progress = recipeSteps?.steps?.length 
    ? ((currentStepIndex + 1) / recipeSteps.steps.length) * 100 
    : 0;
  
  // Current step data
  const currentStep = recipeSteps?.steps?.[currentStepIndex] || {};
  
  // Handle closing
  const handleClose = () => {
    onClose();
    resetCookingProgress();
  };
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      size="full" 
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent bg={cardBg}>
        <ModalHeader bg={accentColor} color="white" py={4}>
          <Flex justify="space-between" align="center">
            <Heading size="md">{recipeSteps?.title || recipe?.title || "Cooking Mode"}</Heading>
            <IconButton
              icon={<CloseIcon />}
              variant="ghost"
              color="white"
              _hover={{ bg: "whiteAlpha.300" }}
              onClick={handleClose}
              aria-label="Close cooking mode"
            />
          </Flex>
        </ModalHeader>
        
        <ModalBody p={0}>
          {isLoadingSteps ? (
            <Flex direction="column" align="center" justify="center" h="80vh">
              <Text mb={4}>Loading cooking instructions...</Text>
              <Progress size="xs" isIndeterminate w="80%" colorScheme="brand" />
            </Flex>
          ) : (
            <>
              {/* Progress bar */}
              <Progress 
                value={progress} 
                size="sm" 
                colorScheme="brand" 
                bg={useColorModeValue("gray.100", "gray.700")}
              />
              
              {/* Step indicator */}
              <Flex 
                bg={useColorModeValue("gray.50", "gray.700")} 
                py={2} 
                px={4} 
                justify="space-between" 
                align="center"
                borderBottomWidth="1px"
                borderColor={useColorModeValue("gray.200", "gray.600")}
              >
                <Badge colorScheme="brand" fontSize="sm">
                  Step {currentStepIndex + 1} of {recipeSteps?.steps?.length || 0}
                </Badge>
                
                <HStack spacing={4}>
                  <Flex align="center">
                    <Icon as={FaClock} mr={1} color={accentColor} />
                    <Text fontSize="sm">{recipeSteps?.readyInMinutes || recipe?.readyInMinutes} min</Text>
                  </Flex>
                  <Flex align="center">
                    <Icon as={FaUtensils} mr={1} color={accentColor} />
                    <Text fontSize="sm">{recipeSteps?.servings || recipe?.servings} servings</Text>
                  </Flex>
                </HStack>
              </Flex>
              
              {/* Step content */}
              <Box 
                {...(isMobile ? swipeHandlers : {})} 
                p={6} 
                h="calc(100vh - 180px)"
                overflowY="auto"
              >
                {recipeSteps?.steps?.length > 0 ? (
                  <Flex direction="column" h="full">
                    {/* Recipe image at the top */}
                    {currentStepIndex === 0 && (
                      <Box mb={6}>
                        <Image
                          src={recipeSteps.image || recipe.image}
                          alt={recipeSteps.title || recipe.title}
                          borderRadius="md"
                          objectFit="cover"
                          w="full"
                          h="200px"
                        />
                      </Box>
                    )}
                    
                    {/* Step instruction */}
                    <Box
                      flex="1"
                      bg={cardBg}
                      borderRadius="lg"
                      p={6}
                      boxShadow="md"
                      borderWidth="1px"
                      borderColor={useColorModeValue("gray.100", "gray.700")}
                    >
                      <Flex align="center" mb={4}>
                        <Flex
                          align="center"
                          justify="center"
                          bg={stepNumberBg}
                          color="white"
                          borderRadius="full"
                          w={10}
                          h={10}
                          mr={4}
                          fontWeight="bold"
                        >
                          {currentStep.number || currentStepIndex + 1}
                        </Flex>
                        <Heading size="md" color={accentColor}>
                          {currentStepIndex === 0 ? "Let's start cooking!" : "Step " + (currentStep.number || currentStepIndex + 1)}
                        </Heading>
                      </Flex>
                      
                      <Text fontSize="lg" color={textColor} lineHeight="tall">
                        {currentStep.instruction}
                      </Text>
                      
                      {/* Ingredients for this step if available */}
                      {currentStep.ingredients && currentStep.ingredients.length > 0 && (
                        <VStack align="start" mt={6} spacing={2}>
                          <Text fontWeight="medium" color={accentColor}>
                            Ingredients for this step:
                          </Text>
                          {currentStep.ingredients.map((ingredient, idx) => (
                            <Text key={idx} fontSize="sm">
                              • {ingredient.name}
                            </Text>
                          ))}
                        </VStack>
                      )}
                      
                      {/* Equipment for this step if available */}
                      {currentStep.equipment && currentStep.equipment.length > 0 && (
                        <VStack align="start" mt={4} spacing={2}>
                          <Text fontWeight="medium" color={accentColor}>
                            Equipment needed:
                          </Text>
                          {currentStep.equipment.map((item, idx) => (
                            <Text key={idx} fontSize="sm">
                              • {item.name}
                            </Text>
                          ))}
                        </VStack>
                      )}
                    </Box>
                    
                    {/* Navigation hint for mobile */}
                    {isMobile && (
                      <Text fontSize="sm" textAlign="center" color="gray.500" mt={4}>
                        Swipe left or right to navigate between steps
                      </Text>
                    )}
                  </Flex>
                ) : (
                  <Flex direction="column" align="center" justify="center" h="full">
                    <Text>No cooking instructions available for this recipe.</Text>
                    <Button mt={4} variant="outline" onClick={handleClose}>
                      Go back
                    </Button>
                  </Flex>
                )}
              </Box>
              
              {/* Navigation buttons - only for desktop or shown at bottom on mobile */}
              <Flex 
                justify="space-between" 
                p={4}
                borderTopWidth="1px"
                borderColor={useColorModeValue("gray.200", "gray.600")}
                bg={useColorModeValue("white", "gray.800")}
              >
                <Button
                  leftIcon={<ArrowBackIcon />}
                  onClick={goToPrevStep}
                  isDisabled={currentStepIndex === 0}
                  variant="outline"
                  colorScheme="brand"
                >
                  Previous
                </Button>
                
                <Button
                  rightIcon={<ArrowForwardIcon />}
                  onClick={currentStepIndex === (recipeSteps?.steps?.length - 1) ? handleClose : goToNextStep}
                  variant="primary"
                  colorScheme="brand"
                >
                  {currentStepIndex === (recipeSteps?.steps?.length - 1) ? "Finish" : "Next"}
                </Button>
              </Flex>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CookingMode;