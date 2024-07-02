// const User = require("../models/user-model");

const adminMiddleware = async (req, res, next) => {
    try {
        const users = req.user;
        console.log(users.isAdmin);

        if( users.isAdmin){
            next();
        }
        else
            return res.status(404).json({message: "user is not admin"});

    } catch (error) {
        next(error);
    }
}

module.exports = adminMiddleware;