import fetchDetails from './enrichers/fetchDetails.js';

// This array will hold all the enricher functions
// Each enricher should be an async function that takes a recipe object and returns an enhanced recipe object
const enrichers = [
  // Register our enrichers in the order they should run
  fetchDetails
  // Add more enrichers here as they are created
];

/**
 * Process a recipe through a pipeline of enrichment functions
 * @param {Object} baseRecipe - The initial recipe object to enrich
 * @returns {Promise<Object>} - The enriched recipe object
 */
const enrichRecipe = async (baseRecipe) => {
  try {
    // Start with the base recipe
    let enrichedRecipe = { ...baseRecipe };
    
    // Apply each enricher function in sequence
    for (const enricher of enrichers) {
      try {
        enrichedRecipe = await enricher(enrichedRecipe);
      } catch (error) {
        console.error(`Error in enricher: ${error.message}`);
        // Continue with the pipeline even if one enricher fails
      }
    }
    
    return enrichedRecipe;
  } catch (error) {
    console.error(`Recipe enrichment failed: ${error.message}`);
    // If the pipeline fails completely, return the original recipe
    return baseRecipe;
  }
};

export default enrichRecipe;
export { enrichers };