import React from "react"
import PropTypes from "prop-types"

const SearchStatus = ({ count }) => {
    if (count === 0) {
        return <span className="badge bg-danger">Никто с тобой не тусанет</span>
    }

    const lastNumber = count % 10
    let strCount = ""

    if (count >= 5 && count <= 20) {
        strCount = `${count} человек тусанет`
    } else if (lastNumber === 1 || lastNumber === 0) {
        strCount = `${count} человек тусанет`
    } else if (lastNumber === 2 || lastNumber === 3 || lastNumber === 4) {
        strCount = `${count} человека тусанут`
    } else {
        strCount = `${count} человек тусанет`
    }

    return <span className="badge bg-primary">{strCount} с тобой сегодня</span>
}

SearchStatus.propTypes = {
    count: PropTypes.number.isRequired
}

export default SearchStatus
