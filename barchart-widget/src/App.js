import React, { useState, useEffect } from "react";
import "./App.css";
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios'
import 'babel-polyfill'

//Components
import Seat from './components/Seat'
import Party from './components/Party'
import MajorityMeter from './components/MajorityMeter';
import Declaration from './components/Declaration';

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
		fontSize: 24,
		// paddingBottom: 10, 
		fontWeight: 'bold'
	},
	barchart: {
		fontSize: 14,
		display: 'flex',
		padding: '20px 0',
		flexDirection: 'column-reverse',
		flexWrap: 'wrap',
	},
	partyMap: {
		fontSize: 16,
		display: 'flex',
		flexWrap: 'wrap',
		alignContent: 'left',
	},
	update: {
		padding: '15px 5px',
		fontSize: 10
	}
})

const App = (props) => {

	const classes = styles(props);
	const [data, setData] = useState(null)
	const [declaration, setDeclaration] = useState(null)
	const [title, setTitle] = useState('')
	const [timer, setTimer] = useState(30000)
	const [seatTotal, setSeatTotal] = useState(49)
    const [declarationText, setDeclarationText] = useState('')


	useEffect(()=>{
		console.log(`Updating every ${timer/1000} seconds`)
		axios.get('/title')
			.then(res=>{
				if (res.status === 200) {
					setTitle(res.data)
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

    },[declaration])
	
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
			{declarationText && 
				<Declaration declarationText={declarationText} />
			}	
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