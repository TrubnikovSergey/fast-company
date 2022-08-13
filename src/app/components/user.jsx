import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import API from "../api"
import QualitiesList from "./qualitiesList"
import _ from "lodash"
import { useHistory } from "react-router-dom"

const User = ({ userId }) => {
    const [user, setUser] = useState()
    const history = useHistory()

    const renderUser = (user) => {
        const handlerAllUsers = () => {
            history.replace("/users")
        }
        return (
            <>
                <h1>{user.name}</h1>
                <h2>{`Профессия: ${_.get(user, "profession.name")}`}</h2>
                <QualitiesList qualities={user.qualities} />
                <h3>completedMeetings: {user.completedMeetings}</h3>
                <h1>Rate: {user.rate}</h1>
                <button onClick={handlerAllUsers}>Все пользователи</button>
            </>
        )
    }

    useEffect(() => {
        API.users.getById(userId).then((user) => setUser(user))
    }, [])

    return user ? renderUser(user) : <h1>Loading</h1>
}

User.propTypes = {
    userId: PropTypes.string
}

export default User
