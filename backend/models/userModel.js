const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'first name is required'],
        unique: true
    },
    lastname: {
        type: String,
        required: [true, 'last name is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [6, 'password must have at least (6) caracters'],
    },
    score:{
        type: Number,
        default: 0
    }
}, {timestamps: true})

//encrypting password before saving
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//compare user password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//return a JWT Token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({
        id: this.id,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        score: this.score
    }, process.env.JWT_SECRET, {
        expiresIn: 84000
    });
}


module.exports = mongoose.model("User", userSchema);