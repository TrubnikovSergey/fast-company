import React from "react"
import DecorateQualities from "./qualitie"
import PropTypes from "prop-types"

const QualitiesList = ({ qualities }) => {
    return <DecorateQualities qualities={qualities} />
}

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
}

export default QualitiesList
