import React from 'react'

import {makeStyles} from '@material-ui/core/styles'


const styles = makeStyles({
    seat: {
        height: (props)=>props.small ? 10: 15, 
        minWidth: '4%',
        margin: '0.1%',
        backgroundColor:  (props)=>props.color,
        flexShrink: 1,
        fontSize: 16
    }
})

const Seat = (props) => {
    
    const classes = styles(props)
    
    return <div key={`${props.party}-${props.el}`} className={classes.seat}/>
}

export default Seat;