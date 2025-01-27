import mongoose, { Schema } from 'mongoose';

const providerSchema = new Schema({
  providerName: {
    type: String,

  },

  fullName: {
    type: String
  },
  providerId: {
    type: String,

  },
  accessToken: {
    type: String,

  },
  profileImage: {
    type: String,
  },

}, { _id: false }); // Disable _id for subdocuments to keep the array clean

const userSchema = new Schema({
  firstName: {
    type: String,

  },

  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  number: {
    type: Number,
    unique: true,
  },
  password: {
    type: String,
    unique: true,
  },
  authProviders: [providerSchema], // Array of provider objects
  currentProvider: {
    type: String, // Name of the currently active provider
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);
export default User;
