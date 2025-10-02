// import { useState, useEffect } from "react";
// import axios from "axios";
// import "../dashboard/adminCss/AdminCategory.css";

// const AdminCategory = () => {
//   const [foodCategories, setFoodCategories] = useState([]);

//   const getData = async () => {
//     try {
//       const data = await axios.get(`http://localhost:8000/npm/category/allCategories`);
//       setFoodCategories(data?.data?.data);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <>
//       <div className="admin-sticky-menu">
//         <div className="admin-nav-menu">
//           {foodCategories.map((cat) => (
//             <span className="admin-category-item" key={cat.category}>
//               {cat.category}
//             </span>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminCategory;



// import { useState, useEffect } from "react";
// import axios from "axios";
// import "../dashboard/adminCss/AdminCategory.css";

// const AdminCategory = () => {
//   const [foodCategories, setFoodCategories] = useState([]);
//   const [form, setForm] = useState({ category: "", description: "" });
//   const [editingId, setEditingId] = useState(null);

//   const getData = async () => {
//     try {
//       const data = await axios.get(`http://localhost:8000/npm/category/allCategories`);
//       setFoodCategories(data?.data?.data);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await axios.put(`http://localhost:8000/npm/category/update/${editingId}`, form);
//       } else {
//         await axios.post(`http://localhost:8000/npm/category/create`, form);
//       }
//       setForm({ category: "", description: "" });
//       setEditingId(null);
//       getData();
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/npm/category/delete/${id}`);
//       getData();
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const handleEdit = (cat) => {
//     setForm({ category: cat.category, description: cat.description });
//     setEditingId(cat._id);
//   };

//   return (
//     <div className="admin-sticky-menu">
//       <h2>Admin Category Manager</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={form.category}
//           placeholder="Category Name"
//           onChange={(e) => setForm({ ...form, category: e.target.value })}
//           required
//         />
//         <input
//           type="text"
//           value={form.description}
//           placeholder="Description"
//           onChange={(e) => setForm({ ...form, description: e.target.value })}
//           required
//         />
//         <button type="submit">{editingId ? "Update" : "Add"}</button>
//       </form>

//       <div className="admin-nav-menu">
//         {foodCategories.map((cat) => (
//           <div key={cat._id} className="admin-category-item">
//             <strong>{cat.category}</strong> - {cat.description}
//             <button onClick={() => handleEdit(cat)}>Edit</button>
//             <button onClick={() => handleDelete(cat._id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminCategory;






import { useState, useEffect } from "react";
import axios from "axios";
import "../dashboard/adminCss/AdminCategory.css";

const AdminCategory = () => {
  const [foodCategories, setFoodCategories] = useState([]);
  const [form, setForm] = useState(
    { 
      category: "",
       description: "" 
      });
  const [editingId, setEditingId] = useState(null);

  
  const getAllCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/npm/category/allCategories");
      setFoodCategories(res.data.data);
    } catch (error) {
      console.log("Get Error:", error.message);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  
  const createCategory = async () => {
    try {
      await axios.post("http://localhost:8000/npm/category/create", form);
      clearForm();
      getAllCategories();
    } catch (error) {
      console.log("Create Error:", error.message);
    }
  };

  
  const updateCategory = async () => {
    try {
      await axios.put(`http://localhost:8000/npm/category/update/${editingId}`, form);
      clearForm();
      getAllCategories();
    } catch (error) {
      console.log("Update Error:", error.message);
    }
  };

  
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/npm/category/delete/${id}`);
      getAllCategories();
    } catch (error) {
      console.log("Delete Error:", error.message);
    }
  };

  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateCategory(); 
    } else {
      createCategory(); 
    }
  };

  const handleInputChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
};

  const handleEdit = (cat) => {
    setForm({ category: cat.category, description: cat.description });
    setEditingId(cat._id);
  };

  const clearForm = () => {
    setForm({ category: "", description: "" });
    setEditingId(null);
  };

  return (
    <div className="admin-dashboard-wrapper">
      <h2 className="admin-title">Admin Category Manager</h2>

      <form onSubmit={handleFormSubmit} className="admin-form">
        <input
          type="text"
          name="category"
          value={form.category}
          placeholder="Category Name"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="admin-submit-btn">
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button type="button" onClick={clearForm} className="admin-cancel-btn">
            Cancel
          </button>
        )}
      </form>

      <div className="admin-nav-menu">
        {foodCategories.map((cat) => (
          <div key={cat._id} className="admin-category-card">
            <div className="admin-category-info">
              <strong>{cat.category}</strong>
              <p>{cat.description}</p>
            </div>
            <div className="admin-btn-group">
              <button className="admin-edit-btn" onClick={() => handleEdit(cat)}>Edit</button>
              <button className="admin-delete-btn" onClick={() => deleteCategory(cat._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategory;

