const mongoose = require("mongoose");

const weekScheduleSchema = new mongoose.Schema({
    hallID:{//foreign key to hall table
        type:String,
        required:true,
    },
    mon:{
        type:Boolean,
        default: true,
    },
    tue:{
        type:Boolean,
        default: true,
    },
    wed:{
        type:Boolean,
        default: true,
    },
    thu:{
        type:Boolean,
        default: true,
    },
    fri:{
        type:Boolean,
        default: true,
    },
    sat:{
        type:Boolean,
        default: false,
    },
    sun:{
        type:Boolean,
        default: false,
    }
});

const Week = new mongoose.model("Week", weekScheduleSchema);

module.exports = Week;