import React from 'react'

const AddTripButton = props => {
return <button onClick={props.addTrip}>{props.addText}</button>
}

export default AddTripButton