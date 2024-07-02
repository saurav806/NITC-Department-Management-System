const Project = require("../models/project-model");

const getAllProjects = async( req, res ) => {
    try {
        const projects = await Project.find().populate("mentor","firstname");
        const projectList = projects.map((project)=>{
            project.toObject().mentor = project.mentor.firstname;
            return project
        })
        console.log(projectList);
        if(!projectList || projectList.length === 0 ){
            return res.status(404).json({ message: "No Projects Listed"});
        }
        return res.status(200).json({projectList, "message":"found"});
    } catch (error) {
        next(error);
    }
};


// *------------------------
// Projects Logic start here
// *------------------------

const projects = async (req, res) => {
    try {
        const { title, description, skill, type} = req.body;
        const mentor = req.user;

        const projectCreated = await Project.create({
            title,
            description,
            skill,
            type,
            mentor: mentor._id,
        });

        return res.status(200).json({
            message: "Project Listed Successfully",
            project: projectCreated
        });
        
    } catch (error) {
        console.error("Error creating project:", error);
        return res.status(500).json({ message: "Error creating project" });
    }
}


module.exports = {getAllProjects, projects};