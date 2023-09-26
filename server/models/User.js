const mongoose = require('mongoose');
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type:String,
    required: [true, "Enter a Name"],
    },
    email: {
        type: String,
        required: [true, "Enter valid Email"],
        unique: true,
        validate: [isEmail, "Please enter vslid email"],
    },
    password: {
        type: String,
        required: [true, "PLease enter password"],
        minlLength:[6,"Minimum password length is6 "]
    }
});

const User = mongoose.model("user", userSchema)

module.exports= User