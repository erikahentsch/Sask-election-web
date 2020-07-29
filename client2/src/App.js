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
    fetch('../flower')
      .then(res=>{
        console.log(res)
        return res.json()})
      .then(json=>{
        console.log(json)
        setData(json);
        toggleLoading(false)
      })
  }

  return (
    <div className="App">
        <div>
          <div>this is a test</div>
        </div>
      }
    </div>
  );
}

export default App;
