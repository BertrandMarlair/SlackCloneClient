import React from 'react'

const logInteraction = ():void => {
    console.log('interacted with draggables')
}


const gridDiv = () => {

    return (
        <div>
        <span>
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