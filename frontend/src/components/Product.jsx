
import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/pages/css/Categories.css";
import SingleProduct from "../modals/SingleProduct";
import PriceProduct from "../modals/PriceProduct";


const Product = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(null); 
  const [addedProduct, setAddedProduct] = useState(null); 
  const [priceModalData, setPriceModalData] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/npm/product/getProduct");
      setProducts(response?.data?.data);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {products.map((item, index) => (
        <div className="starter-div" key={index}>
          <div className="indcide-div">
            <div className="prod-category">{item.category}</div>
            <div className="prod-discrip">{item.description}</div>

            {item.products?.map((pItem, idx) => (
              <div
                key={idx}
                className={`product1 ${item.category.toLowerCase()}-product`}
                onClick={() =>
                  setShowModal({
                    category: item.category,
                    description: item.description,
                    product: pItem,
                  })
                }
              >
                {pItem.pricePosition === "topRight" ? (
                  <div className="top-right">
                    <div className="prod-name">{pItem.name}</div>
                    <div className="prod-price">${pItem.price}</div>
                  </div>
                ) : (
                  <div className="prod-name">{pItem.name}</div>
                )}

                {pItem.pricePosition === "underTitle" && (
                  <div className="prod-price">${pItem.price}</div>
                )}

                <div className="prod-catdiscrip">{pItem.description}</div>

                {pItem.pricePosition === "default" && (
                  <div className="prod-price">${pItem.price}</div>
                )}

                <div className="img-div">
                  {pItem.img && (
                    <img
                      src={pItem.img}
                      alt={pItem.name}
                      style={{ width: "70px", height: "70px", marginLeft: "33px" }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal */}
      {showModal && (
        <SingleProduct
          data={showModal}
          setShowModal={setShowModal}
          setAddedProduct={setAddedProduct}
        />
      )}

      {/* Add to cart feedback button */}
      {addedProduct && (
        <div className="modal-bottom">
          <div style={{ marginTop: "10px" }}>
            <button className="btn-modal"  onClick={() =>
                  setPriceModalData({
                product: addedProduct.product,
                price: addedProduct.price.toFixed(2),
               selectedVariation: addedProduct.selectedVariation,
               selectedCrust: addedProduct.selectedCrust,
               selectedToppings: addedProduct.selectedToppings,
                  })
                  
                }>
              View Cart - ${addedProduct.price.toFixed(2)}
            </button>
          </div>
        </div>
      )}


      {/* Modal */}
      {priceModalData && (
        <PriceProduct
          datas={priceModalData}
          setPriceModalData={setPriceModalData}
          
        />
      )}
    </>
  );
};

export default Product;
