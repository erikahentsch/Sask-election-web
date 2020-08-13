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
        height: 20,
        bottom: -2,
        right: (props)=>props.majority,
        borderLeft: (props)=> props.small ? '1px solid black' : '2px solid black',
    },
    majorityLabel: props=>({
        position: 'absolute',
        // right: '50%',
        textAlign: 'center',
        marginTop: props.small ? -14 : -18,
        marginRight: props.small ?  -3 : -4,
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
    // const [offset, setOffset] = useState(0)
    const [majority, setMajority] = useState(31/61 * 100)
    const classes = useStyles(props)
    
    // useEffect(()=>{
    //     console.log(props)
    //     if (props.data) {
    //         let maxSeats = props.data.partyResults[0].seats
    //         if (maxSeats > 0) {
    //             let seatOffset = 0
    //             if (maxSeats > 31) {
    //                 seatOffset = 100 - (maxSeats/61 * 100)
    //             }
                
    //             console.log(seatOffset.toFixed(2))
    //             setOffset(seatOffset)
    //             setMajority((31/61 * 100))
    //         }
    //     }
    // }, [props.data])


    // var majority = 31/61*100

    return (
        <div className={classes.meter}>
            <div className={classes.majorityLabel} style={{right: `${majority}%`}}>31</div>
            {(props.data) && props.data.partyResults.map((party, i)=>{
                if (i === 0) {
                    return <Bar key={i} color={party.color} votes={`${(party.seats/61)*100}%`} />
                }
                if (i < 3 && party.seats > 0) {
                    return <Bar key={i} color={party.color} votes={`${(party.seats/61)*100}%`} />
                }
            })    
            }
            <Line small={props.small} color={"red"} majority={`${majority}%`}/>

        </div>
    );
}

export default MajorityMeter;