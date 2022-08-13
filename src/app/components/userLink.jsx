import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const UserLink = ({ user }) => {
    return <Link to={`/users/${user._id}`}>{user.name}</Link>
}

UserLink.propTypes = {
    user: PropTypes.object
}

export default UserLink
