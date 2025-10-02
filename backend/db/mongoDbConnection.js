import mongoose from "mongoose";

const mongoDbConnection = async() => {
    try {
        const con = await mongoose.connect(process.env.MONGO_DB_CONNECTION);
       console.log (`Db connected successfully...${con.connection.host}`);
        
    } catch (error) {
        console.log("Database connection error" , error.message)
    };
};

export default mongoDbConnection;