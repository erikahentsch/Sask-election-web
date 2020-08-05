import React, {useState, useEffect} from 'react';
import './App.css';

import {makeStyles} from '@material-ui/core'

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import Map from './components/Map.js'
import MapDiv from './components/MapTest'
import Sidebar from './components/Sidebar.js'



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
    fetch('/data/SASK_2016.json')
      .then(res=>res.json())
      .then(json=>{
        setData(json);
        toggleLoading(false)
      })
    fetch('/data/partylist.json')
      .then(res=>res.json())
      .then(json=>{
        setParties(json)
      })
  }

  const handleSelectRiding = (results) => {
    console.log(results)
    setSelectedResults(results)
  }

  return (
    <div id={'map-widget-app'} className={classes.app}>
      <MapDiv 
        data={data}
        parties={parties}
        handleSelectRiding={handleSelectRiding}
        selectedRiding={selectedResults}
        />
        {/* <TransformWrapper
          options={{
            limitToBounds: false,
            maxScale: 1000,
          }}
        >
          <Map />
        </TransformWrapper> */}
        <Sidebar 
          data={data} 
          parties={parties}
          results={selectedResults} 
          handleSelectRiding={handleSelectRiding}/>
    </div>
  );
}

export default App;
