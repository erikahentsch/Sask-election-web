import React, {useState, useEffect} from 'react'

import {makeStyles} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import {CSSTransition} from 'react-transition-group'

import Results from './Results'

const styles = makeStyles({
    sidebar: {
        flex: 2, 
        position: 'relative',
        display: 'flex',
        overflow: 'hidden'
    },
    title: {
        width: '100%',
        top: 0,
        backgroundColor: 'darkgrey',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        minHeight: 50,
        paddingLeft: 10,
        fontWeight: 'bolder',
    },
    content: {
        marginBottom: 10,
        height: 'calc(100% - 50px)',
        overflowX: 'hidden',
        overflowY: 'scroll'

    },
    LocationButton: {
        display: 'flex',
        alignItems: 'center',
        minHeight: 50,
        paddingLeft: 10,
        justifyContent: 'space-between',
        '&:hover': {
            backgroundColor: 'lightgrey',
            cursor: 'pointer'
        }
    }
})

const Sidebar = (props) =>  {
    const [arrow, toggleArrow] = useState(0)
    const classes=styles();
    const [menu, setMenu] = useState('location')
    const [results, setResults] = useState(null)

    useEffect(()=>{
        if (props.results) {
            setResults(props.results)
            setMenu('results')

        }
    },[props.results])


    const handleSelectRiding = (results) => {
        props.handleSelectRiding(results);
        setResults(results); 
        setMenu('results')
    }   

    const LocationButton = (props) => {
        return (
            <div
                className={`${classes.LocationButton} menu-item`}
                onMouseEnter={()=>toggleArrow(props.resultId)}
                onMouseLeave={()=>toggleArrow(0)}
                onClick={()=>handleSelectRiding(props.resultData)}
            >
                {props.children}
            </div>
        )
    }

    const handleBack = () => {
        setMenu('location')
        props.handleSelectRiding(null)
    }


    return (
        <div id="widgetSidebar" className={classes.sidebar}>
            <div style={{position: 'absolute', top: 0, height: '50px', width: '100%', backgroundColor: 'darkgrey'}}/>
            <CSSTransition 
                in={menu==="location"} 
                timeout={500}
                unmountOnExit
                classNames="menu-primary"
            >
                <div className="menu">
                    <div className={classes.title}>
                        SELECT A RIDING
                    </div>
                    <div className={classes.content}>
                    {
                        props.data && props.data.data.sort((a,b)=>{
                            if (a.name > b.name) {
                                return 1
                            } else return -1
                        })
                        .map((result)=> {
                            return (
                                <LocationButton key={result.id} resultId={result.id} resultData={result} >{result.name}{arrow === result.id && <ChevronRightIcon/>}</LocationButton>
                            )
                        })
                    }
                </div>
                </div>
            </CSSTransition>
            <CSSTransition 
                in={menu==="results"} 
                unmountOnExit
                timeout={500}
                classNames="menu-secondary"
            >
                <div className="menu">
                    <div className={classes.title}>
                        <ChevronLeftIcon onClick={handleBack} style={{cursor: 'pointer'}}/>{results && results.name.toUpperCase()}
                    </div>
                    <div className={classes.content}>
                        {props.data && menu === 'results' && 
                            <Results 
                                screensize={props.small}
                                data={results}
                                parties={props.parties}
                            />
                        }
                    </div>
                </div>
            </CSSTransition>
        </div>
    )
}

export default Sidebar