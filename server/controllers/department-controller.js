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

module.exports = getAllDepartments;