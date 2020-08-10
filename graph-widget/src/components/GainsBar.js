import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

const styles = makeStyles({
    partyContainer: props => ({
        height: 25,
        margin: 3,
        width: '80%',
        color: 'black',
        fontWeight: 'bold',
        letterSpacing: 1,
        display: 'flex',
        position: 'relative',
        justifyContent: 'space-between',
        borderBottom: '1px solid black',
    }),
    gainsBar: props=>({
        backgroundColor: props.color,
        position: "absolute",
        bottom: 0,
        left: '50%',
        width: `${props.width/2}%`,
        height: '60%',
        margin: 0,
        padding: 0
    })
})

const GainsBar = (props) => {

    const classes = styles(props)

    return (
        <div className={classes.partyContainer}>
            -
            <div className={classes.gainsBar}></div>
            +
        </div>
    )
}

export default GainsBar