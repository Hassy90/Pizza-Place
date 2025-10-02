import User from "../model/User.js";

const header = async(req, res) => {
    try {
        const {img,logo,title,address,time,phone,delivery,breakfast} =  req.body;
        await User.insertOne({img,logo,title,address,time,phone,delivery,breakfast})
        return res.status(200).json({message: "data submitted successfully"})
    } catch (error) {
        console.log("Header error", error.message)
    };
};

const getHeader = async (req, res) => {
    try {
        const headers = await User.find(); 
        return res.status(200).json(headers);
    } catch (error) {
        console.log("Get Header error", error.message);
        return res.status(500).json({ error: "Failed to fetch header data" });
    }
};

export {header, getHeader};