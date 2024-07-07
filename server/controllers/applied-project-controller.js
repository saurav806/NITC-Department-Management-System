// const AppliedProject = require("../models/projects/applied-project-model");

// const getAllAppliedProjects = async (req, res, next) => {
//     const User = req.user;
//     try {
//         const faculty = User.isFaculty;
//         let projects;

//         // Convert projects to plain objects and map to include mentor's firstname in a separate variable

//         if(!faculty){
//             projects = await AppliedProject.find({ studentID: User._id })
//             .populate([
//                 {
//                     path: "studentID",
//                     select: "firstname email phone"
//                 },
//                 {
//                     path: "projectID",
//                     select: "type"
//                 }
//             ]);
//         }else {
//             projects = await AppliedProject.find({ mentorID: User._id})
//             .populate([
//                 {
//                     path: "studentID",
//                     select: "firstname email phone"
//                 },
//                 {
//                     path: "projectID",
//                     select: "type"
//                 }
//             ]);
//         }

//         const projectList = projects.map(project => {
//             const projectObject = project.toObject();
//             if (projectObject.studentID) {
//               projectObject.studentName = projectObject.studentID.firstname;
//               projectObject.studentEmail = projectObject.studentID.email;
//               projectObject.studentPhone = projectObject.studentID.phone;
//               projectObject.studentID = projectObject.studentID._id;
//             }
//             if (projectObject.projectID) {
//                 projectObject.projectType = projectObject.projectID.type;
//                 projectObject.projectID = projectObject.projectID._id;
//             }
//             return projectObject;
//           });
    
//         if (!projectList || projectList.length === 0) {
//           return res.status(404).json({ message: "No applied Projects" });
//         }
    
//         return res.status(200).json({ projectList, message: "Found" });
//       } catch (error) {
//         next(error);
//       }
// };

// const appliedProjects = async (req, res) => {
//     try {
//         const { title, projectID, preference, mentorID} = req.body;
//         const student = req.user;

//         const appliedProjectCreated = await AppliedProject.create({
//             title,
//             projectID,
//             preference,
//             mentorID,
//             studentID : student._id,
//         });

//         console.log(appliedProjectCreated);
//         return res.status(200).json({
//             message: "Applied Successfully",
//             appliedProject: appliedProjectCreated
//         });

//     } catch (error) {
//         console.error("Error applying to project:", error);
//         return res.status(500).json({ message: "Error applying to project" });
//     }
// };

// module.exports = { getAllAppliedProjects, appliedProjects };


const AppliedProject = require("../models/projects/applied-project-model");

const getAllAppliedProjects = async (req, res, next) => {
    const User = req.user;
    try {
        const faculty = User.isFaculty;
        let projects;

        if (!faculty) {
            projects = await AppliedProject.find({ studentID: User._id }).populate([
                {
                    path: "projectID",
                    select: "type skill"
                },
                {
                    path: "studentID",
                    select: "firstname email phone"
                },
                {
                    path: "mentorID",
                    select: "firstname email"
                }
            ]);
        } else {
            projects = await AppliedProject.find({ mentorID: User._id }).populate([
                {
                    path: "projectID",
                    select: "skill type"
                },
                {
                    path: "studentID",
                    select: "firstname email phone"
                },
            ]);
        }

        const projectList = projects.map(project => {
            const projectObject = project.toObject();
            if (projectObject.studentID) {
                projectObject.studentName = projectObject.studentID.firstname;
                projectObject.studentEmail = projectObject.studentID.email;
                projectObject.studentPhone = projectObject.studentID.phone;
                projectObject.studentID = projectObject.studentID._id;
            }
            if (projectObject.projectID) {
                projectObject.projectType = projectObject.projectID.type; // Ensure this line exists
                projectObject.projectSkill = projectObject.projectID.skill; // Ensure this line exists
                projectObject.projectID = projectObject.projectID._id;
            }
            if (projectObject.mentorID) {
                projectObject.mentorName = projectObject.mentorID.firstname; // Ensure this line exists
                projectObject.mentorEmail = projectObject.mentorID.email; // Ensure this line exists
                projectObject.mentorID = projectObject.mentorID._id;
            }
            return projectObject;
        });

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
        const { title, projectID, preference, mentorID } = req.body;
        const student = req.user;

        const appliedProjectCreated = await AppliedProject.create({
            title,
            projectID,
            preference,
            mentorID,
            studentID: student._id,
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
