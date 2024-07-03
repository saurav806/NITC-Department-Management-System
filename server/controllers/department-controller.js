const department = require("../models/departments/department-model");

const getAllDepartments = async( req, res ) => {
    try {
        const departments = await department.find().populate("name");
        const departmentList = departments.map((department)=>{
            department.toObject().name = department.name;
            return department
        })
        console.log(departmentList);
        if(!departmentList || departmentList.length === 0 ){
            return res.status(404).json({ message: "No departments Listed"});
        }
        return res.status(200).json(departmentList);
    } catch (error) {
        next(error);
    }
};


// *------------------------
// departments Logic start here
// *------------------------

// const departments = async (req, res) => {
//     try {
//         const { title, description, skill, type} = req.body;
//         const mentor = req.user;

//         const departmentCreated = await department.create({
//             title,
//             description,
//             skill,
//             type,
//             mentor: mentor._id,
//         });

//         return res.status(200).json({
//             message: "department Listed Successfully",
//             department: departmentCreated
//         });
        
//     } catch (error) {
//         console.error("Error creating department:", error);
//         return res.status(500).json({ message: "Error creating department" });
//     }
// }


module.exports = getAllDepartments;