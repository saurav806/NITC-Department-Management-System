const mongoose = require("mongoose");

const hallBookingRequestSchema = new mongoose.Schema({
    hallID: {//foreign key to hall table
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Hall"
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    userID: {//foreign key to user tables(faculty, btech, mtech, phd)
        type: mongoose.Schema.Types.ObjectId,
        required: true, // Assuming studentID is required
        refPath: 'userModel'
    },
    userModel: {
        type: String,
        required: true,
        enum: ['Btech', 'Mtech', 'Phd', 'Faculty']
    },
    slotStart: {//starting(inclusive) slot of bookin request
        type: String,
        require: true,
    },
    slotEnd: {//ending(inclusive) slot of bookin request
        type: String,
        require: true,
    },
    // facultyCoordinatorID:{//foreign key to faculty table
    //     type:String,
    //     require:true,
    // },
    // bookingType: {
    //     type: String,
    //     require: true,
    // },
    bookingPurpose: {
        type: String,
        require: true,
    },
    requirements: {//requirement of tools in hall during booked slot
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
    }
});

const HallBookingRequest = new mongoose.model("HallBookingRequest", hallBookingRequestSchema);

module.exports = HallBookingRequest;