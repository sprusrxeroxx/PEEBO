import { useState, useRef, useEffect } from "react";

export function useIngredientTags() {
  const [currentInput, setCurrentInput] = useState("");
  const [ingredientTags, setIngredientTags] = useState([]);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  
  // Focus the input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Helper function to handle tag creation
  const createTag = (value) => {
    // Clean up the input value
    const ingredient = value.trim().replace(/[,\s]+$/, '');
    
    // Only add if it's not empty and not already in the list
    if (ingredient && !ingredientTags.includes(ingredient)) {
      setIngredientTags(prev => [...prev, ingredient]);
      setCurrentInput(''); // Clear the input
      return true;
    }
    return false;
  };
  
  // Handle input change and tag creation
  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // If user types comma, try to create a new tag
    if (value.endsWith(',')) {
      if (createTag(value.slice(0, -1))) {
        // Tag was created successfully, input is already cleared
        return;
      } else {
        // Tag creation failed, keep current input but remove the comma
        setCurrentInput(value.slice(0, -1));
        return;
      }
    }
    
    // Otherwise just update the input value
    setCurrentInput(value);
  };
  
  // Handle key down events
  const handleKeyDown = (e) => {
    // Clear error on any key press
    if (error) setError(null);
    
    // Create a tag when Enter is pressed
    if (e.key === 'Enter' && !e.shiftKey && currentInput.trim()) {
      e.preventDefault(); // Prevent form submission
      createTag(currentInput);
    }
    
    // Handle space key for tag creation (only if input isn't empty)
    else if (e.key === ' ' && currentInput.trim() && !currentInput.endsWith(' ')) {
      // Only create tag on space if the input contains more than one word
      const words = currentInput.trim().split(' ');
      if (words.length > 1) {
        e.preventDefault();
        createTag(currentInput);
      }
    }
    
    // Handle Backspace to remove last tag when input is empty
    else if (e.key === 'Backspace' && currentInput === '' && ingredientTags.length > 0) {
      const newTags = [...ingredientTags];
      newTags.pop();
      setIngredientTags(newTags);
    }
  };
  
  // Handle tag removal
  const removeTag = (tagToRemove) => {
    setIngredientTags(ingredientTags.filter(tag => tag !== tagToRemove));
    // Focus back on input after removing a tag
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Handle popular ingredient selection
  const addPopularIngredient = (ingredient) => {
    if (!ingredientTags.includes(ingredient)) {
      setIngredientTags(prev => [...prev, ingredient]);
      
      // Focus back on input after adding
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };
  
  // Get the final list of ingredients for submission
  const getFinalIngredients = () => {
    let allIngredients = [...ingredientTags];
    if (currentInput.trim()) {
      const newTag = currentInput.trim().replace(/,\s*$/, '');
      if (!ingredientTags.includes(newTag)) {
        allIngredients.push(newTag);
      }
      setCurrentInput('');
    }
    return allIngredients;
  };

  return {
    currentInput,
    setCurrentInput,
    ingredientTags,
    setIngredientTags,
    error,
    setError,
    inputRef,
    handleInputChange,
    handleKeyDown,
    removeTag,
    addPopularIngredient,
    getFinalIngredients
  };
}