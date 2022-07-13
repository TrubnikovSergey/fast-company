import React, {useState} from 'react'
import User from './user'
import API from '../api'
import SearchStatus from './searchStatus'

const Users = () => {

    const [users, setUsers] = useState(API.users.fetchAll())
    const [status, setStatus] = useState(users.map(item => ({_id: item._id, status: false})))
    
    const handlerDeletUser = (id) => {
        setUsers((oldState) => oldState.filter(user => user._id !== id))
    }

    const handleChangeStatus = (id) => {

        setStatus((oldStatus) => oldStatus.map(item => {
                if(item._id === String(id)){
                    item.status = !item.status
                }
                return item
            })
        )
    }

    const createTable = () => {  
        
        return (
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
                    {users.map(user =>  
                        <User 
                            key = {user._id} 
                            {...user} 
                            onDelete={handlerDeletUser}
                            status = {status.find(item => item._id === user._id).status} 
                            onChangeStatus = {handleChangeStatus}
                        />)}
                </tbody>
            </table>) 
        }
    
    return  (
        <>
            <SearchStatus count = {users.length}/>
            {(users.length > 0) && createTable()}
        </>
    )

}

export default Users