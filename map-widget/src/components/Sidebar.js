import React, {useState, useEffect} from 'react'

import {makeStyles, Slide} from '@material-ui/core';
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
        height: 50,
        paddingLeft: 10,
        fontWeight: 'bolder',
        // textAlign: 'center',
        // verticalAlign: 'middle'
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
    const [title, setTitle] = useState('Select a riding');
    const [arrow, toggleArrow] = useState(0)
    const classes=styles();
    const [menu, setMenu] = useState('location')
    const [results, setResults] = useState(null)

    useEffect(()=>{
        if (props.results) {
            console.log("setting results")
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
                        {title.toUpperCase()}
                    </div>
                    <div className={classes.content}>
                    {
                        props.data && props.data.data.map(result=> {
                            return (
                                <LocationButton resultId={result.id} resultData={result} >{result.name}{arrow === result.id && <ChevronRightIcon/>}</LocationButton>
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
                        <ChevronLeftIcon onClick={()=>setMenu('location')} style={{cursor: 'pointer'}}/>{results && results.name.toUpperCase()}
                    </div>
                    <div className={classes.content}>
                        {props.data && menu === 'results' && 
                            <Results 
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