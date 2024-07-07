// const Project = require("../models/project-model");
// const AppliedProject = require("../models/projects/applied-project-model");

// const getAllProjects = async (req, res, next) => {
//   const userId = req.user; // Correctly access userId
//   console.log("UserID", userId);
//   try {
//     // Fetch all projects with mentor details populated
//     // const projects = await Project.find().populate("mentor", "firstname");
//     const projects = await Project.find();

//     // Convert projects to plain objects and map to include mentor's firstname
//     // const projectList = projects.map(project => {
//     //     const projectObject = project.toObject();
//     //     projectObject.mentor = project.mentor.firstname;
//     //     return projectObject;
//     // });

//     const projectList = projects.map((project) => project.toObject());

//     console.log("isFaculty logged In", userId.isFaculty);

//     let appliedProjects;
//     let updatedProjects;

//     // Fetch applied projects for the current user
//     appliedProjects = await AppliedProject.find({ studentID: userId });

//     if (!userId.isFaculty) {
//       // Filter out projects where the user(student) has applied
//       updatedProjects = projectList.filter((project) => {
//         return !appliedProjects.some(
//           (ap) => ap.projectID.toString() === project._id.toString()
//         );
//       });
//     } else {
//         // Filter out projects whose mentor is not the LoggedIn user(faculty)
//         updatedProjects = projectList.filter((project) => {
//             return project.mentor.toString() === userId._id.toString();
//       });
//     }

//     console.log("Filtered Projects:");
//     // console.log(updatedProjects);

//     // Return response with filtered projects
//     if (updatedProjects.length === 0) {
//       return res.status(404).json({ message: "No Projects available" });
//     }
//     return res
//       .status(200)
//       .json({ projects: updatedProjects, message: "Projects found" });
//   } catch (error) {
//     next(error);
//   }
// };

// // module.exports = getAllProjects;

// const projects = async (req, res) => {
//   try {
//     const { title, description, skill, type } = req.body;
//     const mentor = req.user;

//     const projectCreated = await Project.create({
//       title,
//       description,
//       skill,
//       type,
//       mentor: mentor._id,
//     });

//     return res.status(200).json({
//       message: "Project Listed Successfully",
//       project: projectCreated,
//     });
//   } catch (error) {
//     console.error("Error creating project:", error);
//     return res.status(500).json({ message: "Error creating project" });
//   }
// };

// module.exports = { getAllProjects, projects };




const Project = require("../models/project-model");
const AppliedProject = require("../models/projects/applied-project-model");

const getAllProjects = async (req, res, next) => {
  const userId = req.user; // Correctly access userId
  console.log("UserID", userId);
  try {
    // Fetch all projects with mentor details populated
    const projects = await Project.find().populate("mentor", "firstname");

    // Convert projects to plain objects and map to include mentor's firstname in a separate variable
    const projectList = projects.map(project => {
      const projectObject = project.toObject();
      if (projectObject.mentor) {
        projectObject.mentorName = projectObject.mentor.firstname; // Store mentor's firstname in a separate variable
        projectObject.mentor = projectObject.mentor._id; // Keep mentor as ID for checking faculty property
      }
      return projectObject;
    });

    console.log("isFaculty logged In", userId.isFaculty);

    let appliedProjects;
    let updatedProjects;

    // Fetch applied projects for the current user
    appliedProjects = await AppliedProject.find({ studentID: userId });

    if (!userId.isFaculty) {
      // Filter out projects where the user(student) has applied
      updatedProjects = projectList.filter(project => {
        return !appliedProjects.some(
          (ap) => ap.projectID.toString() === project._id.toString()
        );
      });
    } else {
      // Filter out projects whose mentor is not the LoggedIn user(faculty)
      updatedProjects = projectList.filter(project => {
        return project.mentor.toString() === userId._id.toString();
      });
    }

    console.log("Filtered Projects:");
    console.log(updatedProjects);

    // Return response with filtered projects
    if (updatedProjects.length === 0) {
      return res.status(404).json({ message: "No Projects available" });
    }
    return res
      .status(200)
      .json({ projects: updatedProjects, message: "Projects found" });
  } catch (error) {
    next(error);
  }
};

// Creating a new project
const projects = async (req, res) => {
  try {
    const { title, description, skill, type } = req.body;
    const mentor = req.user;

    const projectCreated = await Project.create({
      title,
      description,
      skill,
      type,
      mentor: mentor._id, // Save the mentor's ID
    });

    return res.status(200).json({
      message: "Project Listed Successfully",
      project: projectCreated,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ message: "Error creating project" });
  }
};

module.exports = { getAllProjects, projects };
