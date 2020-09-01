import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

const styles = makeStyles({
    partyContainer: props => ({
        backgroundColor: props.party.color,
        padding: 5,
        maxHeight: 40,
        margin: 3,
        borderRadius: 5,
        color: 'white',
        fontWeight: 'bold',
        letterSpacing: 1,
        display: 'flex',
        justifyContent: 'space-between'
    })
})

const PartyCard = (props) => {

    const classes = styles(props)

    return (
        <div className={classes.partyContainer}>
            <div>{props.party.nameShort}</div>
            <div>{props.result > 0 && '+'}{props.result}</div>
        </div>
    )
}

export default PartyCard