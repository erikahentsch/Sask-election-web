import React, {useEffect, useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core'

import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const styles = makeStyles(props=>({
    resultsRoot: {
        padding: 10,
      
    },
    candidateRoot: {
        position: 'relative',
        display: 'flex', 
        flexDirection: 'row',
        height: 120,
        padding: '10px 0'
    },
    resultsInfo: {
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between',
        '& #pollsReported': {
            fontSize: 12,
            fontWeight: 'bolder'
        },
        '& #totalVotes': {
            fontSize: 10,
            color: 'darkslategrey'
        }
    },
    imageDiv: {
        height: props=>props.screensize < 700 ? 100 : 120,
        position: 'relative',
        marginBottom: 25,
        minWidth: 50,
        width: props=>props.screensize < 700 ? 50 : 70,
        borderRadius: '8px',
        overflow: 'hidden',
        '& #partyCode': {
            position: 'absolute', 
            bottom: 8,
            color: 'white',
            width: '100%',
            textAlign: 'center'
        },
        '& img': {
            width: '100%',
            transition: 'width 500ms'
        }
    },
    candidateLeftDiv: {
        flex: 3, 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '10px 0 10px 10px',

        '& #candidateIncumbent': {
            fontSize: 13,
            fontWeight: 'lighter'
        }
    },
    candidateName: {
        '& #candidateFirst': {
            fontWeight: 'bolder',
            fontSize: props=>props.screensize < 700 ? 12 : 14,

        },
        '& #candidateLast': {
            fontWeight: 'bolder',
            fontSize: props=>props.screensize < 700 ? 16 : 22,
        }
    }, 
    candidateRightDiv: {
        flex: 2, 
        justifySelf: 'flex-end',
        display: 'flex', 
        flexDirection: 'column',
        padding: '10px 0',
        justifyContent: 'space-between',
        '& #candidateElected': {
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'flex-end',
            fontSize: props=>props.screensize < 700 ? 12 : 14,
        }
    },
    votesDiv: {
        textAlign: 'right',
        '& #votesPercent': {
            fontSize: props=>props.screensize < 700 ? 16 : 22,
            fontWeight: 'bolder'
        },
        '& #votesTotal': {
            fontSize: props=>props.screensize < 700 ? 12 : 14,
            fontWeight: 'lighter'
        }
    }
}))

const Candidate = (props) => {
    const {candidate} = props
    const [prevCandidate, setCandidate] = useState('')
    const imgRef = useRef(null)

    useEffect(()=> {
        setCandidate(candidate.name)
        if (candidate && imgRef.current.name) {

            if (prevCandidate === imgRef.current.name) {
                imgRef.current.style.width = '100%'
            } else {
                imgRef.current.style.width = 0
                setTimeout(()=>{
                    imgRef.current.style.width = '100%'
                }, 1000)

            }
        }
    }, [candidate])
    
    const classes = styles(props);
    var candidateName = candidate.name.split(' ')
    var lastName = candidateName.pop();
    
    return (
        <div className={classes.candidateRoot}>
            <div style={{backgroundColor: props.color}} className={classes.imageDiv}>
                <img ref={imgRef} alt="Candidate Headshot" name={candidate.name} onLoad={e=>e.target.style.width = "100%"} onError={(e) => { e.target.onError = null; e.target.src =`/img/no_headshot.png`}} src={`/image/${props.prov}/${candidate.cachedHeadFilename}`}/>
                <div id="partyCode" style={{fontWeight: 'bolder',color: props.color === '#C0C0C0' ? 'black' : 'white' }}>{candidate.partyCode}</div>
            </div>
            <div className={classes.candidateLeftDiv}>
                <div className={classes.candidateName}>
                    <div id="candidateFirst">{candidate.firstName}</div>
                    <div id="candidateLast" >{candidate.lastName}</div>
                </div>
                <div id="candidateIncumbent">{candidate.isIncumbent && 'Incumbent'}</div>
            </div>
            <div className={classes.candidateRightDiv}>
                <div className={classes.votesDiv}>
                    <div id='votesPercent'>{candidate.percent}%</div>
                    <div id='votesTotal'>{candidate.votes.toLocaleString('en')} total votes</div>
                </div>
                {candidate.isElected ? <div id="candidateElected">
                    <CheckCircleIcon style={{paddingRight: 5, fontSize: 14, color: 'green'}} /> Elected
                </div>
                :
                <div style={{fontSize: 14}}/>
                }
            </div>
        </div>
    )
}


const Results = (props) => {
    
    const classes = styles();
    const {data} = props;

    useEffect(() => {
        console.log('results render')
    }, [props.data])

    const getPartyColor = (candidate) => {
        // console.log(candidate)
        let color = '#C0C0C0' 
        if (candidate.partyCode === "NDP") {
            return 'rgb(221, 102, 0)'
        }  else if (candidate.partyCode === 'PC') {
            return 'rgb(0, 51, 153)'
        }
        if (props.parties) {
            let findParty = props.parties.find(party=>party.nameShort === candidate.partyCode)
            if (findParty) {
                color = findParty.color
            }
        }
        return color

    }

    return (
        <div className={classes.resultsRoot}>
            {props.data && 
        <>
            <div className={classes.resultsInfo}>
                <div id="pollsReported">{data.pollsReported}/{data.pollsTotal} polls reported</div>
                <div id="totalVotes">{data.votes.toLocaleString('en')} total votes</div>
            </div>
                <div>
                    {props.data.results.map((candidate, i)=> {
                        let partyColor = getPartyColor(candidate);
                        return <Candidate prov={props.prov} screensize={props.screensize} key={i} color={partyColor} candidate={candidate}/>
                    })}
                </div>    
            </>
            }
        </div>
    );
}

export default Results