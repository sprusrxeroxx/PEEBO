import mongoose from "mongoose";

const { Schema, model } = mongoose;

const savedRecipeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipeId: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Create compound index to prevent duplicate saves
savedRecipeSchema.index({ userId: 1, recipeId: 1 }, { unique: true });

const SavedRecipe = model('SavedRecipe', savedRecipeSchema);

export default SavedRecipe;