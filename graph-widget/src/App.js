import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import 'babel-polyfill'


import {makeStyles} from '@material-ui/core/styles'
import {VictoryPie, Slice} from 'victory'


import PartyCard from './components/partyCard'
import GainsDiv from './components/GainsDiv'
import Declaration from './components/Declaration'

require('es6-promise/auto');

const styles = makeStyles({
	main: {
		fontSize: (props) => props.small && 12,
		// fontFamily: 'Roboto',
		display: 'flex',
		position: 'relative',
		flexDirection: 'column',
		padding: '10px 20px',
		backgroundColor: '#ededf0',
		alignContent: 'center'
	}, 
	content: {
		display: 'flex', 
		flexDirection: props=>props.small ? 'column' : 'row',
		paddingBottom: '15px',

	},
	left: {
		flex: 3,
		maxHeight: 250,
		alignItems: 'center',
		
	},
	right: {
		flex: 4,
		maxHeight: 250

	},
	title: {
		fontWeight: 'bold',
		marginLeft: 5,
		fontSize: props=> props.small ? 16 : 18
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
		alignSelf: 'center',
	},
	chartDiv: {
		flex: (props) => props.small ? 3 : 2,
	},

})

function App(props) {

  const [data, setData] = useState(null)
  const [loading, toggleLoading] = useState(true)
  const [timer, setTimer] = useState(30000)
  const [declarationText, setDeclarationText] = useState('')
  const [declaration, setDeclaration] = useState(null)


  const classes = styles(props);

  useEffect(()=>{
	console.log(`Updating every ${timer/1000} seconds`)
	getData();
	startTimer();
  },[])

  useEffect(()=>{
	console.log('check declaration', data, declaration)
	try {
		if (data && declaration) {
			if (declaration.overallResult.partyName && declaration.overallResult.resultText) {
				let text = declaration.overallResult.partyName + ' ' + declaration.overallResult.resultText;
				console.log(text)

				setDeclarationText(text)
			} else 
			setDeclarationText('')
		}
	} catch (e) {
		
	}

  },[declaration])



  const startTimer = () => {
	setInterval(()=>{
		console.log("updating")
		getData();
	}, timer);
  }

  const getData = () => {
	console.log("fetching")
    axios.get('/overallresults')
      .then(res=>{
		  if (res.status === 200) {
			setData(res.data);
			toggleLoading(false)
		  }
		})
	  .catch(err=>{
		  console.log("Error fetching election results")
	  })
	axios.get(`/declaration`)
	.then(function (res) {
		console.log(res.data)
		if (res.status === 200) {
			setDeclaration(res.data)
		} 
	})
	.catch(err=>{
		console.log("Error fetching results")
	})
  }

  return (
    <div id="graphWidget-main" className={classes.main}>
	  { !loading && 
	  <>
		{declarationText && 
				<Declaration declarationText={declarationText} />
			}
		<div className={classes.content}>
			<div className={classes.left}>
				<div className={classes.title}>Popular vote</div>
				<div className={classes.chartHolder}>
					<div className={classes.partyBars}>
						{data && data.partyResults.map((party,i)=>{
              
							return <PartyCard key={i} party={party} result={`${party.votesPercent}%`} />
						})}
					</div>
					<div className={classes.chartDiv}>
						{data &&
							<VictoryPie
								id="widgetPie"
								// padding={{top:0,left:20, right: 20, bottom:0}}
								padding={50}
								padAngle={({ datum }) => datum.y}
								innerRadius={130}
								data={data.partyResults}
								x={"nameShort"}
								y={"votesPercent"}
								labels={({datum})=>''}
								style={{	
									data: {fill: (d)=>d.datum.color},
								}}
							/>
						}
					</div>
				</div>
			</div>
			<div className={classes.border}/>
			<div className={classes.right}>
				<div className={classes.title}>Gains/Losses</div>
				<div className={classes.chartHolder}>
					<div className={classes.partyBars}>
						{data && data.partyResults.map((party,i)=>{
							return <PartyCard key={i} party={party} result={`${party.seatChange}`} />
						})}
					</div>
					{/* <GainsChart data={data} /> */}
					<GainsDiv data={data}/>
				</div>
			</div>
        </div>
		<div>
			<div className={classes.update}>Last updated: { Date(data.generated) }</div>
		</div>
		</>
	  }
    </div>
  );
}

export default App;
