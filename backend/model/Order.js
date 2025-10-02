
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  delivery: {
    type: String
  },
  first: {
    type: String
  },
  last: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
    
  },
  notes: {
    type: String
  },
  status: {
    type: String
  },
  orderno: {
    type: String
  },
  ordersummary: {
    type: String
  },
  tip: {
    type: String
  },
  total: {
    type: String
  },
  paymentmethod: {
    type: String
  },
  terms: {
    type: String
  }, 
  randomno: {
    type: String
  }
}, {
  timestamps: true 
});

const Order = mongoose.model("order", orderSchema); 

export default Order;