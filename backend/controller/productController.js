// import Product from "../model/Product.js";

// const items = async (req, res) => {
//     try {
//     const { category, name, description, price, pricePosition, image, variations, toppings, crustType, additionalNotes } = req.body;

//         await Product.insertOne({category, name, description, price, pricePosition, image, variations, 
//             toppings, crustType, additionalNotes })
//         return res.status(200).json({message: "data submitted successfully"})
//     } catch (error) {
//         console.log("Product error", error.message)
//     };
// } 

// // const getProduct = async (req, res) => {
// //     try {
// //        const productData = await Product.find().populate("category");

// //         if (!productData){
// //             return res.status(404).json({message: "product not found"})
// //         }

// //         return res.status(200).json({message: "Product data is get", 
// //             data: productData})
// //     } catch (error) {
// //         console.log("getproduct error...", error.message)
// //     }
// // }

// const getProduct = async (req, res) => {
//   try {
//     const productData = await Product.find().populate("category");

//     if (!productData) {
//       return res.status(404).json({ message: "Product not found" });
//     }

    
//     const grouped = {};

//     productData.forEach(product => {
//       const cat = product.category;
//       const categoryId = cat._id.toString();

//       if (!grouped[categoryId]) {
//         grouped[categoryId] = {
//           category: cat.category,
//           description: cat.description,
//           products: []
//         };
//       }

//       const prod = product.toObject(); 
//       delete prod.category;

//       grouped[categoryId].products.push(prod);
//     });
//   // Convert grouped object to array
//     const result = Object.values(grouped);

//     return res.status(200).json({
//       message: "Product data grouped by category",
//       data: result
//     });

//   } catch (error) {
//     console.log("getproduct error...", error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };


// export {items, getProduct};

















import Product from "../model/Product.js";

const items = async (req, res) => {
  try {
    const {
      category,
      name,
      description,
      price,
      pricePosition,
      image,
      variations,
      toppings,
      crustType,
      additionalNotes
    } = req.body;

    
   
console.log("req...", req.body)
    const created = await Product.insertOne({
      category,
      name,
      description,
      price,
      pricePosition,
      image,
      variations,
      toppings,
      crustType,
      additionalNotes
    });

    return res.status(200).json({ message: "Product added", created });
  } catch (error) {
    console.log("Create product error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const productData = await Product.find().populate("category");

    if (!productData) return res.status(404).json({ message: "No products" });

    const grouped = {};
    productData.forEach((prod) => {
      const cat = prod.category;
      const categoryId = cat._id.toString();

      if (!grouped[categoryId]) {
        grouped[categoryId] = { category: cat.category, description: cat.description, products: [] };
      }

      const p = prod.toObject();
      delete p.category;
      grouped[categoryId].products.push(p);
    });

    return res.status(200).json({ message: "OK", data: Object.values(grouped) });
  } catch (error) {
    console.log("Get products error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json({ message: "Product updated", updated });
  } catch (error) {
    console.log("Update product error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.log("Delete product error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export { items, getProduct, updateProduct, deleteProduct };
