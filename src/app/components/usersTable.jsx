import React from "react"
import PropTypes from "prop-types"
import TableHeader from "./tableHeader"
import TableBody from "./tableBody"
import BookMark from "./bookmark"
import QualitiesList from "./qualitiesList"
import Table from "./table"

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    onDeleteUser,
    ...rest
}) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качество",
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    _id={user._id}
                    onToggleBookMark={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    type="button"
                    className="btn btn-danger badge m-2"
                    onClick={() => onDeleteUser(user._id)}
                >
                    delete
                </button>
            )
        }
    }

    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        >
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: users }} />
        </Table>
    )
}

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDeleteUser: PropTypes.func.isRequired
}

export default UsersTable
