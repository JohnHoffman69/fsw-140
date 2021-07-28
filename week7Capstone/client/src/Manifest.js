import React, { useState } from 'react';
import AddManifest from './AddManifest';
import './App.css';

function Manifest(props){

    const { id, firstName, lastName, seatNum, checkIn} = props;
    
    const [editToggle, setEditToggle] = useState(false);


    return (
        <div>
        <div className="card">
        { !editToggle ?
        <> 
            
            <span><strong>Name:</strong><br/>{ firstName } </span>
            <span>{ lastName }</span>
            <p><strong>Seat Number:</strong><br/> { seatNum }</p>
            <p><strong>Check In:</strong><br/> { checkIn }</p>

            <div>
            <button
                className="deleteB"
                onClick={() => props.deleteManifest(id)}>
                Delete
            </button>
            <button
                className="editB"
                onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                Edit
            </button>
            </div>
        </>
        :
        <>
            <AddManifest
                id={id}
                firstName={firstName}
                lastName={lastName}
                seatNum={seatNum}
                checkIn={checkIn}
                buttonText="Submit" 
                submit={props.editManifest}
            />
            <button
                className="deleteB"
                onClick={() => setEditToggle(prevToggle => !prevToggle)}>
                Close
            </button>
        </>
        }
        </div>
        </div>
    )
}
export default Manifest;