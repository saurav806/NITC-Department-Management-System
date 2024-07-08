const Faculty = require("../models/users/faculty");

// Creating a new project
const getAllFaculties = async (req, res) => {
    try {
        // console.log("im here");
        const faculties = await Faculty.find();
        const facultyList = faculties.map((faculty)=>{
            faculty.toObject().name = faculty.firstname;
            return faculty
        })
        console.log(facultyList);
        if(!facultyList || facultyList.length === 0 ){
            return res.status(404).json({ message: "No faculty Listed"});
        }
        return res.status(200).json(facultyList);
    } catch (error) {
        next(error);
    }
};

module.exports = getAllFaculties;
