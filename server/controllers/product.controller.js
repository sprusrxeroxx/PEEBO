import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success:true, data: products });
    } catch (error) {
        console.log('Error in Fetching products:', error.message);
        res.status(500).json({ success:false, message: 'Error in fetching products' })
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success:false, message: "Invalid Product Id"})
    };
    
    try {
        const product = await Product.findOne({ _id: id });
        res.status(200).json({ success:true, data: product });
    } catch (error) {
        console.log('Error in Fetching products:', error.message);
        res.status(500).json({ success:false, message: 'Error in fetching product' })
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;

    if ( !product.name || !product.category || !product.price || !product.unit || !product.stockQuantity || !product.imageUrl ) {
        return res.status(400).json({ success:false, message: "Please fill in all fields" });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success:true, data: newProduct});
    } catch (error) {
        console.log('Error in Create product:', error.message);
        res.status(500).json({ success:false, message: 'Server Error' })
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const update = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success:false, message: "Invalid Product Id"})
    };

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, update, {new:true});
        res.status(204).json({ success:true, data: updatedProduct });

    } catch (error) {
        console.log('Error in Fetching products:', error.message);
        res.status(500).json({ success:false, message: 'Error in updating product' });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success:false, message: "Invalid Product Id"})
    };

    try {
        const updatedProduct = await Product.findByIdAndDelete(id, {new:true});
        res.status(202).json({ success:true, data: updatedProduct });
    } catch (error) {
        console.log('Error in Fetching products:', error.message);
        res.status(500).json({ success:false, message: 'Error in deleting product' });
    }
}