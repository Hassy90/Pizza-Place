import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
img:{
    type: String
},
logo:{
    type:String
},
title:{
    type:String
},
address:{
    type:String
},
time:{
    type:String
},
phone:{
    type:String
},
delivery:{
    type:String
},
breakfast:{
    type:String
},

});

const User = mongoose.model("user", userSchema);

export default User;