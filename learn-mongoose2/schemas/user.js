import mongoose from "mongoose";
/*const mongoose = require('mongoose');*/


const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/*module.exports = mongoose.model('User', userSchema);*/
export default mongoose.model('User', userSchema);