import React from 'react';
import './StudentRequest.css';


const StudentRequest = () => {
  return (
    <div>
      <div className="heading">
        <h1>Students Request</h1>
      </div>
      <div className="table-data">
        <table>
          <thead >
            <tr>
              <th>Project Title</th>
              <th>Student Name</th>
              <th className='preference'>Preference</th>
              <th className='action'>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data 1</td>
              <td>Data 2</td>
              <td >Data 3</td>
              <td className='action-btn'>
                <button className='btn-accept btn-action'>
                  Accept
                </button>
                <button className='btn-reject btn-action'>
                  Reject
                </button>
              </td>
            </tr>
            <tr>
              <td>Data 4</td>
              <td>Data 5</td>
              <td>Data 6</td>
              <td className='action-btn'>
                <button className='btn-accept btn-action'>
                  Accept
                </button>
                <button className='btn-reject btn-action'>
                  Reject
                </button>
              </td>
            </tr>
            <tr>
              <td>Data 4</td>
              <td>Data 5</td>
              <td>Data 6</td>
              <td className='action-btn'>
                <button className='btn-accept btn-action'>
                  Accept
                </button>
                <button className='btn-reject btn-action'>
                  Reject
                </button>
              </td>
            </tr>
            <tr>
              <td>Data 4</td>
              <td>Data 5</td>
              <td>Data 6</td>
              <td className='action-btn'>
                <button className='btn-accept btn-action'>
                  Accept
                </button>
                <button className='btn-reject btn-action'>
                  Reject
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentRequest
