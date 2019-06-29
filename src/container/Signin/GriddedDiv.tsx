import React from 'react'

const logInteraction = ():void => {
    console.log('interacted with draggables')
}

interface compArg {
    gridController: (is_static: boolean) => void;
}

const gridDiv = ({gridController}: compArg) => {

    return (
        <div style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
        <span onMouseOver={() => gridController(false)} 
        onMouseLeave={() => gridController(true)}>
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