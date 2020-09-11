import React from 'react';
import {makeStyles} from '@material-ui/core'

import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles({
    root: {
        backgroundColor: props=>props.color,
        color: 'white', 
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5,
        justifyContent: "center",
        display: 'flex', 
        alignSelf: 'center',
        width: '100%',
        '& svg': {
            paddingRight: 5
        }
    }
})

const Declaration = (props) => {
    const classes = useStyles(props)
    return <div className={classes.root}>
        <CheckCircleIcon />
        {props.declarationText}
    </div>
}

export default Declaration

