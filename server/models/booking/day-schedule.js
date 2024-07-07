const mongoose = require("mongoose");
// const { number } = require("zod");

const dayScheduleSchema = new mongoose.Schema({
    hallID:{//foreign key to hall table
        type:String,
        required:true,
    },
    date:{
        type: Date,
        require:true,
    },
    s1:{// 7:00am - 7:30am
        type:Boolean,
        default: false,//false means slot is not-booked(free)
    },
    s2:{// 7:30am - 8:00am
        type:Boolean,
        default: false,
    },
    s3:{// 8:00am - 8:30am
        type:Boolean,
        default: false,
    },
    s4:{// 8:30am - 9:00am
        type:Boolean,
        default: false,
    },
    s5:{// 9:00am - 9:30am
        type:Boolean,
        default: false,
    },
    s6:{// 9:30am - 10:00am
        type:Boolean,
        default: false,
    },
    s7:{// 10:00am - 10:30am
        type:Boolean,
        default: false,
    },
    s8:{// 10:30am - 11:00am
        type:Boolean,
        default: false,
    },
    s9:{// 11:00am - 11:30am
        type:Boolean,
        default: false,
    },
    s10:{// 11:30am - 12:0pm
        type:Boolean,
        default: false,
    },
    s11:{// 12:00pm - 12:30pm
        type:Boolean,
        default: false,
    },
    s12:{// 12:30pm - 01:00pm
        type:Boolean,
        default: false,
    },
    s13:{// 01:00pm - 01:30pm
        type:Boolean,
        default: false,
    },
    s14:{// 01:30pm - 02:00pm
        type:Boolean,
        default: false,
    },
    s15:{// 02:00pm - 02:30pm
        type:Boolean,
        default: false,
    },
    s16:{// 02:30pm - 03:00pm
        type:Boolean,
        default: false,
    },
    s17:{// 03:00pm - 03:30pm
        type:Boolean,
        default: false,
    },
    s18:{// 03:30pm - 04:00pm
        type:Boolean,
        default: false,
    },
    s19:{// 04:00pm - 04:30pm
        type:Boolean,
        default: false,
    },
    s20:{// 04:30pm - 05:00pm
        type:Boolean,
        default: false,
    },
    s21:{// 05:00pm - 05:30pm
        type:Boolean,
        default: false,
    },
    s22:{// 05:30pm - 06:00pm
        type:Boolean,
        default: false,
    },
    s23:{// 06:00pm - 06:30pm
        type:Boolean,
        default: false,
    },
    s24:{// 06:30pm - 07:00pm
        type:Boolean,
        default: false,
    }
});

const DaySchedule = new mongoose.model("DaySchedule", dayScheduleSchema);

module.exports = DaySchedule;