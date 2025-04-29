import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firebaseId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  displayName: {
    type: String,
    trim: true,
  },
  profilePhoto: {
    type: String,
    trim: true,
  }
}, {
  timestamps: true
});

const User = model('User', userSchema);

export default User;