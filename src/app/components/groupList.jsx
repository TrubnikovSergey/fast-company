import React from "react"
import PropTypes from "prop-types"

const GroupList = ({
    items,
    valueProperties,
    contentProperties,
    onItemSelect,
    selectItem
}) => {
    return (
        <ul className="list-group">
            {Object.keys(items).map((key) => {
                return (
                    <li
                        key={items[key][valueProperties]}
                        className={
                            "list-group-item" +
                            (items[key] === selectItem ? " active" : "")
                        }
                        role="button"
                        onClick={() => onItemSelect(items[key])}
                    >
                        {items[key][contentProperties]}
                    </li>
                )
            })}
        </ul>
    )
}
GroupList.defaultProps = {
    valueProperties: "_id",
    contentProperties: "name"
}

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    contentProperties: PropTypes.string.isRequired,
    valueProperties: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectItem: PropTypes.object
}

export default GroupList
