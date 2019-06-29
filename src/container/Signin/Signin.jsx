import React, { useState } from 'react'
import { withStyles } from '@material-ui/core'
import HomeStyle from './HomeStyle'

import GridLayout from 'react-grid-layout'
import GridDiv from './GriddedDiv'

import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'

const Display = () => {
    const [layout, setLayout] = useState(
        [
            {i: 'a', x: 0, y: 0, w: 3, h: 2, static: true},
            {i: 'b', x: 4, y: 0, w: 3, h: 2, static: true},
            {i: 'c', x: 8, y: 0, w: 3, h: 2, static: true}
        ]
    )

    const gridController = is_permitted => {
        setLayout(layout.map(
            el => ({...el, static: is_permitted})
        ))
    }

    const onLayoutChange = passed_layout => {
        setLayout(passed_layout)
    }
    
    return (
        <div style={{backgroundColor: 'grey', width: '100%'}}>
            <p>test</p>

            <GridLayout className="layout" 
            layout={layout} 
            cols={12} 
            rowHeight={100} 
            width={1900}
            onLayoutChange={onLayoutChange}>

                <div key="a">
                    <GridDiv
                    gridController={gridController}
                    />
                </div>
                <div key="b">
                    <GridDiv
                    gridController={gridController}
                    />
                </div>
                <div key="c">
                    <GridDiv
                    gridController={gridController}
                    />
                </div>

            </GridLayout>

        </div>
    )
}

export default withStyles(HomeStyle)(Display)