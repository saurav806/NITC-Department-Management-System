const mongoose = require("mongoose");
// const { number } = require("zod");

const hallBookedSchema = new mongoose.Schema({
    hallID:{//foreign key to hall table
        type:String,
        required:true,
    },
    date:{
        type: Date,
        require:true,
    },
    userID:{//foreign key to user tables(faculty, btech, mtech, phd)
        type:String,
        require:true,
    },
    slotStart:{//starting(inclusive) slot of bookin request
        type:Number,
        require:true,
    },
    slotEnd:{//ending(inclusive) slot of bookin request
        type:Number,
        require:true,
    },
    facultyCoordinatorID:{//foreign key to faculty table
        type:String,
        require:true,
    },
    bookingType:{
        type:String,
        require:true,
    },
    bookingPurpose:{
        type:String,
        require:true,
    },
    requirements:{//requirement of tools in hall during booked slot
        type:String,
        require:true,
    },
    status:{
        type:String,
        require:true,
    }
});

const HallBooked = new mongoose.model("HallBooked", hallBookedSchema);

module.exports = HallBooked;