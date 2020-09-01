import React, {useState} from 'react'

import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    meter: props =>({
        width: props.small ? 70 : '150px',
        marginLeft: 10,
        position: 'relative'
    }),
    bar: {
      background: (props) =>
        props.color, 
      width: (props) => props.votes,
      borderRadius: '0px 5px 5px 0px',
      height: 6,
      margin: 1,
    },
    majorityLine: {
        position: 'absolute',
        height: '120%',
        bottom: -2,
        borderLeft: (props)=> props.small ? '1px solid black' : '2px solid black',
    },
    majorityLabel: props=>({
        position: 'absolute',
        // right: '50%',
        textAlign: 'center',
        marginTop: props.small ? -14 : -18,
        marginLeft: props.small ?  -3 : -4,
        fontSize: props.small ? 8: 10,
        fontWeight: 'bolder'
    })


  });
  

function Bar(props) {
    const { color, votes, ...other } = props;
    const classes = useStyles(props);
    return <div className={classes.bar} {...other} />;
}

function Line(props) {
    const { color, majority, ...other } = props;
    const classes = useStyles(props);
    return <div className={classes.majorityLine} {...other} />;
}

const MajorityMeter = (props) => {
    
    // const { color, ...other } = props;

    const classes = useStyles(props)
    
    var lead = 61

    var majority = (props.majority/props.seatTotal)*100

    return (
        <div className={classes.meter}>
            <div className={classes.majorityLabel} style={{left: `${props.majorityPercent}%`}}>{props.majority}</div>
            {props.data && props.data.partyResults.map((party, i)=>{
                if (i === 0) {
                    lead = party.seats
                    majority = `${party.seats/props.seatTotal*100}%`
                }
                if (i < 3 && party.seats > 0) {
                    return <Bar color={party.color} votes={`${(party.seats/props.seatTotal)*100}%`} />
                }
            })    
            }
            {console.log('majority',majority)}
            <div className={classes.majorityLine} style={{left: `${props.majorityPercent}%`}}/>

        </div>
    );
}
export default MajorityMeter;