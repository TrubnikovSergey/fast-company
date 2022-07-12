import React, {useState} from 'react'
import User from './user'
import API from '../api'
import SearchStatus from './searchStatus'

const Users = () => {

    const [users, setUsers] = useState(API.users.fetchAll())
    
    const handlerDeletUser = (id) => {
        setUsers((oldState) => oldState.filter(user => user._id !== id))
    }

    const table = (  
        <table className = "table">
            <thead>
                <tr>
                    <th scope = "col">Имя</th>
                    <th scope = "col">Качество</th>
                    <th scope = "col">Профессия</th>
                    <th scope = "col">Встретился, раз</th>
                    <th scope = "col">Оценка</th>
                    <th scope = "col">Избранное</th>
                    <th scope = "col"></th>
                </tr>
            </thead>
            <tbody>
                {users.map(user =>  <User key = {user._id} {...user} onDelete={handlerDeletUser}/>)}
            </tbody>
        </table>)
    
    return  (
        <>
            <SearchStatus count = {users.length}/>
            {(users.length > 0) && table}
        </>
    )

}

export default Users