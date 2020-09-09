import React, { useState, useEffect } from "react";
import "./App.css";
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios'


//Components
import Seat from './components/Seat'
import Party from './components/Party'
import MajorityMeter from './components/MajorityMeter'

require('es6-promise/auto');


const styles = makeStyles({
	main: {
		// fontFamily: 'Roboto',
		display: 'flex',
		position: 'relative',
		flexDirection: 'column',
		padding: '10px 10px',
		backgroundColor: '#ededf0'
	},
	titleRow: {
		display: 'flex', 
		padding: '0px 5px 5px 5px',
		justifyContent: 'space-between'
	},
	title: {
		fontSize: props => props.small ? 18: 26,
		fontWeight: 'bold'
	},
	barchart: {
		fontSize: props=> props.small ? 8 : 14,
		display: 'flex',
		padding: '20px 0',
		flexDirection: 'column-reverse',
		flexWrap: 'wrap',
	},
	partyMap: {
		fontSize: props=>props.small ? 9 : 18,
		display: 'flex',
		flexWrap: 'wrap',
		alignContent: 'left',
	},
	update: {
		padding: '15px 5px',
		fontSize: props=>props.small ? 8 : 12
	}
})

const App = (props) => {

	const classes = styles(props);
	const [data, setData] = useState(null)
	const [title, setTitle] = useState('')
	const [timer, setTimer] = useState(300000)
	const [seatTotal, setSeatTotal] = useState(49)

	useEffect(()=>{
		console.log(`Updating every ${timer/1000} seconds`)
		axios.get('/title')
			.then(res=>{
				console.log(res)
				if (res.status === 200) {
					console.log(res)
					setTitle(res.data)
				}
			})
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
		console.log('fetching')
		axios.get(`/overallresults`)
			.then(function (res) {
				console.log(res.data)
				if (res.status === 200) {
					setData(res.data)
				} 
			})
			.catch(err=>{
				console.log("Error fetching results")
			})

	}

	const seats = [];

	const parties = [];

	var date = ''

	if (data) {
		data.partyResults.map((party, i)=>{
			if (party.seats > 0 ) {
				parties.push(<Party small={props.small} key={`${party}-${i}`} name={party.nameShort} seats={party.seats} votes={party.votesPercent} color={party.color} />)
			}
		})
		date = new Date(data.generated)

	}


	return (
		<div className={classes.main}>
			<div className={classes.titleRow}>
				<div className={classes.title}>{title}</div>
			</div>
			{(data && data.partyResults[0].seats > 0 ) && <div className={classes.barchart}>
				<MajorityMeter seatTotal={seatTotal} majority={25} majorityPercent={(25/seatTotal)*100} data={data}/>
			</div>}
			<div className={classes.partyMap}>
				{parties}
			</div>
			{/* <div className={classes.declaration}>Declaration</div> */}
			{data && <div className={classes.update}>Last updated: {date && date.toString()}</div>}
		</div>
	);
}

export default App;