import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

const styles = makeStyles({
    partyContainer: props => ({
        height: 25,
        margin: 3,
        position: 'relative',
        width: '80%',
        color: 'black',
        fontWeight: 'bold',
        letterSpacing: 1,
        display: 'flex',
        position: 'relative',
        justifyContent: 'space-between',
        borderBottom: '1px solid black',
        '& #minus': {
            position: 'absolute',
            left: -5
        },
        '& #plus': {
            position: 'absolute',
            right: -5
        }
    }),
    gainsBar: props=>({
        backgroundColor: props.color,
        position: "absolute",
        bottom: 0,
        left: '50%',
        width: `${(props.width/2)}%`,
        height: '60%',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: props.color,
        margin: 0,
        padding: 0
    })
})

const GainsBar = (props) => {

    const classes = styles(props)

    return (
        <div className={classes.partyContainer}>
            <div id="minus">-</div>
            <div className={classes.gainsBar}></div>
            <div id="plus">+</div>
        </div>
    )
}

export default GainsBar