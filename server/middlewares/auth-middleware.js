const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const Btech = require("../models/users/btech_students");
const Mtech = require("../models/users/mtech_students");
const Phd = require("../models/users/phd_students");
const Faculty = require("../models/users/faculty");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  console.log("token in middleware ", token);
  if (!token) {
    return res
      .status(401)
      .json({ message: " Unauthorized HTTP, token not provided" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  console.log("token form auth middleware", jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    // const userData = await User.findOne({ email: isVerified.email }).select({
    //   password: 0,
    // });
    
    let userData;
    if(await User.findOne({email: isVerified.email})){
      userData = await User.findOne( { email: isVerified.email }).select({
        password:0,
      });
    }
    else if( await Faculty.findOne({email: isVerified.email})){
      userData = await Faculty.findOne( { email: isVerified.email }).select({
        password:0,
      });
    }
    else if( await Btech.findOne({email: isVerified.email})){
      userData = await Btech.findOne( { email: isVerified.email }).select({
        password:0,
      });
    }
    else if( await Mtech.findOne({email: isVerified.email})){
      userData = await Mtech.findOne( { email: isVerified.email }).select({
        password:0,
      });
    }
    else{
      userData = await Phd.findOne( { email: isVerified.email }).select({
        password:0,
      });
    }


    console.log(userData);

    req.user = userData;
    req.token = token;
    req.userID = userData._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token" });
  }
};

module.exports = authMiddleware;
