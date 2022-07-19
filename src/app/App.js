import { useState } from "react"
import Users from "./components/users.jsx"
import API from "./api"
import SearchStatus from "./components/searchStatus"

const App = () => {
    const [users, setUsers] = useState(API.users.fetchAll())
    const [status, setStatus] = useState(
        users.map((item) => ({ _id: item._id, status: false }))
    )
    const handlerDeletUser = (id) => {
        setUsers((oldState) => oldState.filter((user) => user._id !== id))
    }

    const handleChangeStatus = (id) => {
        setStatus(
            status.map((item) => {
                if (item._id === id) {
                    item.status = !item.status
                }
                return item
            })
        )
    }

    return (
        <>
            <SearchStatus count={users.length} />
            {users.length > 0 && (
                <Users
                    users={users}
                    handlerDeletUser={handlerDeletUser}
                    handleChangeStatus={handleChangeStatus}
                    status={status}
                />
            )}
        </>
    )
}

export default App
