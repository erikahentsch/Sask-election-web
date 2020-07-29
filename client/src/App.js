import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import Map from './components/Map.js'

function App() {

  const [data, setData] = useState(null)
  const [loading, toggleLoading] = useState(true)

  useEffect(()=>[
    getData()
  ],[])

  const getData = () => {
    fetch('/flower')
      .then(res=>res.json())
      .then(json=>{
        setData(json);
        toggleLoading(false)
      })
  }

  return (
    <div className="App">
      {loading ? "Loading..." :
        <div>
          <h1>{data.name}</h1>
          <p>{data.colour}</p>
          <img src="./camera.png" />
          <Map />
        </div>
      }
    </div>
  );
}

export default App;
