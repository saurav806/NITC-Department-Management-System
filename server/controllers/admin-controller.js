const User = require("../models/user-model");

const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        if(!users || users.length === 0){
            return res.status(404).json({message: "No Users Found"});
        }
        return res.status(200).json(users);
    } catch (error) {
        // Next(error);
        console.log("error");
    }
}

module.exports = getAllUser;