import React from "react"
import DecorateQualities from "./qualitie"
import BookMark from "./bookmark"
import PropTypes from "prop-types"

const User = (props) => {
    const {
        _id,
        name,
        qualities,
        profession,
        completedMeetings,
        rate,
        onDelete
    } = props

    return (
        <tr>
            <td>{name}</td>
            <td>
                <DecorateQualities qualities={qualities} />
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td>
                <BookMark {...props} />
            </td>
            <td>
                <button
                    type="button"
                    className="btn btn-danger badge m-2"
                    onClick={() => onDelete(_id)}
                >
                    delete
                </button>
            </td>
        </tr>
    )
}

User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default User
