const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const facultySchema = new mongoose.Schema({
    facID:{
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
    office:{
        type:String,
        require:true,
    },
    permanent:{
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
    isFaculty:{
        type:Boolean,
        default: true,
    },
    isAdmin:{
        type:Boolean,
        default: false,
    }
});



/******** ----- 
Hashing the Password
********/

facultySchema.pre("save", async function (next) {

    const faculty = this;

    if(!faculty.isModified("password")){
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(faculty.password, saltRound);
        faculty.password = hash_password;
    } catch (error) {
        next(error);
    }
})

/******** ----- 
Hashing the Password
********/


// Comparing the password

facultySchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

// generating the JWT (java web token) for the authentication


facultySchema.methods.generateToken = async function () {
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

const Faculty = new mongoose.model("Faculty", facultySchema);

module.exports = Faculty;