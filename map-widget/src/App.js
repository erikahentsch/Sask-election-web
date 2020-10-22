import React, {useState, useEffect} from 'react';
import './App.css';
import {makeStyles} from '@material-ui/core'
import axios from 'axios'


// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import MapDiv from './components/MapTest'
import Sidebar from './components/Sidebar.js'
import LoadingAnimation from './components/LoadingAnimation'
import Declaration from './components/Declaration'

const styles = makeStyles({
  app: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    
  }, 
  left: {
    flex: 4,
    position: 'relative',
    display: 'flex',
    flexDirection: "column"
  }
})

function App() {

  const [data, setData] = useState(null)
  const [loading, toggleLoading] = useState(true)
  const [parties, setParties] = useState(null)
  const [selectedResults, setSelectedResults] = useState(null)
  const [timer, setTimer] = useState(30000)
  const [screensize, setScreenSize] = useState(window.innerWidth)
  const [declarationText, setDeclarationText] = useState('')
	const [declaration, setDeclaration] = useState(null)
  const [declaredColor, setDeclaredColor] = useState('')
  const [prov, setProv] = useState('')

  const classes = styles();


  function getQueryString(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(window.location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  useEffect(()=>{
    let province = 'nb'

    var url = getQueryString('prov')
    if (url) {
      province = url
    }
    setProv(province)

    if (province) {
      getData(province)
      startTimer(province)
    }
    console.log(`Updating every ${timer/1000} seconds`)
  },[])

  useEffect(()=> {
    getResultsFromURL()
  }, [loading])

  const startTimer = (province) => {
      setInterval(()=>{
          getData(province);
      }, timer);
    }

  useEffect(()=> {
    updateResults()
  }, [data])

  useEffect(()=>{
		try {
			if (data && declaration) {
				if (declaration.overallResult.partyName && declaration.overallResult.resultText) {
					let text = declaration.overallResult.partyName + ' ' + declaration.overallResult.resultText;
          setDeclarationText(text)
          let partyWinner = parties.find(party=>party.name === declaration.overallResult.partyName)
          setDeclaredColor(partyWinner.color)     
				} else 
        setDeclarationText('')
			}
		} catch (e) {
			
		}

    },[data, parties, declaration])

  const getData = (province) => {
    console.log('fetching data')
    axios.get(`/${province}/fullresults`)
      .then(res=>{
        if (res.status === 200) {
          setData(res.data);
          toggleLoading(false);
        }
      })
      .catch(err=>console.log("Error fetching FULLELECTIONDATA, check your env variables and try again", err))
    
    axios.get(`/${province}/overallresults`)
      .then(res=>{
        if (res.status === 200) {
          setParties(res.data.partyResults)
        }
      })
      .catch(err=>console.log("Error fetching OVERALLRESULTS, check your env variables and try again"))
    axios.get(`/${province}/declaration`)
      .then(function (res) {
        if (res.status === 200) {
          setDeclaration(res.data)
        } 
      })
      .catch(err=>{
        console.log("Error fetching results")
      })
  }

  const getResultsFromURL = () => {
    try {
      let hash = window.location.hash
      if (hash) {
        hash = decodeURI(hash.replace('#', ''))
        let name = hash
        if (data) {
          const result = data.data.find(riding=>{
            return riding.name.toLowerCase() === name.toLowerCase() 
          })
          if (result) {
            setSelectedResults(result)
          }
        }
      }
  
    } catch (err) {
      console.log('could not find riding by hash')
    }

  }

  const updateResults = () => {
    if (selectedResults) {
      let initResults = selectedResults.name;
      let newResults = data.data.find(riding=> riding.name === initResults)
      if (initResults === newResults.name) {
        setSelectedResults(newResults)
      }
    }
  }

  const handleSelectRiding = (results) => {
    setSelectedResults(results)
  }


  return (
    <div id={'map-widget-app'} className={classes.app}>
      <div className={classes.left}>
        {declarationText && <Declaration color={declaredColor} declarationText={declarationText}/>}
      {!loading  ? <MapDiv 
        data={data}
        parties={parties}
        province={prov}
        handleSelectRiding={handleSelectRiding}
        selectedRiding={selectedResults}
        />
        :
        <LoadingAnimation/>
      }
      </div>
        <Sidebar 
          data={data} 
          parties={parties}
          results={selectedResults} 
          handleSelectRiding={handleSelectRiding}
          small={screensize}
          prov={prov}
          />
        {/* {!loading && <Pictureloader data={data}/>} */}
    </div>
  );
}

export default App;
