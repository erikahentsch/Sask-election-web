import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import {makeStyles} from '@material-ui/core/styles'
import {VictoryPie, Slice} from 'victory'


import PartyCard from './components/partyCard'
import GainsDiv from './components/GainsDiv'
import GainsBar from './components/GainsBar'

const styles = makeStyles({
	main: {
		// fontFamily: 'Roboto',
		display: 'flex',
		position: 'relative',
		flexDirection: 'row',
		padding: '10px 20px',
		backgroundColor: '#f2f2f2',
		alignContent: 'center'
	}, 
	left: {
		flex: 3,
		height: 250,
		alignItems: 'center',
		
	},
	right: {
		flex: 4,
		height: 250

	},
	title: {
		fontWeight: 'bold',
		marginLeft: 5
	}, 
	border: {
		borderRight: '1px solid grey',
		marginRight: 10
	},
	chartHolder: {
		display: 'flex',
		flexDirection: 'row',
		height: '100%',
		alignItems: 'center'
	},
	partyBars: {
		flex: 3,
		alignSelf: 'center'
	},
	chartDiv: {
		flex: 2
	},

})

function App() {

  const [data, setData] = useState(null)
  const [loading, toggleLoading] = useState(true)

  const classes = styles();

  useEffect(()=>[
    getData()
  ],[])

  const getData = () => {
    fetch('/overallresults')
      .then(res=>{
        console.log(res)
        return res.json()})
      .then(json=>{
        console.log(json)
        setData(json);
        toggleLoading(false)
      })
  }

  return (
    <div className={classes.main}>
      { !loading && 
        <>
        <div className={classes.left}>
				<div className={classes.title}>Popular vote</div>
				<div className={classes.chartHolder}>
					<div className={classes.partyBars}>
						{data && data.partyResults.map((party,i)=>{
              console.log(party)
							return <PartyCard key={i} party={party} result={`${party.votesPercent}%`} />
						})}
					</div>
					<div className={classes.chartDiv}>
						{data &&
							<VictoryPie
								padding={{top:0,left:20, right: 20, bottom:0}}
								padAngle={({ datum }) => datum.y}
								innerRadius={130}
								data={data.partyResults}
								x={"nameShort"}
								y={"votesPercent"}
								labels={({datum})=>''}
								style={{	
									data: {fill: (d)=>d.datum.color}
								}}
							/>
						}
					</div>
				</div>
			</div>
			<div className={classes.border}/>
			<div className={classes.right}>
				<div className={classes.title}>Gains/Loses</div>
				<div className={classes.chartHolder}>
					<div className={classes.partyBars}>
						{data && data.partyResults.map((party,i)=>{
							return <PartyCard key={i} party={party} result={`${party.seatChange}`} />
						})}
					</div>
					<GainsDiv data={data}/>
				</div>
			</div>
        </>
      }
    </div>
  );
}

export default App;
