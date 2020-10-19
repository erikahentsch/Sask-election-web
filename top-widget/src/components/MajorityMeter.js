import React, {useState, useEffect} from 'react'

import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
    meter: props =>({
        width: 120,
        marginLeft: 10,
        position: 'relative'
    }),
    bar: {
      background: (props) =>
        props.color, 
      width: (props) => props.votes,
      borderRadius: '0px 5px 5px 0px',
      height: 5,
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
        fontSize: 12,
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

    const [maxSeats, setMaxSeats] = useState(25)
    const [difference, setDifference] = useState(0);
    const [majorityPosition, setMajorityPosition] = useState(50);
    const [leading, setLeading] = useState(0)
    const classes = useStyles(props)
    
    useEffect(()=> {
        if (props.data) {
            let leadingParty = props.data.partyResults[0];
            console.log('leading', props.majority, leadingParty.seats)
            if (leadingParty.seats >= props.majority) {
                setMaxSeats(leadingParty.seats);
                setMajorityPosition(props.majority/leadingParty.seats*100)
            } else {
                setMaxSeats(props.majority)
                setMajorityPosition(props.majority/props.majority*100)
            }
        }
    }, [props.data])

    return (
        <div className={classes.meter}>
            {/* <div className={classes.majorityLabel} style={{right: `${100-majorityPosition}%`}}>{props.majority} seats needed for majority</div> */}
            {props.data && props.data.partyResults.map((party, i)=>{
                console.log('max seats', maxSeats)
                if (i < 4) {
                    return <Bar color={party.color} votes={party.seats > 0 ? `${(party.seats/maxSeats)*100}%` : '2%'} />
                } 
            })    
            }
            {/* {console.log('majority',majority)} */}
            <div className={classes.majorityLine} style={{left: `${majorityPosition}%`}}/>

        </div>
    );
}
export default MajorityMeter;