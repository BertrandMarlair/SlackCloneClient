import React from 'react'

const logInteraction = ():void => {
    console.log('interacted with draggables')
}

const gridDiv = (props:any):any => {

    return (
        <div style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
        <span onMouseOver={() => props.gridController(false)} 
        onMouseLeave={() => props.gridController(true)}>
            ::hover me to allow drag and drop::
        </span>

        <h4>im the draggable</h4>

        <button onClick={() => logInteraction()}>
            click me
        </button>
        </div>
    )
}

export default gridDiv