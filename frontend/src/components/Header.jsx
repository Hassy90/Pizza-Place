
import { useState } from "react";
import pizza from "../assets/images/pizza.jpeg"
import logo from "../assets/images/logo.jpg"
import "../assets/pages/css/Header.css"
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { MdEmojiFoodBeverage } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
// import BusinessHours from "../modals/businessHours";
import BusinessHours from '../modals/BusinessHours';
import { Link } from "react-router"
import axios from "axios"
import { useEffect } from "react";

const Header = () => {

  const [heading, setHeading] = useState({});

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/npm/run/getheader");
      const gettingData = response.data[0];
      // console.log("Data sent:", response.data);

      setHeading(gettingData)
    } catch (error) {
      console.log("Error getting data:", error.message);
    }
  };

  useEffect(()=>{
     getData()
  }, []);
 
    const [showModal, setShowModal] = useState(false);
   

    return (
        <>
    {/* Header section */}

      <>
  <div className="cover">
    <img className="headerimg" src={heading.img} alt="Header" />
    <img className="logoimg" src={heading.logo} alt="Logo" />
  </div>


    <br />
    <br />
    {/* 2nd section */}
    <div className="cover2">
    <h1 className="header-title">{heading.title}</h1>

        <div className="box-model">
        {/* Left White Box */}
        <div className="white-box">
        <div className="location-line">
        <span className="icon">
        <FaLocationDot /> &nbsp; {heading.address}
        </span>
        <button className="more-button" onClick={() => setShowModal(true)}>- More</button>
        </div>
        {showModal && (<>
        <BusinessHours 
  showModal={showModal} 
  setShowModal={setShowModal} 
  phone={heading.phone} 
/>
        </>)}
        

        <span style={{ color: "green" }}>
        <MdOutlineAccessTimeFilled /> &nbsp;&nbsp; {heading.time}
        <button className="more-button" onClick={() => setShowModal(true)}> Full Hours</button>
        </span>
        <span style={{ color: "black" }}>
       <FaStar /> &nbsp;&nbsp; {heading.phone}
        </span>
        </div>

        {/* Right Notification Box */}
        <div className="notifications">
        <span style={{ color: "black" }}>
        <FaShoppingBag /> &nbsp; {heading.pickup}
        <Link
        className="direction-link"
        to="https://www.google.com/maps/dir//Pho+O-Oh+Tasty+22245+El+Paseo+Suite+A+Rancho+Santa+Margarita,+CA+92688"
        target="_blank"
        rel="noopener noreferrer"
            > Get Directions  </Link> </span><br/>
        <span style={{ color: "black" }}>
         <FaTruck /> &nbsp; {heading.delivery} </span><br />
        <span style={{ color: "black" }}>
        <MdEmojiFoodBeverage /> &nbsp; {heading.breakfast}
            </span>
                </div>
                </div>
                </div>
              </>  
        </>
    );
};
export default Header;








