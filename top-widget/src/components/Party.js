import React from 'react'

import {makeStyles} from '@material-ui/core/styles'

const styles = makeStyles({
    partyContainer: {
        width: '20%',
        paddingTop: 5
    },
    party: props=> ({
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        letterSpacing: 2,
        padding: '5px 5px',
        margin: 1,
        borderRadius: 5,
        color: 'white',
        justifyItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: props.color 
    }),
    popVote: props=>({
        padding: 5,
        fontWeight: 'bold',
        fontSize: 14
    })
})

const Party = (props) => {
    
    const classes = styles(props)
    
    return (
        <div className={classes.partyContainer}>
            <div className={classes.party}>
                <div>{props.name}</div>
                <div>{props.seats}</div>
            </div>
            <div className={classes.popVote}>
                {props.small === 'true' ?` ${props.votes}%` : `Pop vote: ${props.votes}%` }
            </div>
        </div>
    );
}

export default Party;