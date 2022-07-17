import User from './user'

const Users = ({users, status, ...rest}) => {


    const createTable = () => {  
        
        const {handlerDeletUser, handleChangeStatus} = rest

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
            {(users.length > 0) && createTable()}
        </>
    )

}

export default Users