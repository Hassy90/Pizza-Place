
import { useState } from "react";
import "../assets/pages/css/Categories.css"
import axios from "axios";
import { useEffect } from "react";

const Categories = () => {

    const [foodCategories, setFoodCatogries] = useState([])

    const getData = async () => {
  try {
    const data = await axios.get(`http://localhost:8000/npm/category/allCategories`);
    // console.log("Data....", data.data);
    setFoodCatogries(data?.data?.data)
  } catch (error) {
    console.log(error.message);
  }
};

useEffect(() => {
  getData();
}, []);

    return(<> 
    <div className="sticky-menu">
    <div className="nav-menu">
        {foodCategories.map((cat)=>(<>
    <span className="cate-gories" >{cat.category}</span>
    
      </>  ))}
    
     </div>
     </div>

    </>)
};
export default Categories;