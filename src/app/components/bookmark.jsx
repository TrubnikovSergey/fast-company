import React from 'react'

const BookMark = ({status, _id: id, onChangeStatus}) => {
    return <button 
                className={status ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'} onClick={() => onChangeStatus(id)}>
            </button>
}

export default BookMark