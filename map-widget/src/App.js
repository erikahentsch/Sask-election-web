import React, {useState, useEffect} from 'react';
import './App.css';
import {makeStyles} from '@material-ui/core'
import axios from 'axios'


// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

// import Map from './components/Map.js'
import MapDiv from './components/MapTest'
import Sidebar from './components/Sidebar.js'
import LoadingAnimation from './components/LoadingAnimation'
import Pictureloader from './components/Pictureloader'


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
  const [timer, setTimer] = useState(30000)
  const [screensize, setScreenSize] = useState(window.innerWidth)

  const classes = styles();

  useEffect(()=>{
    console.log(`Updating every ${timer/1000} seconds`)
    getData()
    startTimer()
  },[])

  useEffect(()=> {
    getResultsFromURL()
  }, [loading])

  const startTimer = () => {
      setInterval(()=>{
          getData();
      }, timer);
    }

  useEffect(()=> {
    updateResults()
  }, data)

  const getData = () => {
    console.log("fetching")
    axios.get('/fullresults')
      .then(res=>{
        if (res.status === 200) {
          setData(res.data);
          toggleLoading(false);
        }
      })
      .catch(err=>console.log("Error fetching FULLELECTIONDATA, check your env variables and try again", err))
    
    axios.get('/overallresults')
      .then(res=>{
        if (res.status === 200) {
          setParties(res.data.partyResults)
        }
      })
      .catch(err=>console.log("Error fetching OVERALLRESULTS, check your env variables and try again"))
    
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
    console.log('updating selected')
    if (selectedResults) {
      let initResults = selectedResults.name;
      let newResults = data.data.find(riding=> riding.name === initResults)
      console.log(newResults)
    }
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
          handleSelectRiding={handleSelectRiding}
          small={screensize}
          />
        {/* {!loading && <Pictureloader data={data}/>} */}
    </div>
  );
}

export default App;
