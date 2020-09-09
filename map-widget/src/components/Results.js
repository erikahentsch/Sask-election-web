import React from 'react';
import {makeStyles} from '@material-ui/core'

import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const styles = makeStyles({
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
            fontSize: 14,
            fontWeight: 'bolder'
        },
        '& #totalVotes': {
            fontSize: 12,
            color: 'darkslategrey'
        }
    },
    imageDiv: {
        height: '100%',
        position: 'relative',
        marginBottom: 25,
        width: 70,
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
            height: 'auto'
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
            fontSize: 14
        },
        '& #candidateLast': {
            fontWeight: 'bolder',
            fontSize: 22
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
            fontSize: 14
        }
    },
    votesDiv: {
        textAlign: 'right',
        '& #votesPercent': {
            fontSize: 22,
            fontWeight: 'bolder'
        },
        '& #votesTotal': {
            fontSize: 14,
            fontWeight: 'lighter'
        }
    }
})

const Candidate = (props) => {
    const {candidate, color} = props
    const classes = styles();
    var candidateName = candidate.name.split(' ')
    var lastName = candidateName.pop();
    // console.log(candidateName.join(" "))
    return (
        <div className={classes.candidateRoot}>
            <div style={{backgroundColor: color}} className={classes.imageDiv}>
                <img  alt="Candidate Headshot" onError={(e) => { e.target.onError = null; e.target.src =`/img/images.jpg`}} src={`/image/${candidate.cachedHeadFilename}`}/>
                <div id="partyCode">{candidate.partyCode}</div>
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

    const getPartyColor = (candidate) => {
        let color = "#595b5b" 
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
                        return <Candidate key={i} color={partyColor} candidate={candidate}/>
                    })}
                </div>    
            </>
            }
        </div>
    );
}

export default Results