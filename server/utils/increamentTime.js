  const incrementTimeByInterval = (time, interval) => {
    let date = new Date(`1970-01-01T${time}:00Z`);
    date.setMinutes(date.getMinutes() + interval);
    return date.toISOString().substr(11, 5);
  };
  
  module.exports = incrementTimeByInterval;
  