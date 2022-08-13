import React from "react"
import UsersList from "../components/users"
import { useParams } from "react-router-dom"
import User from "../components/user"

const Users = () => {
    const { userId } = useParams()

    return userId ? <User userId={userId} /> : <UsersList />
}

export default Users
