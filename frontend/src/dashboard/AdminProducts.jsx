import React, { useState, useEffect } from "react";
import axios from "axios";
import "../dashboard/adminCss/AdminProducts.css";

function AdminProducts() {
  const [productsGrouped, setProductsGrouped] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);

  const [form, setForm] = useState({
    category: "",
    name: "",
    description: "",
    price: "",
    pricePosition: "",
    image: "",
    variations: [{ name: "", price: "" }],
    toppings: [{ name: "", price: "" }],
    crustType: [{ name: "", price: "" }],
    additionalNotes: ""
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getAllCategories();
    fetchProducts();
  }, []);

  function getAllCategories() {
    axios.get("http://localhost:8000/npm/category/allCategories")
      .then((res) => {
        setFoodCategories(res.data.data);
      })
      .catch((error) => {
        console.log("Category fetch error:", error);
      });
  }

  function fetchProducts() {
    axios.get("http://localhost:8000/npm/product/getProduct")
      .then((res) => {
        setProductsGrouped(res.data.data);
      })
      .catch((error) => {
        console.log("Product fetch error:", error);
      });
  }

  function handleInput(e) {
    const newForm = { ...form };
    newForm[e.target.name] = e.target.value;
    setForm(newForm);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editId) {
      axios.put(`http://localhost:8000/npm/product/update/${editId}`, form)
        .then(() => {
          clearForm();
          fetchProducts();
        })
        .catch((error) => {
          console.log("Update error:", error);
        });
    } else {
      axios.post("http://localhost:8000/npm/product/items", form)
        .then(() => {
          clearForm();
          fetchProducts();
        })
        .catch((error) => {
          console.log("Add error:", error);
        });
    }
  }

  function clearForm() {
    setForm({
      category: "",
      name: "",
      description: "",
      price: "",
      pricePosition: "",
      image: "",
      variations: [{ name: "", price: "" }],
      toppings: [{ name: "", price: "" }],
      crustType: [{ name: "", price: "" }],
      additionalNotes: ""
    });
    setEditId(null);
  }

  function editProduct(product) {
    setForm({
      category: product.category,
      name: product.name,
      description: product.description || "",
      price: product.price || "",
      pricePosition: product.pricePosition || "",
      image: product.image || "",
      variations: product.variations || [{ name: "", price: "" }],
      toppings: product.toppings || [{ name: "", price: "" }],
      crustType: product.crustType || [{ name: "", price: "" }],
      additionalNotes: product.additionalNotes || ""
    });
    setEditId(product._id);
  }

  function deleteProduct(id) {
    axios.delete(`http://localhost:8000/npm/product/delete/${id}`)
      .then(() => {
        fetchProducts();
      })
      .catch((error) => {
        console.log("Delete error:", error);
      });
  }

  // Handlers for nested fields
  function updateArrayField(fieldName, index, key, value) {
    const newList = [...form[fieldName]];
    newList[index][key] = value;
    setForm({ ...form, [fieldName]: newList });
  }

  function addArrayItem(fieldName) {
    const newList = [...form[fieldName]];
    newList.push({ name: "", price: "" });
    setForm({ ...form, [fieldName]: newList });
  }

  function removeArrayItem(fieldName, index) {
    const newList = form[fieldName].filter((_, i) => i !== index);
    setForm({ ...form, [fieldName]: newList });
  }

  return (
    <div className="admin-products-container">
      <h2 className="title">Admin Products Manager</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <select name="category" value={form.category} onChange={handleInput} className="input-field" required>
          <option value="">Select Category</option>
          {foodCategories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.category}</option>
          ))}
        </select>

        <input name="name" value={form.name} onChange={handleInput} placeholder="Product Name" className="input-field" required />
        <input name="description" value={form.description} onChange={handleInput} placeholder="Description" className="input-field" />
        <input name="price" value={form.price} onChange={handleInput} placeholder="Price" className="input-field" />
        <input name="pricePosition" value={form.pricePosition} onChange={handleInput} placeholder="Price Position" className="input-field" />
        <input name="image" value={form.image} onChange={handleInput} placeholder="Image URL" className="input-field" />

        {/* Variations */}
        <h4>Variations</h4>
        {form.variations.map((item, index) => (
          <div key={index} className="nested-group">
            <input
              type="text"
              value={item.name}
              placeholder="Variation Name"
              onChange={(e) => updateArrayField("variations", index, "name", e.target.value)}
              className="input-field"
            />
            <input
              type="number"
              value={item.price}
              placeholder="Variation Price"
              onChange={(e) => updateArrayField("variations", index, "price", e.target.value)}
              className="input-field"
            />
            {form.variations.length > 1 && (
              <button type="button" onClick={() => removeArrayItem("variations", index)} className="btn btn-remove">Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem("variations")} className="btn btn-add">Add Variation</button>

        {/* Toppings */}
        <h4>Toppings</h4>
        {form.toppings.map((item, index) => (
          <div key={index} className="nested-group">
            <input
              type="text"
              value={item.name}
              placeholder="Topping Name"
              onChange={(e) => updateArrayField("toppings", index, "name", e.target.value)}
              className="input-field"
            />
            <input
              type="number"
              value={item.price}
              placeholder="Topping Price"
              onChange={(e) => updateArrayField("toppings", index, "price", e.target.value)}
              className="input-field"
            />
            {form.toppings.length > 1 && (
              <button type="button" onClick={() => removeArrayItem("toppings", index)} className="btn btn-remove">Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem("toppings")} className="btn btn-add">Add Topping</button>

        {/* Crust Types */}
        <h4>Crust Types</h4>
        {form.crustType.map((item, index) => (
          <div key={index} className="nested-group">
            <input
              type="text"
              value={item.name}
              placeholder="Crust Name"
              onChange={(e) => updateArrayField("crustType", index, "name", e.target.value)}
              className="input-field"
            />
            <input
              type="number"
              value={item.price}
              placeholder="Crust Price"
              onChange={(e) => updateArrayField("crustType", index, "price", e.target.value)}
              className="input-field"
            />
            {form.crustType.length > 1 && (
              <button type="button" onClick={() => removeArrayItem("crustType", index)} className="btn btn-remove">Remove</button>
            )}
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem("crustType")} className="btn btn-add">Add Crust</button>

        {/* Additional Notes */}
        <textarea
          name="additionalNotes"
          value={form.additionalNotes}
          onChange={handleInput}
          placeholder="Additional Notes"
          className="input-field"
        />

        {/* Submit and Cancel */}
        <div className="buttons-group">
          <button type="submit" className="btn btn-submit">{editId ? "Update" : "Add"}</button>
          {editId && (
            <button type="button" onClick={clearForm} className="btn btn-cancel">Cancel</button>
          )}
        </div>
      </form>

      {/* Products List */}
      <div className="products-list">
        {productsGrouped.map((group, index) => (
          <div key={index} className="category-group">
            <h3 className="category-title">{group.category}</h3>
            {group.products.map((p) => (
              <div key={p._id} className="product-item">
                <span className="product-name">{p.name}</span>
                <span className="product-price">${p.price}</span>
                <div className="product-actions">
                  <button onClick={() => editProduct({ ...p, category: group.category })} className="btn btn-edit">Edit</button>
                  <button onClick={() => deleteProduct(p._id)} className="btn btn-delete">Delete</button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;
