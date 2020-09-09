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
		backgroundColor: '#ededf0'
	},
	titleRow: {
		display: 'flex', 
		padding: '0px 5px',
		justifyContent: 'space-between'
	},
	title: props=> ({
		fontSize: props.small ? 12: 18,
		fontWeight: 'bold',
		paddingRight: 20
	}),
	majorityMeter: props => ({
		display: 'flex',
		alignItems: 'center',
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
	const [title, setTitle] = useState('')
	const [timer, setTimer] = useState(300000)
	const [seatTotal, setSeatTotal] = useState(49)
	const [majority, setMajority] = useState(25)

 	// const small = windo w.screen.width < 500

	useEffect(()=>{
		console.log(`Updating every ${timer/1000} seconds`)
		fetch('/title')
			.then(res=>res.text())
			.then(json=>setTitle(json))
			.catch(err=>console.log("error setting title"))
		startTimer();
		getData();
	},[])

	const startTimer = () => {
		setInterval(()=>{
			getData();
		}, timer);
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
			if (party.seats> 0) {
				parties.push(<Party key={party.id} name={party.nameShort} seats={party.seats} votes={party.votesPercent} color={party.color} small={props.small} />)
			}
		})
		if (seats.length < seatTotal+1) {
			console.log(seats.length)
			let seatsRemaining = seatTotal-seats.length
			for (let k=0; k < seatsRemaining; k++) {
				seats.push(<Seat small={props.small} key={`none-${k}`} color={'#cccccc'}/>)
			}
		}
		date = new Date(data.generated)

	} else {
		for (let i = 0; i < seatTotal; i++) {
			seats.push(<Seat key={`none-${i}`} small={props.small} color={'#cccccc'} />)
		}
	}


	return (
		<div className={classes.main}>
			<div className={classes.titleRow}>
				<div className={classes.title}>{title}</div>
				{(data && data.partyResults[0].votes > 0) && <div className={classes.majorityMeter}>{majority} seats needed for majority <MajorityMeter seatTotal={seatTotal} majority={majority} majorityPercent={(majority/seatTotal)*100} small={props.small} data={data}/></div>}
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