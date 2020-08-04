import React from 'react';
import {makeStyles} from '@material-ui/core'

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
        backgroundColor: 'red',
        height: '100%',
        borderRadius: '8px',
        textAlign: 'center',
        position: 'relative',
        '& img': {
            borderRadius: '8px'
        },
        '& div': {
            position: 'absolute', 
            bottom: 4,
            width: '100%'
        }
    }
})

const Candidate = (props) => {
    const {candidate, color} = props
    const classes = styles();
    return (
        <div className={classes.candidateRoot}>
            <div className={classes.imageDiv}>
                <img height={95} src="/images.jpg"/>
                <div>{candidate.partyCode}</div>
            </div>
            <div>
            {candidate.name}

            </div>
        </div>
    )
}


const Results = (props) => {
    
    const classes = styles();
    const {data} = props;

    return (
        <div className={classes.resultsRoot}>
            {props.data && 
        <>
            <div className={classes.resultsInfo}>
                <div id="pollsReported">{data.pollsReported}/{data.pollsTotal} polls reported</div>
                <div id="totalVotes">{data.votes.toLocaleString('en')} total votes</div>
            </div>
                <div>
                    {props.data.results.map(candidate=> {
                        return <Candidate candidate={candidate}/>
                    })}
                </div>    
            </>
            }
        </div>
    );
}

export default Results