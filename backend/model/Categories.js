import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  category: {
    type: String
  },
  description: {
    type: String
  }
}, {
  timestamps: true 
});

const Categories = mongoose.model("Category", categorySchema); 

export default Categories;
