const AppliedProject = require("../models/projects/applied-project-model");

const getAllAppliedProjects = async (req, res, next) => {
    const User = req.user;
    try {

        const faculty = User.isFaculty;
        console.log("logged In user is Faculty", faculty);

        let projects;

        if(!faculty){
            projects = await AppliedProject.find({ studentID: User._id }).populate("studentID");
        }else {
            projects = await AppliedProject.find({ mentorID: User._id});
        }



        const projectList = projects.map(project => project.toObject());
    
        if (!projectList || projectList.length === 0) {
          return res.status(404).json({ message: "No applied Projects" });
        }
    
        return res.status(200).json({ projectList, message: "Found" });
      } catch (error) {
        next(error);
      }
};

const appliedProjects = async (req, res) => {
    try {
        const { title, projectID, preference, mentorID} = req.body;
        const student = req.user;

        const appliedProjectCreated = await AppliedProject.create({
            title,
            projectID,
            preference,
            mentorID,
            studentID : student._id,
        });

        console.log(appliedProjectCreated);
        return res.status(200).json({
            message: "Applied Successfully",
            appliedProject: appliedProjectCreated
        });

    } catch (error) {
        console.error("Error applying to project:", error);
        return res.status(500).json({ message: "Error applying to project" });
    }
};

module.exports = { getAllAppliedProjects, appliedProjects };
