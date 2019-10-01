import React, { useEffect, useState } from 'react';

const MyItinerary = props => {
    // create a state variable for itinerary items - useState()
    const [itineraryList, setItineraryList] = useState([])
    // Create useEffect() to do this:
    // Fetch the data from 8000/itineraryitems
    // convert to JSON
    // store itinerary items in state variable
    // Create HTML representation with JSX
    useEffect(() => {
        fetch("http://localhost:8000/itineraryitems", {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
            }
        })
            .then(response => response.json())
            .then(setItineraryList)
    }, [])

    const handleOnClickDeleteButton = deletethisitem => {
        fetch(`http://localhost:8000/itineraryitems/${deletethisitem}`, {
            "method": "DELETE",
            "headers": {
                "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
            }
        })
            .then(() => {
                fetch("http://localhost:8000/itineraryitems", {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json",
                        "Authorization": `Token ${localStorage.getItem("kennywood_token")}`
                    }
                })
                    .then(response => response.json())
                    .then(setItineraryList)
            })
    }

    return (
        <>
            <h2>What I want to Do on Saturday</h2>
            <ul>
                {
                    itineraryList.map(item => {
                        return (<li key={item.id}>
                            {item.starttime}
                            {item.attraction.name}
                            {item.attraction.area.name}
                            <button className="btn btn-primary" onClick={() => handleOnClickDeleteButton(item.id)}>
                                Delete This </button>
                        </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default MyItinerary