import React, {useState, useEffect} from 'react'

import {makeStyles} from '@material-ui/core/styles'

// import {CSSTransition} from 'react-transition-group'

const useStyles = makeStyles({
    meter: {
        maxWidth: '90%',
        position: 'relative',
        minHeight: '20px',

    },
    bar: {
      background: (props) =>
        props.color, 
      width: (props) => props.votes,
      borderRadius: '0px 5px 5px 0px',
      height: 10,
      margin: 2,
      animationName: 'animate-bar',
      animationDuration: '0.5s'
    },
    majorityLine: {
        position: 'absolute',
        height: '120%',
        minHeight: '20px',
        bottom: -2,
        borderLeft: '2px solid black',
    },
    majorityLabel: {
        position: 'absolute',
        textAlign: 'left',
        bottom: 50,
        marginLeft: -7,
        fontWeight: 'bolder'
    }
  });
  

function Bar(props) {
    // const [width, setWidth] = useState(0)
    const { color, votes, ...other } = props;
    const classes = useStyles(props);
    return <div className={`animate-bar ${classes.bar}`} {...other} />;
}

function Line(props) {
    const { color, majority, ...other } = props;
    const classes = useStyles(props);
    return <div className={classes.majorityLine} {...other} />;
}

const Barchart = (props) => {
    
    // const { color, ...other } = props;
    const [difference, setDifference] = useState(0);
    const [majorityPosition, setMajorityPosition] = useState(50);
    const [leading, setLeading] = useState(0)
    const classes = useStyles(props)
    
    useEffect(()=> {
        if (props.data) {
            let leadingParty = props.data.partyResults[0];
            let majority = (props.majority/props.seatTotal*100)
            if (leadingParty.seats > props.majority) {
                let leadDifference = 100 - (leadingParty.seats/props.seatTotal*100)
                console.log(leadDifference)
                setDifference(leadDifference);
                setLeading(leadingParty.seats)
                setMajorityPosition( majority + leadDifference);
            } else {
                // let leadDifference = ((leadingParty.seats/props.majority)*100)
                setDifference(-1)
                setMajorityPosition(100)

            }
        }
    }, [props.data])

    var lead = 61

    var majority = (props.majority/props.seatTotal)*100

    return (
        <div className={classes.meter}>
            <div className={classes.majorityLabel} style={{left: `${majorityPosition}%`}}>{props.majority} seats needed for majority</div>
            {props.data && props.data.partyResults.map((party, i)=>{
                if (i === 0) {
                    let test = 100 - (party.seats/props.seatTotal)*100;
                    console.log(test)
                    lead = party.seats
                    majority = `${party.seats/props.seatTotal*100}%`
                    if (difference > 0) {
                        return <Bar color={party.color} votes={`${(party.seats/props.seatTotal)*100 + difference}%`} />
                    } else if (difference < 0) {
                        return <Bar color={party.color} votes={`${(party.seats/props.majority)*100}%`} />
                    }
                } else if (i < 3 && party.seats > 0) {
                    if (difference > 0) {
                        return <Bar color={party.color} votes={`${(party.seats/leading)*100}%`} />

                    } else if (difference < 0) {
                        return <Bar color={party.color} votes={`${(party.seats/props.majority)*100}%`} />

                    }
                }
            })    
            }
            {console.log('majority',majority)}
            <div className={classes.majorityLine} style={{left: `${majorityPosition}%`}}/>

        </div>
    );
}

export default Barchart;