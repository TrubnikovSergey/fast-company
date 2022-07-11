import React, {useState} from 'react'
import API from '../api'

const TablePatyGuys = () => {

    const [guys, setGuys] = useState(API.users.fetchAll())

    const decorateQualities = (qualities) => {

        const list = qualities.map(item => {    
            const classes = `m-2 badge bg-${item.color}`    
            return <span key = {item._id} className = {classes}>{item.name}</span>
        })
    
        return list
    }
    
    const handlerDeletGuy = (id) => {
        setGuys((oldState) => oldState.filter(guy => guy._id !== id))
    }

    const users = guys.map(user => {
        
        const {_id, name, qualities, profession, completedMeetings, rate} = user
        return ( 
            <tr key = {_id}>
                <td>{name}</td>
                <td>{decorateQualities(qualities)}</td>
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate}/5</td>
                <td><button 
                        type = "button" 
                        className = "btn btn-danger badge m-2" 
                        onClick={() => handlerDeletGuy(user._id)}>delete
                    </button>
                </td>
            </tr>
        )

    })

    const thead = (
        <thead>
            <tr>
                <th scope = "col">Имя</th>
                <th scope = "col">Качество</th>
                <th scope = "col">Профессия</th>
                <th scope = "col">Встретился, раз</th>
                <th scope = "col">Оценка</th>
                <th scope = "col"></th>
            </tr>
        </thead>)

    
    const table = (  
        <table className = "table">
            {thead}
            <tbody>
                {users}
            </tbody>
        </table>)

    const stringCountGuys = (count) => {

        if(count === 0){
            return <span className = "badge bg-danger">Никто с тобой не тусанет</span>
        }        

        const lastNumber = (count % 10)
        let strCount = ''

        if(count >= 5 && count <= 20){

            strCount = `${count} человек тусанет`

        }else if(lastNumber === 1 || lastNumber === 0){

            strCount = `${count} человек тусанет`

        }else if(lastNumber === 2 || lastNumber === 3 || lastNumber === 4){

            strCount = `${count} человека тусанут`
        }else{

            strCount = `${count} человек тусанет`
        }

        let stringcountguys = <span className = "badge bg-primary">{strCount} с тобой сегодня</span>
        return stringcountguys

    }

    if(guys.length){

        return  (
            <>
                {stringCountGuys(guys.length)}
                {table}
            </>
        )

    }else{

        return stringCountGuys(guys.length)

    }

}

export default TablePatyGuys