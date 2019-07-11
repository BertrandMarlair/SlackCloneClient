import React, { Suspense, useRef, useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core'
import DashStyle from './DashStyle'
import CustomLoading from '../../component/CustomLoading/CustomLoading'
import GridLayout from 'react-grid-layout'
import Paper from '@material-ui/core/Paper'
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

const GridSystem = props => (
    <Suspense fallback={<CustomLoading />}>
        {console.log(props)}
        <Container {...props} />
    </Suspense>
)

const Container = ({classes, grid, layout}) => {
    const dashboardLayoutEL = useRef(null);
    const [ dashboardSise,  setDashboardSize ] = useState(0)

    useEffect(() => {
        setDashboardSize(dashboardLayoutEL.current.clientWidth)
        window.addEventListener('resize', resizeWindow)
        return () => {
            window.removeEventListener('resize', resizeWindow)
        };
    }, [])

    const resizeWindow = () => {
        setDashboardSize(dashboardLayoutEL.current.clientWidth)
    }

    return (
        <div ref={dashboardLayoutEL}>
            {console.log(layout)}
            <GridLayout 
                className="layout" 
                cols={layout.cols} 
                rowHeight={layout.rowHeight} 
                width={dashboardSise} 
            >
                {grid.map(item => (
                    <Paper className={classes.girdLayoutItem} key={`userId/${item.id}`} data-grid={{...item.itemDisplayParams}}>
                        {item.headerTitle}
                    </Paper>
                ))}
            </GridLayout>
        </div>
    )
}

export default withStyles(DashStyle)(GridSystem)