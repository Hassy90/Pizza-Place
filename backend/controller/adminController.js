import Admin from "../model/admin.js";
import { hassPassword } from "../utilities/passwordEncription.js";
import bcrypt from 'bcrypt';

const adminLogin = async(req, res) => {
    try {
        const {email, password} =  req.body;
        const hashedPassword = await hassPassword(password)
        await Admin.insertOne({email, password: hashedPassword})
        return res.status(200).json({message: "data submitted successfully"})
    } catch (error) {
        console.log("category-portion error", error.message)
    };
};


const checkLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Admin.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        return res.status(200).json({ message: "Login successful", data: user });

    } catch (error) {
        console.error("Login error:", error.message);
        return res.status(500).json({ message: "Server error" });
    }
};


const updateAdmin = async (req, res) => {
    try {
        const { oldEmail, email, password } = req.body;

        const user = await Admin.findOne({ email: oldEmail });
        if (!user) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.email = email;
        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            message: "Admin info updated",
            data: { email: user.email }, // Don't return password
        });
    } catch (err) {
        console.error("Admin update error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};




export {adminLogin, checkLogin,updateAdmin};