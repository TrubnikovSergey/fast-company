import React,{useState} from "react"

const Counter = () => {

    const [count, setCount] = useState(0)
    const [tags, setTags] = useState(['tag1','tag2','tag3'])

    const formatCount = () => {
        return count === 0 ? 'empty' : count
    }

    const getClasses = () => {

        let classesBG = 'badge m-2 '
        classesBG += count === 0 ? 'bg-warning' : 'bg-primary'
        return classesBG

    }

    const handleIncrement = () => {
        setCount((prevState) => prevState + 1)
    }

    
    const handleDecrement = () => {
        setCount((prevState) => prevState - 1)
    }

    const handelTagChange = (id) => {

        // setTags(['tag4','tag5'])
        setTags((prevState) => prevState.filter((tag) => tag !== id))

    }

    const tagsRender = () => {
        if(tags.length === 0){
            return 'No Tags'
        }
        return tags.map(tag => 
            <li key={tag} 
            className='btn btn-primary btn-sm m-2'
            onClick={() => handelTagChange(tag)}>{tag}</li>
        )
    }

    return (
    <>
        <ul>
            {tagsRender()}
        </ul>
        <span className={getClasses()}>{formatCount()}</span>
        <button className="btn btn-primary btn-sm m-2" onClick={handleIncrement}>+</button>
        <button className="btn btn-primary btn-sm m-2" onClick={handleDecrement}>-</button>
    </>)
}

export default Counter