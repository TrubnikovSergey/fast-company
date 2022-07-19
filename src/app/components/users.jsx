import User from "./user"
import Pagination from "./pagination"
import { useState } from "react"
import { paginate } from "../utils/paginate"

const Users = ({ users, status, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const count = users.length
    const pageSize = 4
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const userCrop = paginate(users, currentPage, pageSize)

    const createTable = () => {
        const { handlerDeletUser, handleChangeStatus } = rest

        return (
            <>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качество</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user) => (
                            <User
                                key={user._id}
                                {...user}
                                onDelete={handlerDeletUser}
                                status={
                                    status.find((item) => item._id === user._id)
                                        .status
                                }
                                onChangeStatus={handleChangeStatus}
                            />
                        ))}
                    </tbody>
                </table>
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </>
        )
    }

    return <>{count > 0 && createTable()}</>
}

export default Users
