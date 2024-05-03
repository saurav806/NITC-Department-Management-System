const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        require:true,
    },
    lastname:{
        type:String,
        require:false,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    isFaculty:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default: false,
    }
});


/******** ----- 
Hashing the Password
********/

userSchema.pre("save", async function (next) {

    const user = this;

    if(!user.isModified("password")){
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
})

/******** ----- 
Hashing the Password
********/


// Comparing the password

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

// generating the JWT (java web token) for the authentication


userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
            process.env.JWT_SECRET_KEY, 
            {
                expiresIn: "30d",
            }
        )
    } catch (error) {
        console.error(error);
    }
};

const User = new mongoose.model("User", userSchema);

module.exports = User;