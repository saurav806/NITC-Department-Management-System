const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const btechStudentsSchema = new mongoose.Schema({
    rollno:{
        type:String,
        required:true,
    },
    firstname:{
        type:String,
        require:true,
    },
    lastname:{
        type:String,
        require:false,
    },
    batch:{
        type:String,
        require:true,
    },
    course:{
        type:String,
        require:true,
    },
    department:{
        type:String,
        require:true,
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
    isAdmin:{
        type:Boolean,
        default: false,
    }
});


/******** ----- 
Hashing the Password
********/

btechStudentsSchema.pre("save", async function (next) {

    const btech = this;

    if(!btech.isModified("password")){
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(btech.password, saltRound);
        btech.password = hash_password;
    } catch (error) {
        next(error);
    }
})

/******** ----- 
Hashing the Password
********/


// Comparing the password

btechStudentsSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

// generating the JWT (java web token) for the authentication


btechStudentsSchema.methods.generateToken = async function () {
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

const Btech = new mongoose.model("Btech", btechStudentsSchema);

module.exports = Btech;