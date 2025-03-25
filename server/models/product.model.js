import mongoose from "mongoose";

const { Schema, model } = mongoose;

const productSchema = new Schema ({
      name: {
          type: String,
          required: true,
          trim: true,
        },
      category: {
        type: String,
        enum: ['Fruits', 'Vegetables', 'Other'],
        required: true,
      },
      description: {
        type: String,
        trim: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      unit: {
        type: String,
        enum: ['kg', 'piece', 'bunch', 'pack', 'grams'],
        required: true,
      },
      stockQuantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
      },
      imageUrl: {
        type: String,
        trim: true,
      },
      seasonal: {
          type:Boolean,
          default: false,
      },
      origin: {
        type: String,
        trim: true,
      },
}, {
  timestamps: true
});

const Product = model('Product', productSchema);

export default Product;