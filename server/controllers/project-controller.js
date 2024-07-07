const Project = require("../models/project-model");
const AppliedProject = require("../models/projects/applied-project-model");

const getAllProjects = async (req, res, next) => {
    const userId = req.user._id; // Correctly access userId
    console.log("UserID", userId);
    try {
        // Fetch all projects with mentor details populated
        const projects = await Project.find().populate("mentor", "firstname");

        // Convert projects to plain objects and map to include mentor's firstname
        const projectList = projects.map(project => {
            const projectObject = project.toObject();
            projectObject.mentor = project.mentor.firstname;
            return projectObject;
        });

        // Fetch applied projects for the current user
        const appliedProjects = await AppliedProject.find({ studentID: userId });

        // Filter projects where the user has not applied
        const updatedProjects = projectList.filter(project => {
            return !appliedProjects.some(ap => ap.projectID.toString() === project._id.toString());
        });

        console.log("Filtered Projects:");
        console.log(updatedProjects);

        // Return response with filtered projects
        if (updatedProjects.length === 0) {
            return res.status(404).json({ message: "No Projects available" });
        }
        return res.status(200).json({ projects: updatedProjects, message: "Projects found" });
    } catch (error) {
        next(error);
    }
};

// module.exports = getAllProjects;

const projects = async (req, res) => {
    try {
        const { title, description, skill, type } = req.body;
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
};

module.exports = { getAllProjects, projects };
