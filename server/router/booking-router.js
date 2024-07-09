const express = require('express');
const mongoose = require('mongoose');
const generateTimeSlots = require('../utils/timeslots');
const incrementTimeByInterval = require('../utils/increamentTime');
const router = express.Router();
// const Hall = require("../models/booking/bookingRequest");

const Lock = require('../models/booking/lock');


// Helper function to fetch and process locks and bookings
const getOccupiedSlots = async (hallID, date) => {
  const occupiedSlots = [];
//   const locks = await Lock.find({ hallID, date, locked: true });
  const bookings = await BookingRequest.find({ hallID, date, status: 'Approved' });

  const addOccupiedSlots = (start, end) => {
    let current = start;
    while (current < end) {
      occupiedSlots.push(current);
      current += 30; // Increment by 30 minutes
    }
  };

  // Process locks
//   locks.forEach(lock => {
//     const [lockStartHours, lockStartMinutes] = lock.startTime.split(':').map(Number);
//     const [lockEndHours, lockEndMinutes] = lock.endTime.split(':').map(Number);

//     const lockStartMinutesTotal = lockStartHours * 60 + lockStartMinutes;
//     const lockEndMinutesTotal = lockEndHours * 60 + lockEndMinutes;

//     addOccupiedSlots(lockStartMinutesTotal, lockEndMinutesTotal);
//   });

  // Process bookings
  bookings.forEach(booking => {
    const [bookingStartHours, bookingStartMinutes] = booking.startTime.split(':').map(Number);
    const [bookingEndHours, bookingEndMinutes] = booking.endTime.split(':').map(Number);

    const bookingStartMinutesTotal = bookingStartHours * 60 + bookingStartMinutes;
    const bookingEndMinutesTotal = bookingEndHours * 60 + bookingEndMinutes;

    addOccupiedSlots(bookingStartMinutesTotal, bookingEndMinutesTotal);
  });

  return occupiedSlots;
};

// Fetch available start times
router.get('/api/available-start-times', async (req, res) => {
  const { hallID, date } = req.query;


  try {
    const timeSlots = generateTimeSlots();
    const occupiedSlots = await getOccupiedSlots(hallID, date);

    console.log("Fixedslot",timeSlots);
    console.log("occupiedSlot", occupiedSlots);
    // Determine available start times
    const availableStartTimes = timeSlots.filter(slot => {
      const [hours, minutes] = slot.split(':').map(Number);
      const slotMinutesTotal = hours * 60 + minutes;

      // Exclude slots that are occupied
      return !occupiedSlots.some((start, index) => {
        const end = occupiedSlots[index + 1] || start;
        return slotMinutesTotal >= start && slotMinutesTotal < end;
      });
    });
    console.log("Available", availableStartTimes);
    res.json(availableStartTimes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching available start times' });
  }
});

// Fetch available end times considering locks and bookings based on start time
// router.get('/api/available-end-times', async (req, res) => {
//   const { hallId, date, startTime } = req.query;

//   try {
//     const timeSlots = generateTimeSlots();
//     const occupiedSlots = await getOccupiedSlots(hallId, date);

//     const [startHours, startMinutes] = startTime.split(':').map(Number);
//     const startMinutesTotal = startHours * 60 + startMinutes;

//     // Determine available end times
//     const availableEndTimes = timeSlots.filter(slot => {
//       const [hours, minutes] = slot.split(':').map(Number);
//       const slotMinutesTotal = hours * 60 + minutes;

//       // Ensure end time is after start time and not occupied
//       return slotMinutesTotal > startMinutesTotal && !occupiedSlots.some((start, index) => {
//         const end = occupiedSlots[index + 1] || start;
//         return slotMinutesTotal >= start && slotMinutesTotal < end;
//       });
//     });

//     res.json(availableEndTimes);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching available end times' });
//   }
// });

// Create booking request
router.post('/api/booking-requests', async (req, res) => {
  const { hallId, date, startTime, endTime, userId } = req.body;

  try {
    const newRequest = new BookingRequest({
      hallId,
      date,
      startTime,
      endTime,
      userId,
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ message: 'Error creating booking request' });
  }
});

// Handle admin booking and update request status
router.post('/api/admin/book', async (req, res) => {
  const { requestId, hallId, date, startTime, endTime, status } = req.body;

  try {
    const request = await BookingRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: 'Booking request not found' });
    }

    request.status = status;
    await request.save();

    if (status === 'Approved') {
      const newLock = new Lock({
        hallId,
        date,
        startTime,
        endTime,
        locked: true,
      });
      await newLock.save();
    }

    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ message: 'Error updating booking request' });
  }
});

module.exports = router;








// const express = require('express');
// const mongoose = require('mongoose');
// const generateTimeSlots = require('../utils/timeslots');
// const incrementTimeByInterval = require('../utils/increamentTime');
// const router = express.Router();

// const Lock = require('../models/booking/lock');
// const BookingRequest = require('../models/booking/bookingRequest');

// // Fetch available start times
// router.get('/api/available-start-times', async (req, res) => {
//   const { hallId, date } = req.query;

// // Fetch available end times considering locks and bookings based on start time
// router.get('/api/available-end-times', async (req, res) => {
//   const { hallId, date, startTime } = req.query;

//   try {
//     const timeSlots = generateTimeSlots();
//     const occupiedSlots = [];

//     const locks = await Lock.find({ hallId, date, locked: true });
//     const bookings = await BookingRequest.find({ hallId, date, status: 'Approved' });
//     console.log("booking",bookings);
//     const addOccupiedSlots = (start, end) => {
//       let current = start;
//       while (current < end) {
//         occupiedSlots.push(current);
//         current = incrementTimeByInterval(current, 30);
//       }
//     };

//     // Process locks
//     locks.forEach(lock => {
//       const [lockStartHours, lockStartMinutes] = lock.startTime.split(':').map(Number);
//       const [lockEndHours, lockEndMinutes] = lock.endTime.split(':').map(Number);

//       const lockStartMinutesTotal = lockStartHours * 60 + lockStartMinutes;
//       const lockEndMinutesTotal = lockEndHours * 60 + lockEndMinutes;

//       addOccupiedSlots(lockStartMinutesTotal, lockEndMinutesTotal);
//     });

//     // Process bookings
//     bookings.forEach(booking => {
//       const [bookingStartHours, bookingStartMinutes] = booking.startTime.split(':').map(Number);
//       const [bookingEndHours, bookingEndMinutes] = booking.endTime.split(':').map(Number);

//       const bookingStartMinutesTotal = bookingStartHours * 60 + bookingStartMinutes;
//       const bookingEndMinutesTotal = bookingEndHours * 60 + bookingEndMinutes;

//       addOccupiedSlots(bookingStartMinutesTotal, bookingEndMinutesTotal);
//     });
//     console.log("OccupiedSlots",occupiedSlots);
//     // Determine available start times
//     const availableStartTimes = timeSlots.filter(slot => {
//       const [hours, minutes] = slot.split(':').map(Number);
//       const slotMinutesTotal = hours * 60 + minutes;

//       // Exclude slots that are occupied
//       return !occupiedSlots.some((start, index) => {
//         const end = occupiedSlots[index + 1] || start;
//         return slotMinutesTotal >= start && slotMinutesTotal < end;
//       });
//     });

//     console.log("AllavailableSlots",availableStartTimes);
//     res.json(availableStartTimes);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching available start times' });
//   }
// });
// // Create booking request
// router.post('/api/booking-requests', async (req, res) => {
//   const { hallId, date, startTime, endTime, userId } = req.body;

//   try {
//     const newRequest = new BookingRequest({
//       hallId,
//       date,
//       startTime,
//       endTime,
//       userId,
//     });

//     await newRequest.save();
//     res.status(201).json(newRequest);
//   } catch (err) {
//     res.status(500).json({ message: 'Error creating booking request' });
//   }
// });

// // Handle admin booking and update request status
// router.post('/api/admin/book', async (req, res) => {
//   const { requestId, hallId, date, startTime, endTime, status } = req.body;

//   try {
//     const request = await BookingRequest.findById(requestId);

//     if (!request) {
//       return res.status(404).json({ message: 'Booking request not found' });
//     }

//     request.status = status;
//     await request.save();

//     if (status === 'Approved') {
//       const newLock = new Lock({
//         hallId,
//         date,
//         startTime,
//         endTime,
//         locked: true,
//       });
//       await newLock.save();
//     }

//     res.status(200).json(request);
//   } catch (err) {
//     res.status(500).json({ message: 'Error updating booking request' });
//   }
// });

// module.exports = router;
