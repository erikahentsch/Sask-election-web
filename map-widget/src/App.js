import React, {useState, useEffect} from 'react';
import './App.css';

import Map from './components/Map.js'

function App() {

  const [data, setData] = useState(null)
  const [loading, toggleLoading] = useState(true)

  useEffect(()=>[
    getData()
  ],[])

  const getData = () => {
    fetch('/data/SASK_2016.json')
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
          <Map />
        </div>
      }
    </div>
  );
}

export default App;
