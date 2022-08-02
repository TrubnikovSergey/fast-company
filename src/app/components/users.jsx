import Pagination from "./pagination"
import React, { useState, useEffect } from "react"
import { paginate } from "../utils/paginate"
import PropTypes from "prop-types"
import api from "../api"
import GroupList from "./groupList"
import SearchStatus from "./searchStatus"
import UsersTable from "./usersTable"
import _ from "lodash"

const Users = ({ users, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfession] = useState()
    const [selectProf, setSelectProf] = useState()
    const pageSize = 8
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" })

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }
    const handleProfessionlSelect = (item) => {
        return setSelectProf(item)
    }

    const handleSort = (item) => {
        setSortBy(item)
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

    if ((currentPage - 1) * pageSize >= count) {
        setCurrentPage(currentPage - 1)
    }

    const sortedUsers = _.orderBy(filteredUsers, sortBy.path, sortBy.order)
    const userCrop = paginate(sortedUsers, currentPage, pageSize)

    const clearFilter = () => {
        setSelectProf()
    }

    const createTable = () => {
        return (
            <div className="d-flex">
                {professions && users.length > 0 && (
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

                    {userCrop.length > 0 && (
                        <UsersTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            {...rest}
                        />
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
    users: PropTypes.array
}

export default Users
