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
import BusinessHours from "../modals/businessHours";

import { Link } from "react-router"

const Head = () => {

    const [showModal, setShowModal] = useState(false);
    const handleOverlayClick = (e) => {
        if (e.target.className === 'overlay') {
            setShowModal(false);
        }
    };

    return (
        <>
    {/* Header section */}
    <div className="cover">
    <img className="headerimg" src={pizza} alt="uploaded" />
    <img className="logoimg" src={logo} alt="logo" /> 
    </div>
    <br />
    <br />
    {/* 2nd section */}
    <div className="cover2">
    <h1 className="header-title">Pizza Place</h1>

        <div className="box-model">
        {/* Left White Box */}
        <div className="white-box">
        <div className="location-line">
        <span className="icon">
        <FaLocationDot /> &nbsp; 21612 Plano Trabuco Road, Trabuco Canyon, CA 92111
        </span>
        <button className="more-button" onClick={() => setShowModal(true)}>- More</button>
        </div>
        {showModal && (<>
        <BusinessHours/>
        {/* <div className="overlay" onClick={handleOverlayClick}>
        <div className="modal"> 
        <div className="model-1">Pizza Place</div><br/>

        <div className="model-2"><h2>&nbsp;&nbsp; <FaCalendarAlt className="about-icon"/>   About </h2>
         <p> &nbsp;&nbsp;&nbsp; We're all about making good food for locals.</p></div><br/>

         <div className="model-3"><h2>&nbsp;&nbsp; <FaLocationDot  className="about-icon"/>   Address </h2>
         <p> &nbsp;&nbsp;&nbsp; 21612 Plano Trabuco Road, </p>
         <p> &nbsp;&nbsp;&nbsp; Trabuco Canyon, CA 92111</p></div><br/>

         <div className="model-4"><h2>&nbsp;&nbsp; <FaTruck  className="about-icon"/>   Delivery </h2>
         <div class="single-line1 ">
		  <p> &nbsp;&nbsp; Sunday</p>
		09:00 AM - 11:00 PM	&nbsp;&nbsp; </div>
		 <div class="single-line ">
        <p>&nbsp;&nbsp; Friday</p>
		09:00 AM - 09:00 PM	&nbsp;&nbsp; </div>
	  <div class="single-line">
		<p> &nbsp;&nbsp; Saturday</p>
		09:00 AM - 12:00 AM &nbsp;&nbsp;	</div>

        <h2>&nbsp;&nbsp; <FaShoppingBag  className="about-icon"/>   Pickup </h2>
         <div class="single-line1 ">
		  <p> &nbsp;&nbsp; Sunday</p>
          02:00 AM - 12:00 PM	&nbsp;&nbsp; </div>
		 <div class="single-line ">
        <p>&nbsp;&nbsp; Monday</p>
		12:00 AM - 12:00 AM	&nbsp;&nbsp; </div>
	  <div class="single-line">
		<p> &nbsp;&nbsp; Tuesday</p>
		12:00 AM - 12:00 PM &nbsp;&nbsp;	</div>
        <div class="single-line">
		<p> &nbsp;&nbsp; Wednesday</p>
		09:00 AM - 11:59 PM &nbsp;&nbsp;	</div>
        <div class="single-line">
		<p> &nbsp;&nbsp; Thursday</p>
		08:00 AM - 11:59 PM &nbsp;&nbsp;	</div>
        <div class="single-line">
		<p> &nbsp;&nbsp; Friday</p>
		12:00 AM - 11:59 PM &nbsp;&nbsp;	</div>
        <div class="single-line">
		<p> &nbsp;&nbsp; Saturday</p>
		11:10 PM - 11:12 PM &nbsp;&nbsp;	</div>
         </div><br/>
         <div className="single-last">
         <button className="btn-call">Call (949) 555-1234</button> </div>
        </div>
              
        </div> */}
        </>)}
        <br />

        <span style={{ color: "green" }}>
        <MdOutlineAccessTimeFilled /> &nbsp;&nbsp; Open until - 11:59 PM
        <button className="more-button" onClick={() => setShowModal(true)}>- Full Hours</button>
        </span><br /><br />
        <span>
       <FaStar /> &nbsp;&nbsp; (949) 555-1234
        </span>
        </div>

        {/* Right Notification Box */}
        <div className="notifications">
        <span>
        <FaShoppingBag /> &nbsp; Store Pickup: 15 Minutes -{" "}
        <Link
        className="direction-link"
        to="https://www.google.com/maps/dir//Pho+O-Oh+Tasty+22245+El+Paseo+Suite+A+Rancho+Santa+Margarita,+CA+92688"
        target="_blank"
        rel="noopener noreferrer"
            > Get Directions  </Link> </span><br/>
        <span>
         <FaTruck /> &nbsp; Delivery: 45 Minutes / up to 3 Miles </span><br />
        <span>
        <MdEmojiFoodBeverage /> &nbsp; Breakfast Served All Day!
            </span>
                </div>
                </div>
                </div>
        </>
    );
};
export default Head;








