import React, {useEffect} from 'react'

import {makeStyles} from '@material-ui/core'

const styles = makeStyles({
    geoTooltip: {
        fontFamily: 'Roboto, Ubuntu, Helvetica',
        display: 'flex',
        flexDirection: 'column',
        transition: '1s', 
        width: 200,
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap',
    },
    tooltipName: {
        fontSize: 20,
        fontWeight: 'bolder',
        
    },
    tooltipPolls: {
        fontSize: 14,
        color: 'grey',
        paddingBottom: 10
    },
    tooltipWinner:{
        backgroundColor: props=>props.color,
        color: props=>props.color === '#C0C0C0'? 'black' : 'white',
        padding: 5, 
        '& #tooltipPartyCode': {
            fontSize: 18
        },
        '& #tooltipWinnerName': {
            fontSize: 20,
            fontWeight: 'bolder',
            // whiteSpace: 'pre-wrap',

        },
        '& #tooltipWinningBy' : {

        }
    }
})


const Tooltip = (props) => {

    const classes = styles(props)

    const getWinningBy = () => {
        try {
            let winner = props.results.results[0]
            let runnerup = props.results.results[1]
            if (winner.votes > runnerup.votes) {
                return `Leading by ${(winner.votes - runnerup.votes).toLocaleString('en')} votes`
            }
        } catch (e) {
            // return ''
        }
    }

    const getWinner = () => {
        try {
            if (props.results.results[0].votes > 0) {
            return ( <div className={classes.tooltipWinner} style={{backgroundColor: props.color}}>
                <div id="tooltipPartycode">{props.results.results[0].partyCode}</div>
                <div id="tooltipWinnerName">{props.results.results[0].name}</div>
                <div id="tooltipWinningBy">{getWinningBy()}</div>
            </div>)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={classes.geoTooltip}>
            <div className={classes.tooltipName}>{props.results.name}</div>
            <div className={classes.tooltipPolls}>{props.results.pollsReported}/{props.results.pollsTotal} polls reported</div>
            {props.results.pollsReported > 0 &&
                getWinner()
            }
        </div>
    )
}

export default Tooltip