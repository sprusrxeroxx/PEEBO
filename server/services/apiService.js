import axios from "axios";

/**
 * Service for making API calls to Spoonacular
 */
export default class SpoonacularAPI {
  constructor() {
    this.apiKey = process.env.SPOONACULAR_API_KEY;
    this.baseURL = "https://api.spoonacular.com";
  }

  /**
   * Search recipes by ingredients
   */
  async searchRecipesByIngredients(ingredients, options = {}) {
    const params = {
      ingredients,
      ranking: options.ranking || 1,
      ignorePantry: options.ignorePantry || true,
      number: options.number || 10,
      apiKey: this.apiKey
    };

    try {
      const response = await axios.get(`${this.baseURL}/recipes/findByIngredients`, { params });
      return { success: true, data: response.data };
    } catch (error) {
      console.error("API Error - searchRecipesByIngredients:", error.message);
      return { success: false, message: "Failed to search recipes" };
    }
  }

  /**
   * Get detailed recipe information from Spoonacular
   */
  async getRecipeInformation(recipeId) {
    try {
      const response = await axios.get(`${this.baseURL}/recipes/${recipeId}/information`, {
        params: { apiKey: this.apiKey }
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error("API Error - getRecipeInformation:", error.message);
      return { success: false, message: "Failed to fetch recipe information" };
    }
  }

  /**
   * Extract and format recipe steps from API response
   */
  parseRecipeSteps(recipeData) {
    let steps = [];
    
    // Check if analyzedInstructions is available (preferred format)
    if (recipeData.analyzedInstructions && 
        recipeData.analyzedInstructions.length > 0 && 
        recipeData.analyzedInstructions[0].steps) {
      
      steps = recipeData.analyzedInstructions[0].steps.map(step => ({
        number: step.number,
        instruction: step.step,
        ingredients: step.ingredients || [],
        equipment: step.equipment || []
      }));
    } 
    // Fall back to parsing the HTML instructions
    else if (recipeData.instructions) {
      const instructionText = recipeData.instructions
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .trim();
      
      // Try to extract numbered steps first
      const stepMatches = instructionText.match(/\d+\.\s+[^.!?]+[.!?]+/g);
      
      if (stepMatches && stepMatches.length > 0) {
        steps = stepMatches.map((step, index) => ({
          number: index + 1,
          instruction: step.trim(),
          ingredients: [],
          equipment: []
        }));
      } else {
        // Fall back to splitting by sentences
        const sentences = instructionText.split(/[.!?]+/)
          .filter(s => s.trim().length > 0);
          
        steps = sentences.map((sentence, index) => ({
          number: index + 1,
          instruction: sentence.trim(),
          ingredients: [],
          equipment: []
        }));
      }
    }
    
    return steps;
  }
}