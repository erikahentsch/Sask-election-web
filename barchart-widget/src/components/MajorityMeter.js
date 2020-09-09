import React, {useState, useEffect} from 'react'

import {makeStyles} from '@material-ui/core/styles'

// import {CSSTransition} from 'react-transition-group'

const useStyles = makeStyles({
    meter: {
        maxWidth: '95%',
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
      animationDuration: '0.5s',
      transition: `width 300ms ease-in-out`,
      transitionDelay: '100ms',
      zIndex: 20

    },
    majorityLine: {
        position: 'absolute',
        height: '120%',
        minHeight: '20px',
        bottom: -2,
        borderLeft: '2px solid black',
        transition: `left 300ms ease-in-out`,
    },
    majorityLabel: {
        position: 'absolute',
        textAlign: 'left',
        bottom: 50,
        marginLeft: -7,
        fontWeight: 'bolder',
        transition: `right 300ms ease-in-out`,
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

    var lead = 61

    var majority = (props.majority/props.seatTotal)*100

    return (
        <div className={classes.meter}>
            <div className={classes.majorityLabel} style={{right: `${100-majorityPosition}%`}}>{props.majority} seats needed for majority</div>
            {props.data && props.data.partyResults.map((party, i)=>{
                console.log('max seats', maxSeats)
                if (i < 3) {
                    return <Bar color={party.color} votes={`${(party.seats/maxSeats)*100}%`} />
                } 
            })    
            }
            {console.log('majority',majority)}
            <div className={classes.majorityLine} style={{left: `${majorityPosition}%`}}/>

        </div>
    );
}

export default Barchart;