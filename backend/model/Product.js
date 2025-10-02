import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Category",
},
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    pricePosition: {
        type: String
    },
    
    image: {
        type: String
    },
    variations: [
        {
            name: {
                type: String
            },
            price: {
                type: Number
            }
        }
    ],
    toppings: [
        {
            name: {
                type: String
            },
            price: {
                type: Number
            }
        }
    ],
    crustType: [
        {
            name: {
                type: String
            },
            price: {
                type: Number
            }
        }
    ],
    additionalNotes: {
        type: String
    }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
