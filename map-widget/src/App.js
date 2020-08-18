import React, {useState, useEffect} from 'react';
import './App.css';

import {makeStyles} from '@material-ui/core'

// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// import Map from './components/Map.js'
import MapDiv from './components/MapTest'
import Sidebar from './components/Sidebar.js'
import LoadingAnimation from './components/LoadingAnimation'



const styles = makeStyles({
  app: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  }
})

function App() {

  const [data, setData] = useState(null)
  const [loading, toggleLoading] = useState(true)
  const [parties, setParties] = useState(null)
  const [selectedResults, setSelectedResults] = useState(null)

  const classes = styles();

  useEffect(()=>
    getData()
  ,[])

  const getData = () => {
    fetch('/results_2016')
      .then(res=>res.json())
      .then(json=>{
        setData(json);
        toggleLoading(false)
      })
      .catch(err=>console.log("Error fetching FULLELECTIONDATA, check your env variables and try again"))
    
    fetch('/partylist')
      .then(res=>res.json())
      .then(json=>{
        setParties(json)
      })
      .catch(err=>console.log("Error fetching PARTYLIST, check your env variables and try again"))

  }

  const handleSelectRiding = (results) => {
    setSelectedResults(results)
  }

  return (
    <div id={'map-widget-app'} className={classes.app}>
      {!loading  ? <MapDiv 
        data={data}
        parties={parties}
        handleSelectRiding={handleSelectRiding}
        selectedRiding={selectedResults}
        />
        :
        <LoadingAnimation/>
      }
        <Sidebar 
          data={data} 
          parties={parties}
          results={selectedResults} 
          handleSelectRiding={handleSelectRiding}/>
        
    </div>
  );
}

export default App;
