import React, { useState } from 'react';


function AddManifest(props){

    const initInputs = { id: props.id || "", firstName: props.firstName || "", lastName: props.lastName || "", seatNum: props.seatNum|| "", checkedIn: props.checkIn || ""}
    
    const [inputs, setInputs] = useState(initInputs)

    const handleChange = ((e) => {
        const {name, value } = e.target
        setInputs(prevInputs => ({...prevInputs, [name]: value}))
    })
    
    const handleSubmit = ((e) => {
        props.submit(inputs, props.id)
        setInputs(initInputs)
    })

    return (
        <div>
        <div className="card1">
        <h3>Manifest Information</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    value={inputs.firstName}
                    onChange={handleChange}
                    placeholder="First Name
                    "
                />
                <br/>
                <input
                    type="text"
                    name="lastName"
                    value={inputs.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                />
                <br/>
                <input
                    type="text"
                    name="seatNum"
                    value={inputs.seatNum}
                    onChange={handleChange}
                    placeholder="Seat Number"
                />
                <br/>
                <input
                    type="text"
                    name="checkIn"
                    value={inputs.checkIn}
                    onChange={handleChange}
                    placeholder="Check In"
                />
                <br/>
                <button className="submitB">{ props.buttonText }</button>
            </form>
        </div>
        </div>
    )
}

export default AddManifest;