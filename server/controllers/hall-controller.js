const Hall = require("../models/halls/hall-model");

// getting all halls
const getAllHalls = async (req, res, next) =>{
  try {
    const halls = await Hall.find();
    console.log(halls);
    if(!halls || halls.length === 0){
        return res.status(404).json({message: "No Hall Found"});
    }
    return res.status(200).json(halls);
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
        facultyInchargeID,
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

module.exports = {halls, getAllHalls};
