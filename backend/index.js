
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoDbConnection from "./db/mongoDbConnection.js"
import * as routes from "./routes/index.js"

const app = express();
app.use(cors())
app.use(express.json({limit:"5mb"}));
app.use (express.urlencoded({extended: true}));

dotenv.config();
const PORT = process.env.PORT || 8000;

app.use("/npm" , routes.router);

app.listen(PORT, ()=> {
    console.log(`App is runing on ${PORT}.....`);
    mongoDbConnection()
});

