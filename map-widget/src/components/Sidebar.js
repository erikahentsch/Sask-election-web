import React, {useState} from 'react'

import {makeStyles} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import {CSSTransition} from 'react-transition-group'



const styles = makeStyles({
    sidebar: {
        flex: 1, 
        position: 'relative',
        overflow: 'auto',
    },
    title: {
        position: 'sticky', 
        top: 0,
        backgroundColor: 'darkgrey',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: 10

        // textAlign: 'center',
        // verticalAlign: 'middle'
    },
    locationButtonContainer: {
    },
    LocationButton: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: 10,
        justifyContent: 'space-between',
        '&:hover': {
            backgroundColor: 'lightgrey',
            cursor: 'pointer'
        }
    }
})

const Sidebar = (props) =>  {
    const [title, setTitle] = useState('Select a province or territory');
    const [arrow, toggleArrow] = useState(false)
    const classes=styles();

    const LocationButton = (props) => {
        return (
            <div
                className={classes.LocationButton}
            >
                {props.children}
            </div>
        )
    }

    return (
        <div className={classes.sidebar}>
            <div className={classes.title}>{title}</div>
            {props.data && props.data.data.map(result=> {
                console.log(result);
                return <LocationButton>{result.name}{arrow && <ChevronRightIcon/>}</LocationButton>
            })}
        </div>
    )

}

export default Sidebar