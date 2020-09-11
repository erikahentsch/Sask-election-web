import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles'

import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles=makeStyles({
    root: {
        display: 'flex', 
        alignItems: 'center',
        // paddingBottom: 15,
        fontWeight: "bolder", 
        alignSelf: 'flex-start',
        fontSize: 14,
        padding: 5,
        '& svg': {
            color: 'green',
            fontSize: 20, 
            paddingRight: 5
        }

    }
})

const Declaration = (props) => {
    const classes = useStyles()
    

    return (
        <div className={props.declarationText && classes.root}>
            <CheckCircleIcon color="green" />
            {props.declarationText}
        </div>
    )
}

export default Declaration