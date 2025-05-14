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

    // Map the response data to our application structure
    const enrichedData = {
      readyInMinutes: response.data.readyInMinutes || 30,
      servings: response.data.servings || 4,
      description: response.data.summary || "",
      dishTypes: response.data.dishTypes || [],
      cuisines: response.data.cuisines || [],
      instructions: response.data.instructions || "",
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