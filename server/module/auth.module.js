import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'Name is required'],
  },

  lastname: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,

  },

  number: {
    type: Number,
    required: true,
    unique: true
  },


  password: {
    type: String,
    unique: true
  },

  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the creation date
  },
})

const User = mongoose.model('User', userSchema);
export default User