import User from "./user"
import Pagination from "./pagination"
import React, { useState, useEffect } from "react"
import { paginate } from "../utils/paginate"
import PropTypes from "prop-types"
import api from "../api"
import GroupList from "./groupList"
import SearchStatus from "./searchStatus"

const Users = ({ users, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfession] = useState()
    const [selectProf, setSelectProf] = useState()
    const pageSize = 2
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }
    const handleProfessionlSelect = (item) => {
        setSelectProf(item)
    }

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [selectProf])

    let filteredUsers = null
    if (selectProf) {
        filteredUsers = users.filter(
            (user) =>
                JSON.stringify(user.profession) === JSON.stringify(selectProf)
        )
    } else {
        filteredUsers = users
    }

    const count = filteredUsers.length
    if ((currentPage - 1) * pageSize >= filteredUsers.length) {
        setCurrentPage(currentPage - 1)
    }
    const userCrop = paginate(filteredUsers, currentPage, pageSize)

    const clearFilter = () => {
        setSelectProf()
    }

    const createTable = () => {
        const { handlerDeletUser, handleChangeStatus } = rest

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectItem={selectProf}
                            items={professions}
                            onItemSelect={handleProfessionlSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <div className="w-10 bd-highlight">
                        <SearchStatus count={count} />
                    </div>

                    {users.length > 0 && (
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
                                            users.find(
                                                (item) => item._id === user._id
                                            ).bookmark
                                        }
                                        onChangeStatus={handleChangeStatus}
                                    />
                                ))}
                            </tbody>
                        </table>
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        )
    }

    return createTable()
}

Users.propTypes = {
    users: PropTypes.array,
    handlerDeletUser: PropTypes.func.isRequired,
    handleChangeStatus: PropTypes.func.isRequired
}

export default Users
