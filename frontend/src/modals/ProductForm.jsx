

import { useState } from "react";
import axios from "axios";
import OrderComplete from "./OrderComplete";
import "./ProductForm.css";

const ProductForm = ({ data, setShowModal }) => {
  const [formData, setFormData] = useState({
    delivery: "Store Pickup",
    first: "",
    last: "",
    phone: "",
    email: "",
    notes: "",
    tip: "0",
    total: data.price || "0",
    paymentmethod: "",
    terms: false
  });

  const [showOrderComplete, setShowOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const validate = () => {
    let temp = {};
    if (!formData.first) temp.first = "First name is required";
    if (!formData.last) temp.last = "Last name is required";
    if (!formData.phone) temp.phone = "Phone number is required";
    if (!formData.email) temp.email = "Email is required";
    if (!formData.paymentmethod) temp.paymentmethod = "Select a payment method";
    if (!formData.terms) temp.terms = "You must agree to terms";
    setError(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/npm/order/getdata", {
        ...formData,
        ordersummary: data.product?.name || "Product",
        status: "Pending",
        orderno: Date.now().toString()
      });
  console.log("respose......", res.data)
  debugger;
      setOrderId(res.data.data.randomno); // save orderId
      setShowOrderComplete(true);
    } catch (err) {
      console.error("Order submission error:", err);
      alert("Failed to submit order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (showOrderComplete) {
    return (
      <div className="over-laying">
        <OrderComplete onClose={() => setShowModal(null)} orderId={orderId} />
      </div>
    );
  }

  const salesTax = (data.price * 0.087).toFixed(2);
  const totalPrice = (
    parseFloat(data.price) +
    parseFloat(formData.tip) +
    parseFloat(salesTax)
  ).toFixed(2);

  return (
    <div className="over-laying">
      <div className="modals">
        <div className="modal-header">
          <button className="close-btn" onClick={() => setShowModal(null)}>X</button>
          <h2>Review Order</h2>
        </div>

        <form onSubmit={handleSubmit} className="order-form">
          {/* Delivery Method */}
          <div className="section">
            <h4>Delivery Method</h4>
            <label>
              <input
                type="radio"
                name="delivery"
                value="Local Delivery"
                checked={formData.delivery === "Local Delivery"}
                onChange={handleChange}
              /> Local Delivery
            </label>
            <label>
              <input
                type="radio"
                name="delivery"
                value="Store Pickup"
                checked={formData.delivery === "Store Pickup"}
                onChange={handleChange}
              /> Store Pickup
            </label>
            {(formData.delivery === "Store Pickup" || formData.delivery === "Local Delivery") && (
              <p className="pickup-note">Allow 20 minutes for pickup</p>
            )}
          </div>

          {/* Contact Info */}
          <div className="section">
            <h4>Contact Information</h4><br/>
            <label>First Name:
            <input className="section-inputs" name="first" placeholder="First Name" value={formData.first} onChange={handleChange} /> </label>
            {error.first && <span className="error">{error.first}</span>}
            
            <label>Last Name:
            <input className="section-inputs" name="last" placeholder="Last Name" value={formData.last} onChange={handleChange} /></label>
            {error.last && <span className="error">{error.last}</span>}
            
            <label>Phone no:
            <input className="section-inputs" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} /></label>
            {error.phone && <span className="error">{error.phone}</span>}
            
            <label>Email:
            <input className="section-inputs" name="email" placeholder="Email" value={formData.email} onChange={handleChange} /></label>
            {error.email && <span className="error">{error.email}</span>}
            
            <label>Additional Information (Optional):
            <textarea className="section-textareas" name="notes" placeholder="Additional Information (Optional)" value={formData.notes} onChange={handleChange} /></label>
          </div>

          {/* Order Summary */}
          <div className="section">
            <h4>Order Summary</h4>
            <p>Subtotal: ${data.price}</p>
            <p>Sales Tax: ${salesTax}</p>
            <p>Tip:</p>
            {["0", "2.54", "3.05", "3.39", "3.73"].map((tip) => (
              <button
                type="button"
                key={tip}
                onClick={() => setFormData({ ...formData, tip })}
                className={`tip-btn ${formData.tip === tip ? "active" : ""}`}
              >
                {tip === "0" ? "No Tip" : `$${tip}`}
              </button>
            ))}
            <p className="total">
              Total: ${totalPrice}
            </p>
          </div>

          {/* Payment Method */}
          <div className="section">
            <h4>Payment Method</h4>
            {["Cash on Delivery", "Card (Stripe)", "PayPal"].map((method) => (
              <label key={method}>
                <input
                  type="radio"
                  name="paymentmethod"
                  value={method}
                  checked={formData.paymentmethod === method}
                  onChange={handleChange}
                /> {method}
              </label>
            ))}
            {error.paymentmethod && <span className="error">{error.paymentmethod}</span>}
          </div>

          {/* Terms */}
          <div className="section">
            <label>
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              /> I agree with the Terms and Conditions.
            </label>
            {error.terms && <span className="error">{error.terms}</span>}
          </div>

          {/* Submit */}
          <div className="submit-section">
            <button className="place-order-btn" type="submit" disabled={loading}>
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;


