import React from "react"

import decorateQualities from './qualitie'

const User = (props) => {

    const {_id, name, qualities, profession, completedMeetings, rate, onDelete} = props
    
    return ( 
        <tr>
            <td>{name}</td>
            <td>{decorateQualities(qualities)}</td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td>
                {/* <svg class="bi" width="32" height="32" fill="currentColor">
                    <use xlink:href="bootstrap-icons.svg#heart-fill"/>
                </svg> */}
            </td>
            <td><button 
                    type = "button" 
                    className = "btn btn-danger badge m-2" 
                    onClick={() => onDelete(_id)}>delete
                </button>
            </td>
        </tr>
    )
}

export default User