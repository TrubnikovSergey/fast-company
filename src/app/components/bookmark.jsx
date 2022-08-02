import React from "react"
import PropTypes from "prop-types"

const BookMark = ({ status, _id: id, onToggleBookMark }) => {
    return (
        <button
            className={status ? "bi bi-bookmark-fill" : "bi bi-bookmark"}
            onClick={() => onToggleBookMark(id)}
        ></button>
    )
}

BookMark.propTypes = {
    status: PropTypes.bool.isRequired,
    _id: PropTypes.string.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
}

export default BookMark
