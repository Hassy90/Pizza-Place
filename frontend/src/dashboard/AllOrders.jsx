
// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../dashboard/adminCss/AllOrders.css";

// const AllOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get("http://localhost:8000/npm/order/orderdata");
//         setOrders(res.data.data || []);
        
//       } catch (err) {
//         console.error("Error fetching orders:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   if (loading) {
//     return <div className="order-page-wrapper loading">Loading orders...</div>;
//   }

//   return (
//     <div className="order-page-wrapper">
//       <h1 className="page-title">All Orders</h1>

//       {orders.length === 0 ? (
//         <p className="no-orders">No orders found.</p>
//       ) : (
//         <div className="orders-grid">
//           {orders.map((order, index) => (
//             <div key={order._id || index} className="order-card">
//               {/* Order Item */}
//               <div className="order-item">
            
//                 <div className="item-details">
//                   <div className="item-title">
//                     Order #{order.orderno || "N/A"}
//                   </div>
//                   <div className="item-price">${order.total}</div>
//                 </div>
//                 <div className="status-badge-wrapper">
//                   <span
//                     className={`status-badge ${
//                       order.status === "completed"
//                         ? "status-completed"
//                         : order.status === "pending"
//                         ? "status-pending"
//                         : "status-other"
//                     }`}
//                   >
//                     {order.status || "N/A"}
//                   </span>
//                 </div>
//               </div>

//               {/* Order Info */}
//               <div className="info-block">
//                 <span className="info-icon">👤</span>
//                 {order.first} {order.last}
//               </div>
//               <div className="info-block">
//                 <span className="info-icon">📞</span>
//                 {order.phone}
//               </div>
//               <div className="info-block">
//                 <span className="info-icon">📧</span>
//                 {order.email}
//               </div>
//               <div className="info-block">
//                 <span className="info-icon">🚚</span>
//                 {order.delivery}
//               </div>

//               {/* Order Details */}
//               <div className="info-block">
//                 <span className="info-icon">📝</span>
//                 {order.ordersummary}
//               </div>
//               <div className="info-block">
//                 <span className="info-icon">💵</span>
//                 Tip: ${order.tip}
//               </div>
//               <div className="info-block">
//                 <span className="info-icon">💳</span>
//                 Payment: {order.paymentmethod}
//               </div>

//               {/* Notes */}
//               {order.notes && (
//                 <div className="info-block">
//                   <span className="info-icon">🗒</span>
//                   Note: {order.notes}
//                 </div>
//               )}

//               {/* random no */}
//               {order.notes && (
//                 <div className="info-block">
//                   <span className="info-icon">🗒</span>
//                   Random no: {order.randomno}
//                 </div>
//               )}

//               {/* Date */}
//               <div className="info-block">
//                 <span className="info-icon">📅</span>
//                 Created: {new Date(order.createdAt).toLocaleString()}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

      
//     </div>
//   );
// };

// export default AllOrders;



import { useEffect, useState } from "react";
import axios from "axios";
import "../dashboard/adminCss/AllOrders.css";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:8000/npm/order/orderdata");
      setOrders(res.data.data || []);
    } catch (err) {
      console.error("Error fetching orders:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`http://localhost:8000/npm/order/deleteorder/${id}`);
      setOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (err) {
      console.error("Error deleting order:", err.message);
    }
  };

  const startEdit = (order) => {
    setEditId(order._id);
    setEditData({ ...order });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8000/npm/order/updateorder/${id}`,
        editData
      );
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? res.data.updated : order
        )
      );
      setEditId(null);
      setEditData({});
    } catch (err) {
      console.error("Error updating order:", err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="order-page-wrapper loading">Loading orders...</div>;
  }

  return (
    <div className="order-page-wrapper">
      <h1 className="page-title">📦 All Orders</h1>

      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              {editId === order._id ? (
                // Edit mode
                <div className="order-edit-form">
                  <input name="first" value={editData.first} onChange={handleChange} />
                  <input name="last" value={editData.last} onChange={handleChange} />
                  <input name="phone" value={editData.phone} onChange={handleChange} />
                  <input name="email" value={editData.email} onChange={handleChange} />
                  <input name="delivery" value={editData.delivery} onChange={handleChange} />
                  <textarea name="ordersummary" value={editData.ordersummary} onChange={handleChange}></textarea>
                  <input name="tip" type="number" step="0.01" value={editData.tip} onChange={handleChange} />
                  <input name="paymentmethod" value={editData.paymentmethod} onChange={handleChange} />
                  <textarea name="notes" value={editData.notes} onChange={handleChange}></textarea>
                  <input name="randomno" value={editData.randomno} onChange={handleChange} />
                  <select name="status" value={editData.status} onChange={handleChange}>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="processing">Processing</option>
                  </select>

                  <div className="order-actions">
                    <button className="update-btn" onClick={() => saveEdit(order._id)}>Save</button>
                    <button className="delete-btn" onClick={cancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                // View mode
                <>
                  <div className="order-header">
                    <div className="order-number">
                      Order #{order.orderno || "N/A"}
                    </div>
                    <span className={`status-badge ${order.status?.toLowerCase() || "other"}`}>
                      {order.status || "N/A"}
                    </span>
                  </div>

                  <div className="order-info">
                    <p>👤 {order.first} {order.last}</p>
                    <p>📞 {order.phone}</p>
                    <p>📧 {order.email}</p>
                    <p>🚚 {order.delivery}</p>
                    <p>📝 {order.ordersummary}</p>
                    <p>💵 Tip: ${order.tip}</p>
                    <p>💳 Payment: {order.paymentmethod}</p>
                    {order.notes && <p>🗒 Note: {order.notes}</p>}
                    <p>🔢 Random no: {order.randomno}</p>
                    <p>📅 {new Date(order.createdAt).toLocaleString()}</p>
                  </div>

                  <div className="order-actions">
                    <button className="update-btn" onClick={() => startEdit(order)}>Edit</button>
                    <button className="delete-btn" onClick={() => deleteOrder(order._id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrders;


