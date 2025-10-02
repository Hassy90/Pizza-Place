
import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: {
    type: String
  },
  password: {
    type: String
  }
}, {
  timestamps: true 
});

const Admin = mongoose.model("Admin", AdminSchema); 

export default Admin;