import React, { useState, useEffect } from "react"
import Users from "./components/users.jsx"
import API from "./api"

const App = () => {
    const [users, setUsers] = useState()

    const handlerDeletUser = (id) => {
        setUsers((oldState) => oldState.filter((user) => user._id !== id))
    }

    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data))
    }, [])

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((item) => {
                if (item._id === id) {
                    item.bookmark = !item.bookmark
                }
                return item
            })
        )
    }

    return (
        users && (
            <Users
                users={users}
                onDeleteUser={handlerDeletUser}
                onToggleBookMark={handleToggleBookMark}
            />
        )
    )
}

export default App
