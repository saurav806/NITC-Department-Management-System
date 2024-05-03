const Request = require("../models/request-model");


const request = async (req, res) => {
    try {
        const { preference } = req.body;

        const projectCreated = await Project.create({
            preference,
        });

        return res.status(200).json({
            message: "Requested Successfully",
        });
        
    } catch (error) {
        console.error("Error Requesting project:", error);
        return res.status(500).json({ message: "Error Requesting project" });
    }
}


module.exports = request;