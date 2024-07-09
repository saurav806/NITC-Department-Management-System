const Hall = require("../models/halls/hall-model");

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
      name,
      location,
      facultyInchargeID,
      staffInchargeName,
      staffInchargeEmail,
      capacity,
      facility
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

module.exports = { halls, getAllHalls };
