import React from "react"
import PropTypes from "prop-types"

const DecorateQualities = ({ qualities }) => {
    const decorqualities = qualities.map((item) => {
        const classes = `m-2 badge bg-${item.color}`
        return (
            <span key={item._id} className={classes}>
                {item.name}
            </span>
        )
    })

    return decorqualities
}

DecorateQualities.propTypes = {
    qualities: PropTypes.array.isRequired
}

export default DecorateQualities
