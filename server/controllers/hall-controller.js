const Hall = require("../models/halls/hall-model");

const getallBook = async (req, res, next) =>{
  try {
    const bookedhalls = await BookedHall.find().populate();
    const bookedhallList = bookedhalls.map(bookedhall => {
      const bookedhallObject = bookedhall.toObject();
      return bookedhallObject;
    });

    console.log(bookedhalls);
    res.status(200).json({message: bookedhallList, bookedhallList});
    // if(!hallList || hallList.length === 0){
    //     return res.status(404).json({message: "No Hall Found"});
    // }
    return res.status(200).json({bookedhalls: bookedhallList, message:"halls found"});
  } catch (error) {
      next(error);
  }
}

// getting all halls
const getAllHalls = async (req, res, next) =>{
  try {
    const halls = await Hall.find().populate("facultyInchargeID", "firstname lastname");

    // const List = projects.map(project => {
    //   const projectObject = project.toObject();
    //   if (projectObject.mentor) {
    //     projectObject.mentorName = projectObject.mentor.firstname; // Store mentor's firstname in a separate variable
    //     projectObject.mentor = projectObject.mentor._id; // Keep mentor as ID for checking faculty property
    //   }
    //   return projectObject;
    // });

    const hallList = halls.map(hall => {
      const hallObject = hall.toObject();
      if(hallObject.facultyInchargeID){
        hallObject.facultyInchargeFirstName = hallObject.facultyInchargeID.firstname;
        hallObject.facultyInchargeLastName = hallObject.facultyInchargeID.lastname;
        hallObject.facultyInchargeID = hallObject.facultyInchargeID._id;

      }
      return hallObject;
    });

    console.log(halls);
    if(!hallList || hallList.length === 0){
        return res.status(404).json({message: "No Hall Found"});
    }
    return res.status(200).json({halls: hallList, message:"halls found"});
  } catch (error) {
      next(error);
  }
}

// Creating a new hall
const halls = async (req, res, next) => {
  try {
    const {name, location, facultyInchargeID, staffInchargeName, staffInchargeEmail, capacity, facility } = req.body;
    const mentor = req.user;

    const hallCreated = await Hall.create({
        name, 
        location,
        facultyInchargeID: faculty._id,
        staffInchargeName, 
        staffInchargeEmail, 
        capacity,
        facility
    });

    console.log("created hall",hallCreated);

    return res.status(200).json({
      message: "Hall Listed Successfully",
      hall: hallCreated,
    });
  } catch (error) {
    console.error("Error creating hall:", error);
    return res.status(500).json({ message: "Error adding hall" });
  }
};

module.exports = {halls, getAllHalls, getallBook};
