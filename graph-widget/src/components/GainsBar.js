import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {CSSTransition, Transition} from 'react-transition-group'

const styles = makeStyles({
    partyContainer: props => ({
        alignItems: 'center',
        height: 25,
        margin: 3,
        position: 'relative',
        width: '80%',
        color: 'black',
        fontWeight: 'bold',
        letterSpacing: 1,
        display: 'flex',
        position: 'relative',
        justifyContent: 'space-between',
        borderBottom: '1px solid black',
        '& #minus': {
            position: 'absolute',
            left: -15
        },
        '& #plus': {
            position: 'absolute',
            right: -15
        }
    }),
    gainsBar: {
        backgroundColor: props=> props.color,
        position: "absolute",
        bottom: 0,
        right: props=> props.width <= 0 && '50%',
        left: props=> props.width > 0 && '50%',
        height: '60%',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: props=>props.color,
        margin: 0,
        padding: 0, 
        transition: `width 300ms ease-in-out`,
        transitionDelay: '100ms'
    }
})

const GainsBar = (props) => {
    const classes = styles(props) 
    const [barWidth, setWidth] = useState(0)  

    useEffect(() => {
        setWidth(props.width)
    }, [props])

    return (
        <div className={classes.partyContainer}>
            <div id="minus">-</div>
                <div style={{width: `${Math.abs(barWidth)}%`}} className={classes.gainsBar}></div>
            <div id="plus">+</div>
        </div>
    )
}

export default GainsBar