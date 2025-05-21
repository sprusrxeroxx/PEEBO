import axios from 'axios';

/**
 * Enricher function to fetch detailed recipe information from Spoonacular API
 * @param {Object} recipe - The recipe object to enrich
 * @returns {Promise<Object>} - The enriched recipe object
 */
const fetchDetails = async (recipe) => {
  try {
    // Skip if no recipe ID is available
    if (!recipe.id) {
      console.warn('Recipe ID missing, skipping detailed information fetch');
      return recipe;
    }

    // Fetch additional data from Spoonacular API
    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information`, {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY,
      }
    });

    // Extract recipe steps
    let steps = [];
    
    // Check if analyzedInstructions is available (preferred format)
    if (response.data.analyzedInstructions && 
        response.data.analyzedInstructions.length > 0 && 
        response.data.analyzedInstructions[0].steps) {
      
      steps = response.data.analyzedInstructions[0].steps.map(step => ({
        number: step.number,
        instruction: step.step,
        ingredients: step.ingredients || [],
        equipment: step.equipment || []
      }));
    } 
    // Fall back to parsing the HTML instructions if analyzedInstructions is not available
    else if (response.data.instructions) {
      // Simple parsing for HTML instructions using regex
      const instructionText = response.data.instructions
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .trim();
      
      // Split by numbered steps (1. Step one, 2. Step two) or by periods
      const stepMatches = instructionText.match(/\d+\.\s+[^.!?]+[.!?]+/g);
      
      if (stepMatches && stepMatches.length > 0) {
        steps = stepMatches.map((step, index) => ({
          number: index + 1,
          instruction: step.trim(),
          ingredients: [],
          equipment: []
        }));
      } else {
        // Fall back to splitting by sentences if no numbered steps found
        const sentences = instructionText.split(/[.!?]+/).filter(s => s.trim().length > 0);
        steps = sentences.map((sentence, index) => ({
          number: index + 1,
          instruction: sentence.trim(),
          ingredients: [],
          equipment: []
        }));
      }
    }

    // Map the response data to our application structure
    const enrichedData = {
      readyInMinutes: response.data.readyInMinutes || 30,
      servings: response.data.servings || 4,
      description: response.data.summary || "",
      dishTypes: response.data.dishTypes || [],
      cuisines: response.data.cuisines || [],
      instructions: response.data.instructions || "",
      steps: steps // Add the extracted steps to the enriched data
    };

    // Return the merged object
    return { ...recipe, ...enrichedData };
  } catch (error) {
    console.error(`Failed to fetch recipe details: ${error.message}`);
    // If API call fails, return the original recipe
    return recipe;
  }
};

export default fetchDetails;