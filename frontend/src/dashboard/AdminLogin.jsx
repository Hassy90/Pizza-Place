// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../dashboard/adminCss/AdminLogin.css"

// const AdminLogin = () => {

//     const navigate = useNavigate()
//     const [error, setError] = useState({});
//    const [data, setData] = useState({
//     email: "",
//     password: ""
//    });
   
//    const handler = (e) => {
//     let {name, value} = e.target
//     setData((prevData)=>({
//         ...prevData,
//         [name] : value
//         }))
//     };

//     const formSubmitted = (e) => {
//        e.preventDefault()
//        if(validate()){
//         navigate("/adminpage")
//        }
//     }

//     const validate = () => {
//        let valid = true;
//        let tempError = {}; 
//        if(!data.email){
//         tempError.email = "Email is Required"
//         valid = false
//          };
//          if(!data.password){
//             tempError.password = "Password is Required"
//             valid = false
//          }; 
//          setError(tempError)
//          return valid;           
//     };

//    return(<>
//    <div className="login-wrapper">
//    <div className="formcontainer">
//         <form onSubmit={formSubmitted} className="loginform">
//         <div>
//     <label className ="labels">Email:</label>   
//          <input className="inputs"
//          type="email"
//          name="email"
//          value={data.email}
//          placeholder="Email"
//          onChange={(e)=>{
//             handler(e)
//             if(error){
//                 setError("")
//             };
//          }}
//          /> <br/>
//          {error.email && <span style={{color: "red"}}>{error.email}</span>}
//          <br/>  
//     </div>
//     <div>
//     <label className="labels">Password:</label>   
//          <input className="inputs"
//          type="password"
//          name="password"
//          value={data.password}
//          placeholder="Password"
//          onChange={(e)=>{
//             handler(e)
//             if(error){
//                 setError("")
//             };
//          }}
//          /><br/>
//          {error.password && <span style={{color: "red"}}>{error.password}</span>}
//          <br/>   
//     </div> 
//     <div>
//        <button id="butn" type="submit">Login</button> 
//         </div>  
//         </form>
//     </div>
//     </div>
//     </>);
// };



// export default AdminLogin;






import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../dashboard/adminCss/AdminLogin.css";

const AdminLogin = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState({});
    const [backendError, setBackendError] = useState("");

    const handler = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setBackendError("");
    };

    const validate = () => {
        let valid = true;
        let tempError = {};

        if (!data.email) {
            tempError.email = "Email is required";
            valid = false;
        }

        if (!data.password) {
            tempError.password = "Password is required";
            valid = false;
        }

        setError(tempError);
        return valid;
    };

    const formSubmitted = async (e) => {
        e.preventDefault();

        if (validate()) {
            try {
                const response = await axios.post("http://localhost:8000/npm/admin/checklogin", {
                    email: data.email,
                    password: data.password,
                });

                if (response.status === 200) {
                    alert(response.data.message);
                    // ✅ Store admin info in localStorage
                    localStorage.setItem("admin", JSON.stringify(response.data.data));
                    // ✅ Navigate to admin dashboard
                    navigate("/adminpage");
                } else {
                    setBackendError(response.data.message || "Login failed");
                }
            } catch (err) {
                console.error("Login request error:", err);
                if (err.response && err.response.data && err.response.data.message) {
                    setBackendError(err.response.data.message);
                } else {
                    setBackendError("Something went wrong. Please try again.");
                }
            }
        }
    };

    return (
        <div className="login-wrapper">
            <div className="formcontainer">
                <form onSubmit={formSubmitted} className="loginform">
                    <div>
                        <label className="labels">Email:</label>
                        <input
                            className="inputs"
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="Email"
                            onChange={handler}
                        />
                        {error.email && <span style={{ color: "red" }}>{error.email}</span>}
                    </div>

                    <div>
                        <label className="labels">Password:</label>
                        <input
                            className="inputs"
                            type="password"
                            name="password"
                            value={data.password}
                            placeholder="Password"
                            onChange={handler}
                        />
                        {error.password && <span style={{ color: "red" }}>{error.password}</span>}
                    </div>

                    {backendError && (
                        <div style={{ color: "red", marginTop: "10px" }}>{backendError}</div>
                    )}

                    <div>
                        <button id="butn" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;


