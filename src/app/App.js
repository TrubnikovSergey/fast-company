import React, { useState, useEffect } from "react"
import Users from "./components/users.jsx"
import API from "./api"

const App = () => {
    const [users, setUsers] = useState(API.users.fetchAll())

    const handlerDeletUser = (id) => {
        setUsers((oldState) => oldState.filter((user) => user._id !== id))
    }

    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data))
    }, [])

    const handleChangeStatus = (id) => {
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
        <>
            {users.length > 0 && (
                <Users
                    users={users}
                    handlerDeletUser={handlerDeletUser}
                    handleChangeStatus={handleChangeStatus}
                />
            )}
        </>
    )
}

export default App
