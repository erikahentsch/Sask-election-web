import React from 'react'

import {makeStyles} from '@material-ui/core/styles'

const styles = makeStyles({
    seat: props=> ({
        height: 20, 
        minWidth: '4%',
        margin: '0.2%',
        backgroundColor:  props.color,
        flexShrink: 1, 
        fontSize: props=>props.small === "true" ? 8 : 10
    })
})

const Seat = (props) => {
    
    const classes = styles(props)
    
    return <div key={`${props.party}-${props.el}`} className={classes.seat}/>
}

export default Seat;