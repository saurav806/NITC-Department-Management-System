const mongoose = require("mongoose");
// const { number } = require("zod");

const hallSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    location:{
        type:String,
        require:true,
    },
    facultyInchargeID:{//foreign key to faculty table 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty"
    },
    staffInchargeName:{
        type:String,
        require:true,
    },
    staffInchargeEmail:{
        type:String,
        require:true,
    },
    capacity:{
        type:Number,
        require:true,
    },
    facility:{
        type:String,
        default:"",
    }
});

const Hall = new mongoose.model("Hall", hallSchema);

module.exports = Hall;