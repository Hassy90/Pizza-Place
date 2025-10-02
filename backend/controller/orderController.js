
import Order from "../model/Order.js";

const getData = async(req, res) => {
    try {
        const letters = String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
        ) + String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
        );
        
        const numbers = Math.floor(100 + Math.random() * 900);
        const letterno = letters + numbers;

        const {delivery,first,last,phone,email,notes,status,orderno,ordersummary,tip,total,paymentmethod,terms} =  req.body;
         const newOrder = await Order.insertOne({delivery,first,last,phone,email,notes,status,orderno,ordersummary,tip,total,
            paymentmethod,terms,randomno:letterno})
            if(newOrder){
              return res.status(200).json({
                message: "data submitted successfully",
                data:newOrder
              })
            }

        
    } catch (error) {
        console.log(" Error from orderController", error.message)
    };
};



const orderData = async (req, res) => {
    try {
        const ordersData = await Order.find({});
        if (!ordersData){
            return res.status(404).json({message: "order not found"})
        }
        return res.status(200).json({message: "Order data is getting", 
            data: ordersData})
    } catch (error) {
        console.log("order data found  error...", error.message)
    }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
  return res.status(404).json({ message: "Order not found" });
}
    return res.status(200).json({ message: "Order updated", updated });
  } catch (error) {
    console.log("order updating error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    return res.status(200).json({ message: "order deleted" });
  } catch (error) {
    console.log("Delete order error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};



export {getData, orderData, updateOrder, deleteOrder};