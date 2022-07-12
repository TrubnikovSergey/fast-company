const decorateQualities = (qualities) => {

    const decorqualities = qualities.map(item => {    
        const classes = `m-2 badge bg-${item.color}`    
        return <span key = {item._id} className = {classes}>{item.name}</span>
    })

    return decorqualities
}

export default decorateQualities