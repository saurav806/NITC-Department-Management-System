const program = require("../models/programs/program-model");

const getAllPrograms = async( req, res ) => {
    try {
        // console.log("im here");
        const programs = await program.find().populate("name");
        const programList = programs.map((program)=>{
            program.toObject().name = program.name;
            return program
        })
        console.log(programList);
        if(!programList || programList.length === 0 ){
            return res.status(404).json({ message: "No programs Listed"});
        }
        return res.status(200).json(programList);
    } catch (error) {
        next(error);
    }
};

module.exports = getAllPrograms;