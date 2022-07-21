import React from "react"
import PropTypes from "prop-types"

const BookMark = ({ status, _id: id, onChangeStatus }) => {
    return (
        <button
            className={status ? "bi bi-bookmark-fill" : "bi bi-bookmark"}
            onClick={() => onChangeStatus(id)}
        ></button>
    )
}

BookMark.propTypes = {
    status: PropTypes.bool.isRequired,
    _id: PropTypes.string.isRequired,
    onChangeStatus: PropTypes.func.isRequired
}

export default BookMark
