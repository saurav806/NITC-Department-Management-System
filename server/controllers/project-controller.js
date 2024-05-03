const Project = require("../models/project-model");

const getAllProjects = async( req, res ) => {
    try {
        const projects = await Project.find();
        console.log(projects);
        if(!projects || projects.length === 0 ){
            return res.status(404).json({ message: "No Projects Listed"});
        }
        return res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
};


// *------------------------
// Projects Logic start here
// *------------------------

const projects = async (req, res) => {
    try {
        const { title, description, skill, type, mentor} = req.body;

        const projectCreated = await Project.create({
            title,
            description,
            skill,
            type,
            mentor,
        });

        return res.status(200).json({
            message: "Project Listed Successfully",
        });
        
    } catch (error) {
        console.error("Error creating project:", error);
        return res.status(500).json({ message: "Error creating project" });
    }
}


module.exports = {getAllProjects, projects};