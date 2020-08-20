import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'


import Gainsbar from './GainsBar'

const styles = makeStyles({
	gainsDiv: {
        flex: 5,
        display: 'flex',
        flexDirection: 'column',
		alignItems: 'center',
	},
})

const Gains = (props) => {
    
    const [max, setMax] = useState(0);

    const classes = styles(props)


    useEffect(()=>{
        let tempMax = 0
        if (props.data) {
            props.data.partyResults.forEach(party=> {
                console.log("party",party.seatChange, tempMax)
                if (Math.abs(party.seatChange) > tempMax) {
                    tempMax = Math.abs(party.seatChange)
                }
            })
            setMax(tempMax)

        }

    },[props.data])

    return (
        <div className={classes.gainsDiv}>
            {props.data && props.data.partyResults.map((party,i)=>{
                let partyWidth = 0
                if (max !== 0) {
                    partyWidth = (party.seatChange)/(max + 1) * 100;
                }
                return <Gainsbar key={i} color={party.color} width={`${partyWidth/2}`}/>
            })}
        </div>
    )
}

export default Gains