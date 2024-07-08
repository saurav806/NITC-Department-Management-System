import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BookingHistory = () => {
  return (
    <div>
      <>
        <div>
          <div className="heading">
            <h1>Booking History</h1>
          </div>
          <div className="hall-table-data">
            <table className="hall-table">
              <thead>
                <tr>
                  <th className="name">Name</th>
                  {/* <th className="location">Location</th> */}
                  <th className="staffInCharge">Staff Incharge</th>
                  {/* <th className="staffInChargeEmail">Staff Incharge Email</th> */}
                  <th className="facultyInCharge">Assigned To</th>
                  {/* <th className="capacity">Capacity</th> */}
                  {/* <th className="facility">Facility</th> */}
                  <th className="facility">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>NLHC</td>
                  <td>Biju Francis</td>
                  <td>Saurav Singh</td>
                  <td>
                    <button className="btn-accept btn-action btn ">
                      Booked
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Auditorium</td>
                  <td>Jayraj P B</td>
                  <td>Shivam Kumar</td>
                  <td>
                    <button className="btn-reject btn-action btn ">
                      Pending
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>CCC</td>
                  <td>Biju Francis</td>
                  <td>Shivam Kumar</td>
                  <td>
                    <button className="btn-accept btn-action btn ">
                      Booked
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

export default BookingHistory;
