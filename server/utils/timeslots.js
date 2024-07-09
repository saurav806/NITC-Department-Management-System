const generateTimeSlots = () => {
    const slots = [];
    let time = new Date('1970-01-01T07:00:00Z'); // Start time 07:00 AM
    const endTime = new Date('1970-01-01T19:00:00Z'); // End time 07:00 PM
  
    while (time < endTime) {
      slots.push(time.toISOString().substr(11, 5)); // Get the time in HH:MM format
      time.setMinutes(time.getMinutes() + 30); // Increment by 30 minutes
    }
  
    return slots;
  };
  
  module.exports = generateTimeSlots;
  