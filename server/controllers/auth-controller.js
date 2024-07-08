const User = require("../models/user-model");
const Btech = require("../models/users/btech_students");
const Faculty = require("../models/users/faculty");
const Mtech = require("../models/users/mtech_students");
const Phd = require("../models/users/phd_students");

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome to my project under auth");
  } catch (error) {
    res.status(400).send({ message: "Error page" });
  }
};

const register = async (req, res) => {
  try {
    console.log(req.body);
    const {
      rollno,
      firstname,
      lastname,
      batch,
      course,
      department,
      email,
      phone,
      password,
    } = req.body;

    const userExist = await User.findOne({ email }) ||
                      await Btech.findOne({ email }) ||
                      await Mtech.findOne({ email }) ||
                      await Phd.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    let userCreated;

    switch (course) {
      case "Btech":
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
        break;
      case "Mtech":
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
        break;
      case "Phd":
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
        break;
      default:
        userCreated = await User.create({
          firstname,
          lastname,
          email,
          phone,
          password,
        });
    }

    res.status(200).json({
      message: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: "Error in sign up page" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let userExist = await User.findOne({ email }) ||
                    await Btech.findOne({ email }) ||
                    await Mtech.findOne({ email }) ||
                    await Faculty.findOne({ email }) ||
                    await Phd.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await userExist.comparePassword(password);

    if (isPasswordValid) {
      res.status(200).json({
        message: "Login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Login error page" });
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data" });
    console.log(`Error from the user route: ${error}`);
  }
};

const facultyRegister = async (req, res) => {
  try {
    console.log(req.body);

    const {
      facID,
      firstname,
      lastname,
      office,
      permanent,
      department,
      email,
      phone,
      password,
    } = req.body;

    const userExist = await Faculty.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
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
      password,
    });

    res.status(200).json({
      message: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: "Error in sign up page" });
  }
};

const updateUser = async (req, res) => {
  const { email, status } = req.body;
  console.log("From controller for update userID:", email,status);

  try {
    const foundUser = await Btech.findOne({email}) ||
                      await Mtech.findOne({email}) ||
                      await Phd.findOne({email});

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    foundUser.isAssigned = status;
    await foundUser.save();

    res.status(200).json({ message: "User status updated successfully" });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { home, register, login, facultyRegister, user, updateUser };
