import React from 'react'

import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    meter: {
        width: '100%',
        marginLeft: 10,
        position: 'relative'
    },
    bar: {
      background: (props) =>
        props.color, 
      width: (props) => props.votes,
      borderRadius: '0px 5px 5px 0px',
      height: 10,
      margin: 2,
    },
    majorityLine: {
        position: 'absolute',
        height: 20,
        bottom: -2,
        left: (props)=>props.majority,
        borderLeft: '2px solid black',
    },
    majorityLabel: {
        position: 'absolute',
        // right: '50%',
        textAlign: 'center',
        marginTop: -22,
        left: (props)=>`${props.majority}%`,
        fontSize: 14,
        fontWeight: 'bolder'
    }


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

const Seat = (props) => {
    
    // const { color, ...other } = props;

    const classes = useStyles(props)
    
    var lead = 61

    var majority = 31/61*100

    return (
        <div className={classes.meter}>
            <div className={classes.majorityLabel} style={{right: `${majority}%`}}>31 seats needed for majority</div>
            {props.data && props.data.partyResults.map((party, i)=>{
                if (i === 0) {
                    lead = party.seats
                    majority = `${party.seats/61*100}%`
                }
                if (i < 3 && party.seats > 0) {
                    return <Bar color={party.color} votes={`${(party.seats/61)*100}%`} />
                }
            })    
            }
            <Line color={"red"} majority={`50.8%`}/>

        </div>
    );
}

export default Seat;