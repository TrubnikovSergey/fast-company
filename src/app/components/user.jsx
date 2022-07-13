import React from "react"
import decorateQualities from './qualitie'
import BookMark from "./bookmark"

const User = (props) => {

    const {_id, 
            name, 
            qualities, 
            profession, 
            completedMeetings, 
            rate, 
            onDelete,
            status,
            onChangeStatus} = props

    return ( 
        <tr>
            <td>{name}</td>
            <td>{decorateQualities(qualities)}</td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td>
                <BookMark 
                    status = {status}
                    onChangeStatus = {onChangeStatus}
                    id ={_id}
                />
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