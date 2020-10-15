import React, { useState, useEffect } from "react";
import "./App.css";
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios'

//Components
import Seat from './components/Seat'
import Party from './components/Party'
import MajorityMeter from './components/MajorityMeter'
import Declaration from './components/Declaration'

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
		padding: '0px 5px',
		justifyContent: 'space-between'
	},
	title: props=> ({
		fontSize: props.small ? 18  : 24,
		fontWeight: 'bold',
		paddingRight: 20
	}),
	majorityMeter: props => ({
		display: 'flex',
		alignItems: 'center',
		textAlign: 'right',
		fontSize: 12,
	}),
	seatMap: {
		display: 'flex',
		height: 90,
		maxHeight: props=>props.small ? 50 : 100,
		flexDirection: 'column-reverse',
		flexWrap: 'wrap',
	},
	partyMap: {
		display: 'flex',
		justifyContent: 'flex-start'
	},
	update: props=>({
		fontSize: 11
	})
})

const App = (props) => {

	const classes = styles(props);

	const [data, setData] = useState(null)
	const [title, setTitle] = useState('')
	const [timer, setTimer] = useState(30000)
	const [seatTotal, setSeatTotal] = useState(49)
	const [majority, setMajority] = useState(25)
	const [declarationText, setDeclarationText] = useState('')
	const [declaration, setDeclaration] = useState(null)
	

 	// const small = windo w.screen.width < 500

	function getQueryString(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(window.location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	useEffect(()=>{
		console.log(`Updating every ${timer/1000} seconds`)
		let province = 'nb'
		var url = getQueryString('prov')
		console.log('url', url)
		if (url) {
			province = url
		}

		axios.get(`/${province}/config`)
			.then(res=>{
				if (res.status === 200) {
					setTitle(res.data.title)
					setMajority(res.data.majority)
					setSeatTotal(res.data.seats)
				}
			})
			.catch(err=>console.log("error setting title"))
		startTimer();
		getData();
		
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

    },[data,declaration])

	const startTimer = () => {
		setInterval(()=>{
			getData();
		}, timer);
	  }
	

	const getData = () => {
		let province = 'nb'
		try {
			province = window.location.search.split('/').find(el=>el.includes('?prov=')).split('=')[1];
		} catch (e) {
			console.log('default province')
		}
		axios.get(`/${province}/overallresults`)
			.then(res=>{
				if (res.status === 200) {
					setData(res.data)
				} 
			})
			.catch(err=>console.log("Error fetching overall results"))
		axios.get(`/${province}/declaration`)
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

	const seats = [];

	const parties = [];

	var date = ''

	if (data) {
		data.partyResults.map(party=>{
			for (let j=0; j < party.seats; j ++) {
				seats.push(<Seat key={`${party.nameShort}-${j}`} color={party.color} small={props.small} />)
			}
			// if (party.seats> 0) {
				parties.push(<Party key={party.id} name={party.nameShort} seats={party.seats} votes={party.votesPercent} color={party.color} small={props.small} />)
			// }
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
				{(data) && <div className={classes.majorityMeter}>{majority} seats needed for majority 
					<MajorityMeter seatTotal={seatTotal} majority={25} majorityPercent={(25/seatTotal)*100} data={data}/>
				</div>}
			</div>
			{declarationText && 
				<Declaration declarationText={declarationText} />
			}
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