import axios from "axios";

export const searchRecipes = async (req, res) => {
  const { ingredients } = req.query;

  if (!ingredients) {
    return res.status(400).json({ success: false, message: "Ingredients are required" });
  }

  try {
    const response = await axios.get("https://api.spoonacular.com/recipes/findByIngredients", {
      params: {
        ingredients,
        apiKey: process.env.SPOONACULAR_API_KEY,
      },
    });

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};