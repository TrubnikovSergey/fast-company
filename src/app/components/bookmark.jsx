import React, {useState} from 'react'

const BookMark = ({status}) => {

    const [bookMark, setBookMark] = useState(status)

    const handleClick = () => {
        
        setBookMark(!bookMark)
    }

    return <button className={bookMark ? 'bi bi-bookmark' : 'bi bi-bookmark-fill'} onClick = {handleClick}></button>
}

export default BookMark