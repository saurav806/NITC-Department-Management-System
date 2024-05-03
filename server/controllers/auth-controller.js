const User = require("../models/user-model");
// const Project = require("../models/project-model");
// const bcrypt = require("bcryptjs");

// We created the page routes here 

const home = async(req, res) => {
    try {
        res
        .status(200)
        .send('welcome to my project under auth');
    } catch (error) {
        res.status(400).send({message:"error page"});
    }
}

//taking the data from the user

const register = async(req, res) => {
    try {
        // console.log(req.body);
        //step1
        const { firstname, lastname, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });

        if(userExist){
            return res.status(400).json({message: "email already exists"});
        }

        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound);

        const userCreated = await User.create({
            firstname,
            lastname, 
            email, 
            phone, 
            password,
        });

        res.status(200).json({
            msg: "Registration Successfull", 
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
    } catch (error) {
        res.status(500).json({message:"error page"});
    }
}


// User Login Logic here

const login = async(req, res) => {
    try {

        const {email, password} = req.body;

        const userExist = await User.findOne( { email });
        console.log(userExist);

        if(!userExist){
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // const user = await bcrypt.compare(password, userExist.password);
        const user = await userExist.comparePassword(password);

        if(user){
            res.status(200).json({
                msg: "Login successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            })
        }
        else{
            res.status(401).json({message:"Invalid email or password"});
        }

    } catch (error) {
        res.status(500).json({message:"login error page"});
    }
}


// Creating router for USER to send user data

const user = async (req, res) => {
    try {
        const userData = req.body;
        console.log(userData);
        return res.status(200).json({ userData });
    } catch (error) {
        res.status(500).json({message:"hellloo"});
        console.log(`error from the user route ${error}`);
    }
}



module.exports = {home, register, login, user}; 