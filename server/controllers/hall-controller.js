const Hall = require("../models/halls/hall-model");

// Creating a new project
const halls = async (req, res) => {
  try {
    const {name, location, staffInchargeName, staffInchargeEmail, capacity, facility } = req.body;
    const mentor = req.user;

    const hallCreated = await Hall.create({
        name, 
        location, 
        staffInchargeName, 
        staffInchargeEmail, 
        capacity,
        facility
        // mentor: mentor._id,
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

module.exports = halls;