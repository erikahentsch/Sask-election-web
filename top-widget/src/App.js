import React, { useState, useEffect } from "react";
import "./App.css";
import {makeStyles} from '@material-ui/core/styles';

//Components
import Seat from './components/Seat'
import Party from './components/Party'
import MajorityMeter from './components/MajorityMeter'

const styles = makeStyles({
	main: {
		// fontFamily: 'Roboto',
		display: 'flex',
		position: 'relative',
		flexDirection: 'column',
		padding: '20px 10px',
		backgroundColor: '#f2f2f2'
	},
	titleRow: {
		display: 'flex', 
		padding: '0px 5px',
		justifyContent: 'space-between'
	},
	title: props=> ({
		fontSize: props.small ? 14: 18,
		fontWeight: 'bold'
	}),
	majorityMeter: props => ({
		display: 'flex',
		alignItems: 'flex-end',
		textAlign: 'right',
		fontSize: props.small ? 8 : 10,
	}),
	seatMap: {
		display: 'flex',
		height: 90,
		maxHeight: props=>props.small ? 50 : 100,
		padding: '10px 0',
		flexDirection: 'column-reverse',
		flexWrap: 'wrap',
	},
	partyMap: {
		display: 'flex',
		justifyContent: 'space-evenly'
	},
	update: props=>({
		padding: '15px 5px',
		fontSize: props.small ? 8 : 12
	})
})

const App = (props) => {

	const classes = styles(props);

	const [data, setData] = useState(null)

	// const small = window.screen.width < 500

	useEffect(()=>{
		startTimer();
		getData();
	},[])

	const startTimer = () => {
		let remaining = 30
		setInterval(()=>{
			remaining --;
			if (remaining <= 0) {
				console.log("updating")
				getData();
				remaining = 30
			}
		}, 1000);
	  }
	

	const getData = () => {

		fetch(`/overallresults`)
			.then(res=>{
				if (res.ok) {
					return res.json();
				} 
			})
			.then(json=>
				setData(json)
			)
			.catch(err=>console.log("Error fetching overall results"))
	}

	const seats = [];

	const parties = [];

	var date = ''

	if (data) {
		data.partyResults.map(party=>{
			for (let j=0; j < party.seats; j ++) {
				seats.push(<Seat key={`${party.nameShort}-${j}`} color={party.color} small={props.small} />)
			}
			parties.push(<Party key={party.id} name={party.nameShort} seats={party.elected} votes={party.votesPercent} color={party.color} small={props.small} />)
		})
		if (seats.length < 62) {
			console.log(seats.length)
			let seatsRemaining = 61-seats.length
			for (let k=0; k < seatsRemaining; k++) {
				seats.push(<Seat small={props.small} key={`none-${k}`} color={'#cccccc'}/>)
			}
		}
		date = new Date(data.generated)

	} else {
		for (let i = 0; i < 61; i++) {
			seats.push(<Seat key={`none-${i}`} small={props.small} color={'#cccccc'} />)
		}
	}


	return (
		<div className={classes.main}>
			<div className={classes.titleRow}>
				<div className={classes.title}>Saskatchewan Election 2020</div>
				{(data && data.partyResults[0].votes > 0) && <div className={classes.majorityMeter}>31 seats needed for majority <MajorityMeter small={props.small} data={data}/></div>}
			</div>
			<div className={classes.seatMap}>
				{seats}
			</div>
			<div className={classes.partyMap}>
				{parties}
			</div>
			{/* <div className={classes.declaration}>Declaration</div> */}
			{data && <div className={classes.update}>Last updated: {date && date.toString()}</div>}
		</div>
	);
}

export default App;