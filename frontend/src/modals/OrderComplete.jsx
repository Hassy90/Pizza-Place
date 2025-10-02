
const OrderComplete = ({ onClose, orderId }) => {
  return (
    <div className="modals">
      <div className="modal-header">
        <button className="close-btn" onClick={onClose}>X</button>
      </div>

      <h1 style={{ marginLeft: "12px" }}>🎉 Order Complete!</h1>
      <p style={{ marginLeft: "12px" }}>Thank you for your order. Your order should arrive within 45 minutes.</p>
      <p style={{ marginLeft: "187px", borderRadius: "8px", backgroundColor: "green",
         width: "145px", fontSize: "52px", color: "white" }}>{orderId}</p>

      <div className="modal-bottom" style={{ marginTop: "20px" }}>
        <button className="btn-modal" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderComplete;



