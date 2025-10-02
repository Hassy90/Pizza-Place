import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaTruck } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
const BusinessHours = ({ showModal, setShowModal, phone }) => {

    const handleOverlayClick = (e) => {
        if (e.target.className === 'overlay') {
            setShowModal(false);
        }
    };
    return(<>

      <div className="overlay" onClick={handleOverlayClick}>
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
               <button className="btn-call">{phone}</button> </div>
              </div>
                    
              </div>
    
    </>);
};

export default BusinessHours;