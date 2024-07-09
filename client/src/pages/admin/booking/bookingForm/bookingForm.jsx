import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../store/auth";

const BookingForm = () => {
  const [halls, setHalls] = useState([]);
  const [selectedHall, setSelectedHall] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [availableStartTimes, setAvailableStartTimes] = useState([]);
  const [availableEndTimes, setAvailableEndTimes] = useState([]);
  const [error, setError] = useState("");

  const { authorizationToken, userId } = useAuth();

  const fetchHalls = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/hall-list",
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch halls");
      }

      const data = await response.json();
      setHalls(data.halls);
    } catch (error) {
      console.error("Error fetching halls", error);
      setHalls([]);
    }
  };

  useEffect(() => {
    fetchHalls();
  }, []);

  useEffect(() => {
    const fetchAvailableStartTimes = async () => {
      if (selectedHall && date) {
        try {
          const res = await fetch(
            "http://localhost:5000/api/available-start-times",
            {
              method: "GET",
              headers: {
                Authorization: authorizationToken,
                "Content-Type": "application/json",
              },
              params: { hallId: selectedHall, date },
            }
          );
          const data = await res.json();
          setAvailableStartTimes(data);
        } catch (err) {
          console.error("Error fetching available start times", err);
        }
      }
    };
    fetchAvailableStartTimes();
  }, [selectedHall, date]);

  useEffect(() => {
    const fetchAvailableEndTimes = async () => {
      if (selectedHall && date && startTime) {
        try {
          const res = await fetch(
            "http://localhost:5000/api/available-end-times",
            {
              method: "GET",
              headers: {
                Authorization: authorizationToken,
                "Content-Type": "application/json",
              },
              params: { hallId: selectedHall, date, startTime },
            }
          );
          const data = await res.json();
          setAvailableEndTimes(data);
        } catch (err) {
          console.error("Error fetching available end times", err);
        }
      }
    };
    fetchAvailableEndTimes();
  }, [selectedHall, date, startTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/api/booking-requests", {
        method: "POST",
        headers: {
          Authorization: authorizationToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hallId: selectedHall,
          date,
          startTime,
          endTime,
          userId,
        }),
      });
      alert("Booking request submitted successfully");
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Error submitting booking request"
      );
    }
  };

  return (
    <div>
      <h1>Book a Hall</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select Hall:
          <select
            value={selectedHall}
            onChange={(e) => setSelectedHall(e.target.value)}
            required
          >
            <option value="">Select Hall</option>
            {halls.map((hall) => (
              <option key={hall._id} value={hall._id}>
                {hall.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Start Time:
          <select
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          >
            <option value="">Select Start Time</option>
            {availableStartTimes.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label>
        <br />
        {/* <label>
          End Time:
          <select
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          >
            <option value="">Select End Time</option>
            {availableEndTimes.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </label> */}
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Submit Booking Request</button>
      </form>
    </div>
  );
};

export default BookingForm;
