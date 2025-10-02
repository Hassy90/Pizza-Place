
import "../assets/pages/css/SingleProduct.css";
import { useState, useEffect } from "react";

const SingleProduct = ({ data, setShowModal, setAddedProduct }) => {
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedCrust, setSelectedCrust] = useState(null);
  const [price, setPrice] = useState(0);

  const { product } = data;

  const handleOverlayClick = (e) => {
    if (e.target.className === "over-lay") {
      setShowModal(null);
    }
  };

  const totalPrice =
    (selectedVariation?.price || 0) +
    (selectedCrust?.price || 0) +
    selectedToppings.reduce((sum, t) => sum + (t.price || 0), 0);

         const price1 = () => {
      setPrice(totalPrice)
     }
    
      const increasePrice = () => {
   setPrice(prev => prev + totalPrice);
       };

    const decreasePrice = () => {
       setPrice(prev => Math.max(totalPrice, prev - totalPrice));
    };

  useEffect(() => {
    setPrice(totalPrice);
  }, [selectedVariation, selectedCrust, selectedToppings]);

  return (
    <div className="over-lay" onClick={handleOverlayClick}>
      <div className="model">
        <div className="header-btn">
          <button className="close-btn1" onClick={() => setShowModal(null)}>
            X
          </button>
        </div>

        <div>
          {product.image && (
            <img className="image-show" src={product.image} alt={product.name} />
          )}
          <div className="name-price">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
          <p className="para-top">{product.description}</p>
          <hr />

          {/* Variations */}
          {product.variations?.length > 0 && (
            <>
              <div className="name-price">
                <h4>Variation</h4>
                <p><em>1 Required</em></p>
              </div>
              {product.variations.map((variation, idx) => (
                <label key={idx} className="label-radio">
                  <div className="name-price">
                    <div className="left-side">
                      <input
                        type="radio"
                        name="variationOption"
                        onChange={() => setSelectedVariation(variation)}
                      />
                      <span className="variation-name">{variation.name}</span>
                    </div>
                    <span className="variation-price">${variation.price}</span>
                  </div>
                </label>
              ))}
              <hr />
            </>
          )}

          {/* Toppings */}
          {product.toppings?.length > 0 && (
            <>
              <div className="name-price">
                <h4>Toppings</h4>
                <p><em>Optional</em></p>
              </div>
              {product.toppings.map((topping, idx) => (
                <label key={idx} className="label-radio">
                  <div className="name-price">
                    <div className="left-side">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedToppings([...selectedToppings, topping]);
                          } else {
                            setSelectedToppings(
                              selectedToppings.filter((t) => t.name !== topping.name)
                            );
                          }
                        }}
                      />
                      <span className="variation-name">{topping.name}</span>
                    </div>
                    <span className="variation-price">${topping.price}</span>
                  </div>
                </label>
              ))}
              <hr />
            </>
          )}

          {/* Crust */}
          {product.crustType?.length > 0 && (
            <>
              <div className="name-price">
                <h4>Crust Type</h4>
                <p><em>Required</em></p>
              </div>
              {product.crustType.map((crust, idx) => (
                <label key={idx} className="label-radio">
                  <div className="name-price">
                    <div className="left-side">
                      <input
                        type="radio"
                        name="crustOption"
                        onChange={() => setSelectedCrust(crust)}
                      />
                      <span className="variation-name">{crust.name}</span>
                    </div>
                    <span className="variation-price">${crust.price}</span>
                  </div>
                </label>
              ))}
              <hr />
        
            </>
          )}
        </div>

        
              {/* Notes */}
{product.additionalNotes !== undefined && (
  <div className="notes-section">
    <p><strong>Additional Notes:</strong></p>
    <textarea className="text-portion">
      {product.additionalNotes || "No notes added."}
    </textarea>
  </div>
)}


        {/* Bottom Buttons */}
        {(selectedVariation || selectedToppings.length > 0 || selectedCrust) && (
          <div className="modal-bottom">
             <button className="close-btn2" onClick={increasePrice}>+</button>
          <button className="close-btn3" onClick={decreasePrice}>-</button>
            <button
              className="btn-modal"
              onClick={() => {
                setAddedProduct({ product, price, selectedVariation, selectedCrust, selectedToppings }); 
                setShowModal(null); 
              }}
            >
              Add to cart - ${price.toFixed(2)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;





