
import ProductForm from "./ProductForm";
import { useState } from "react";

const PriceProduct = ({ datas, setPriceModalData }) => {
  const { product, price, selectedVariation, selectedCrust, selectedToppings } = datas;
  const [view, setView] = useState("summary"); 

  const handleClose = () => {
    setPriceModalData(null);
    setView("summary");
  };

  return (
    <div className="over-lay">
      {view === "summary" ? (
        <div className="model">
          <div className="header-btn">
            <button className="close-btn1" onClick={handleClose}>
              X
            </button>
          </div><br/><br/>

          <h1 style={{ marginLeft: "12px" }}>{product.name}</h1>
          <p style={{ marginLeft: "12px" }}><strong>Total Price:</strong> ${price}</p>

          {selectedVariation && (
            <p style={{ marginLeft: "12px" }}><strong>Variation:</strong> {selectedVariation.name}</p>
          )}

          {selectedCrust && (
            <p style={{ marginLeft: "12px" }}><strong>Crust:</strong> {selectedCrust.name}</p>
          )}

          {selectedToppings?.length > 0 && (
            <>
              <p style={{ marginLeft: "12px" }}><strong>Toppings:</strong></p>
              <ul>
                {selectedToppings.map((topping, idx) => (
                  <li key={idx}>{topping.name}</li>
                ))}
              </ul>
            </>
          )}

          <div className="modal-bottom">
            <div style={{ marginTop: "10px" }}>
              <button
                className="btn-modal"
                onClick={() => setView("productForm")} 
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <ProductForm
          data={datas}
          setView={setView}
          setShowModal={() => setView("summary")} 
        />
      )}
    </div>
  );
};

export default PriceProduct;
