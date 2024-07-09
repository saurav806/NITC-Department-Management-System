

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./detailedHall.css";
import { useAuth } from "../../store/auth";
import { toast } from 'react-toastify'; // Import toast for notifications

const DetailedHall = () => {
    const { hallId } = useParams(); // Get the hallId from the URL
    const [halls, setHalls] = useState([]); // Set initial state to an empty array
    const { authorizationToken } = useAuth();
    const [displayMessage, setDisplayMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const getHallDetails = async () => {
        setLoading(true); // Start loading
        try {
            const response = await fetch(`http://localhost:5000/api/admin/hall-list/${hallId}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch hall details");
            }

            const data = await response.json();
            const hallDetails = data.halls;

            console.log("hall data", data);

            setHalls(hallDetails || []); // Ensure halls is an array
        } catch (error) {
            console.error("Error fetching hall details", error);
            setDisplayMessage("Error fetching hall details");
            setHalls([]); // Set halls to an empty array on error
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        getHallDetails();
    }, [hallId]);

    const handleApplyClick = () => {
        toast.success("Booking request sent");
    };

    return (
        <div className="detailed-container">
            {loading ? (
                <div className="loading">
                    <div className="loading-indicator"></div>
                    <p>Loading Hall...</p>
                </div>
            ) : (
                <>
                    <div>
                        <div className="heading">
                            <h1>Hall Details</h1>
                        </div>
                        <div className="hall-data">
                            {halls.map((hall, index) => (
                                <div key={index}>
                                    <p><strong>Name:</strong> {hall.name}</p>
                                    <p><strong>Location:</strong> {hall.location}</p>
                                    <p><strong>Staff Incharge:</strong> {hall.staffInchargeName}</p>
                                    <p><strong>Staff Incharge Email:</strong> {hall.staffInchargeEmail}</p>
                                    <p><strong>Faculty Incharge:</strong> {hall.facultyInchargeID}</p>
                                    <p><strong>Seating Capacity:</strong> {hall.capacity}</p>
                                    <p><strong>Available Facility:</strong> {hall.facility}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label>
                            Date:
                            <input type="date" required />
                        </label>
                        {/* <button type="button" onClick={handleApplyClick}>Check Availability</button> */}

                        <div className="form-data">
                            <input
                                className="form-input"
                                type="text"
                                name="purpose"
                                placeholder="Purpose"
                                id="purpose"
                                required
                                autoComplete="off"
                            />
                        </div>
                        <label>
                            Select Start Time:
                            <input type="time" required />
                        </label>
                        <label>
                            Select End Time:
                            <input type="time" required />
                        </label>
                        <button className="btn" type="button" onClick={handleApplyClick}>Book Hall</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default DetailedHall;
