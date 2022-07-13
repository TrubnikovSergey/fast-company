import React from 'react'

const BookMark = ({status, id, onChangeStatus}) => {
    return <button 
                className={status ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'} onClick={() => onChangeStatus(id)}>
            </button>
}

export default BookMark