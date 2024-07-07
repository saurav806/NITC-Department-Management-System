const User = require("../models/user-model");
const Btech = require("../models/users/btech_students");
const Faculty = require("../models/users/faculty");
const Mtech = require("../models/users/mtech_students");
const Phd = require("../models/users/phd_students");
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
        console.log(req.body);
        //step1
        const { rollno, firstname, lastname, batch, course, department, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });
        const userExist2 = await Btech.findOne({ email });
        const userExist3 = await Mtech.findOne({ email });
        const userExist4 = await Phd.findOne({ email });

        if(userExist || userExist2 || userExist3 || userExist4){
            return res.status(400).json({message: "email already exists"});
        }

        let userCreated;
        
        if(course === "Btech"){
            userCreated = await Btech.create({
                rollno,
                firstname,
                lastname, 
                batch,
                course,
                department,
                email, 
                phone, 
                password,
            });

        }
        else if( course === "Mtech"){
            userCreated = await Mtech.create({
                rollno,
                firstname,
                lastname, 
                batch,
                course,
                department,
                email, 
                phone, 
                password,
            });
        }
        else if( course === "Phd"){
            userCreated = await Phd.create({
                rollno,
                firstname,
                lastname, 
                batch,
                course,
                department,
                email, 
                phone, 
                password,
            });
        }
        else{
            userCreated = await User.create({
                firstname,
                lastname, 
                email, 
                phone, 
                password,
            });
        }

        res.status(200).json({
            message: "Registration Successfull", 
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
    } catch (error) {
        res.status(500).json({message:"Error in sign up page"});
    }
}


// User Login Logic here

const login = async(req, res) => {
    try {

        const {email, password} = req.body;

        // let userExist = await User.findOne( { email });
        let userExist;
        if(await User.findOne({email})){
            userExist = await User.findOne( { email });
        }
        else if( await Btech.findOne({email})){
            userExist = await Btech.findOne( { email });
        }
        else if( await Mtech.findOne({email})){
            userExist = await Mtech.findOne( { email });
        }
        else if( await Faculty.findOne({email})){
            userExist = await Faculty.findOne( { email });
        }
        else{
            userExist = await Phd.findOne( { email });
        }

        // const userExist = await User.findOne( { email });

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
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData });
    } catch (error) {
        res.status(500).json({message:"hellloo"});
        console.log(`error from the user route ${error}`);
    }
}


//Creating faculty register route

const facultyRegister = async (req, res) => {
    try {
        console.log(req.body);

        const {facID,  firstname, lastname, office, permanent, department, email, phone, password} = req.body;

        const userExist = await Faculty.findOne({ email });
        if(userExist){
            return res.status(400).json({ message: "User already exist"});
        }

        const userCreated = await Faculty.create({
            facID,  
            firstname, 
            lastname, 
            office, 
            permanent, 
            department, 
            email, 
            phone, 
            password
        });

        res.status(200).json({
            message: "Registration Successfull",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        })
    } catch (error) {
        res.status(405004).json({message:"Error in sign up page"});
    }
}



module.exports = {home, register, login, facultyRegister, user}; 