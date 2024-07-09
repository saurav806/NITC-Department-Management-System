const HallBookingRequest = require("../models/booking/hall-request-model");
// const Project = require("../models/project-model");

// const getAllAppliedProjects = async (req, res, next) => {
//     const User = req.user;
//     try {
//         const faculty = User.isFaculty;
//         let projects;

//         if (!faculty) {
//             projects = await AppliedProject.find({ studentID: User._id }).populate([
//                 {
//                     path: "projectID",
//                     select: "type skill"
//                 },
//                 {
//                     path: "studentID",
//                     select: "firstname email phone"
//                 },
//                 {
//                     path: "mentorID",
//                     select: "firstname email phone"
//                 }
//             ]);
//         } else {
//             projects = await AppliedProject.find({ mentorID: User._id }).populate([
//                 {
//                     path: "projectID",
//                     select: "skill type"
//                 },
//                 {
//                     path: "studentID",
//                     select: "firstname email phone status"
//                 },
//             ]);
//         }

//         const projectList = projects.map(project => {
//             const projectObject = project.toObject();
//             if (projectObject.studentID) {
//                 projectObject.studentName = projectObject.studentID.firstname;
//                 projectObject.studentEmail = projectObject.studentID.email;
//                 projectObject.studentPhone = projectObject.studentID.phone;
//                 projectObject.studentID = projectObject.studentID._id;
//             }
//             if (projectObject.projectID) {
//                 projectObject.projectType = projectObject.projectID.type;
//                 projectObject.projectSkill = projectObject.projectID.skill;
//                 projectObject.proStatus = projectObject.projectID.status;
//                 projectObject.projectID = projectObject.projectID._id;
//             }
//             if (projectObject.mentorID) {
//                 projectObject.mentorName = projectObject.mentorID.firstname;
//                 projectObject.mentorEmail = projectObject.mentorID.email;
//                 projectObject.mentorPhone = projectObject.mentorID.phone;
//                 projectObject.mentorID = projectObject.mentorID._id;
//             }
//             return projectObject;
//         });

//         if (!projectList || projectList.length === 0) {
//             return res.status(404).json({ message: "No applied Projects" });
//         }

//         return res.status(200).json({ projectList, message: "Found" });
//     } catch (error) {
//         next(error);
//     }
// };

const requestedHalls = async (req, res) => {
    try {
        const { hallID, userID, slotStart, slotEnd, bookingPurpose, requirements } = req.body;
        const user = req.user;

        const requestCreated = await HallBookingRequest.create({
            hallID, 
            userID: user._id,
            slotStart, 
            slotEnd, 
            bookingPurpose, 
            requirements
        });

        console.log(requestCreated);
        return res.status(200).json({
            message: "Requested Successfully",
            hallBookingRequest: requestCreated
        });

    } catch (error) {
        console.error("Error applying to project:", error);
        return res.status(500).json({ message: "Error applying to project" });
    }
};

// const updateAppliedProject = async (req, res) => {
//     const { projectId, status } = req.body;
  
//     try {
//       const project = await AppliedProject.findById(projectId);
  
//       if (!project) {
//         return res.status(404).json({ message: 'Project not found' });
//       }
  
//       // Update the status of the current project
//       project.appliedStatus = status;
//     //   project.projectStatus = "Active";
//       await project.save();
  
//       // Delete all other requests with the same projectID
//       await AppliedProject.deleteMany({
//         projectID: project.projectID,
//         _id: { $ne: projectId }
//       });
  
//       // Delete all other requests by the same user
//       await AppliedProject.deleteMany({
//         studentID: project.studentID,
//         _id: { $ne: projectId }
//       });
  
//       res.status(200).json({ message: 'Project accepted and other requests deleted successfully' });
//     } catch (error) {
//       console.error('Error updating project status:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   };
  

// const updateListedProject = async (req, res) => {
//     const { projectId, status } = req.body;
//     console.log("from controller for update projectID2", projectId);
  
//     try {
//       const project = await Project.findById(projectId);
  
//       if (!project) {
//         return res.status(404).json({ message: 'Project not found' });
//       }
  
//       project.status = status;
//       await project.save();
  
//       res.status(200).json({ message: 'Project status updated successfully' });
//     } catch (error) {
//       console.error('Error updating project status:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
// };

// // New function to reject other requests
// const rejectOtherRequests = async (req, res) => {
//     const { projectID } = req.params;
//     try {
//         await AppliedProject.updateMany({ projectID: projectID, appliedStatus: 'Applied' }, { appliedStatus: 'Rejected' });
//         res.status(200).json({ message: 'Other requests rejected successfully' });
//     } catch (error) {
//         console.error('Error rejecting other requests:', error);
//         res.status(500).json({ message: 'Failed to reject other requests', error });
//     }
// };

module.exports = HallBookingRequest;