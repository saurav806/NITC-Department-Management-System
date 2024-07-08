import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BookingRequest = () => {
  return (
    <div>
      {/* <div className="loading">
          <div className="loading-indicator"></div>
        </div> */}
      <>
        <div>
          <div className="heading">
            <h1>Booking Request</h1>
          </div>
          <div className="hall-table-data">
            <table className="hall-table">
              <thead>
                <tr>
                  <th className="name">Name</th>
                  <th className="location">Location</th>
                  <th className="staffInCharge">Staff Incharge</th>
                  {/* <th className="staffInChargeEmail">Staff Incharge Email</th> */}
                  <th className="facultyInCharge">Faculty Incharge</th>
                  <th className="capacity">Capacity</th>
                  {/* <th className="facility">Facility</th> */}
                  <th className="facility">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>NLHC</td>
                  <td>NLHC</td>
                  <td>Biju Francis</td>
                  <td>Dr. Jay Prakash</td>
                  <td>100</td>
                  <td>
                    <button className="btn-accept btn-action btn ">
                      Book
                    </button>
                    <button className="btn-reject btn-action btn">
                      Reject
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Auditorium</td>
                  <td>Auditorium</td>
                  <td>JayRaj P B</td>
                  <td>Shubhashree</td>
                  <td>300</td>
                  <td>
                    <button className="btn-accept btn-action btn ">
                      Book
                    </button>
                    <button className="btn-reject btn-action btn">
                      Reject
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>NS Lab</td>
                  <td>IT Lab complex</td>
                  <td>Biju Francis</td>
                  <td>JayRaj P B</td>
                  <td>50</td>
                  <td>
                    <button className="btn-accept btn-action btn ">
                      Book
                    </button>
                    <button className="btn-reject btn-action btn">
                      Reject
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>CCC</td>
                  <td>Main Building</td>
                  <td>Biju Francis</td>
                  <td>Dr. Jay Prakash</td>
                  <td>100</td>
                  <td>
                    <button className="btn-accept btn-action btn ">
                      Book
                    </button>
                    <button className="btn-reject btn-action btn">
                      Reject
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    </div>
  );
};

export default BookingRequest;
