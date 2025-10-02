
import jwt from "jsonwebtoken"

const generateAccessToken = (_payload) => {
    console.log("........payload", _payload);
   return  jwt.sign({_payload}, process.env.JWT_SECRET , {expiresIn: "2d"} );
};

const verifyAuthToken = () => {
    return async(req, res, next) => {
        const token = req.headers["authorization"];
        if(!token){
            res.status(403).send({message: "Token not Found"})
        } else {
            
        }
    }
}

export {generateAccessToken, verifyAuthToken};