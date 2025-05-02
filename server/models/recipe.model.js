import mongoose from "mongoose";

const { Schema, model } = mongoose;

const recipeSchema = new Schema ({
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
      },
      ingredients: [{
        id: Number,
        name: String,
        amount: Number,
        unit: String,
        image: String
      }],
      missingIngredients: [{
        id: Number,
        name: String,
        amount: Number,
        unit: String,
        image: String
      }],
      image: {
        type: String,
        trim: true,
      },
      spoonacularId: {
        type: Number,
        unique: true
      },
      readyInMinutes: {
        type: Number,
        required: true
      },
      servings: {
        type: Number,
        required: true
      },
      dishTypes: [{
        type: String,
        trim: true
      }],
      cuisines: [{
        type: String,
        trim: true
      }],
}, {
  timestamps: true
});

const Recipe = model('Recipe', recipeSchema);

export default Recipe;