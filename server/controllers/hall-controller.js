const Hall = require("../models/halls/hall-model");

<<<<<<< HEAD
// getting all halls or a specific hall by ID
const getAllHalls = async (req, res, next) => {
  const hallId = req.params.hallId;
  try {
    let halls;
    if (hallId) {
      halls = await Hall.findById(hallId);
      if (!halls) {
        return res.status(404).json({ message: "Hall not found" });
      }
      halls = [halls]; // Wrap in an array to keep the response format consistent
    } else {
      halls = await Hall.find();
    }

    const hallList = halls.map(hall => {
      const hallObject = hall.toObject();
      hallObject.id = hallObject._id; // Add id field
      delete hallObject._id; // Optionally, remove _id field
=======
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
>>>>>>> 984f95e27567f6b583e3079edff6d130baa202bf
      return hallObject;
    });

    return res.status(200).json({ halls: hallList, message: "Halls found" });
  } catch (error) {
    next(error);
  }
};

// Creating a new hall
const halls = async (req, res, next) => {
  try {
    const { name, location, facultyInchargeID, staffInchargeName, staffInchargeEmail, capacity, facility } = req.body;

    const hallCreated = await Hall.create({
<<<<<<< HEAD
      name,
      location,
      facultyInchargeID,
      staffInchargeName,
      staffInchargeEmail,
      capacity,
      facility
=======
        name, 
        location,
        facultyInchargeID: faculty._id,
        staffInchargeName, 
        staffInchargeEmail, 
        capacity,
        facility
>>>>>>> 984f95e27567f6b583e3079edff6d130baa202bf
    });

    return res.status(200).json({
      message: "Hall Listed Successfully",
      hall: hallCreated,
    });
  } catch (error) {
    console.error("Error creating hall:", error);
    return res.status(500).json({ message: "Error adding hall" });
  }
};

<<<<<<< HEAD
module.exports = { halls, getAllHalls };
=======
module.exports = {halls, getAllHalls, getallBook};
>>>>>>> 984f95e27567f6b583e3079edff6d130baa202bf
