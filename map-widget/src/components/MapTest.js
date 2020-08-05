import React, { useState, useEffect, useRef } from 'react'
import { Map, MapControl, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet'
import Control from 'react-leaflet-control'
import L from 'leaflet'

import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

import {makeStyles} from '@material-ui/core'

const styles= makeStyles({
    mapContainer: {
        flex: 4,
        position: 'relative'
    },
    resetButton: {
        display: 'flex',
        boxShadow: '0 1px 4px rgba(0,0,0,0.65)',
        height: 26,
        width: 26,
        fontSize: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
        background: '#FFFFFF',
        cursor: 'pointer',
        color: 'black'
        
    }
})


 const MapTest = (props) => {
    const [position, setPosition] = useState({lat: 54, lng: -105, zoom: 5});
    const [initBounds, setInitBounds] = useState();
    const [geo, setgeo] = useState(null);
    const mapRef = useRef(null);
    const geoRef = useRef(null)

    const classes = styles();

    useEffect(()=> {
        if(!mapRef) {return}
        
        else {
            console.log('here')
            fetch('/SASK_Constituency_boundary.json')
                .then(res=>res.json())
                .then(json=>{
                    setgeo(json)
                    var bounds = L.geoJSON(json).getBounds()
                    setInitBounds(bounds)
                    mapRef.current.leafletElement.fitBounds(bounds)
                    console.log(L.geoJSON(json))
                })
        }   
    }, [])

    useEffect(()=>{
        handleFill();
    }, [props.data])

    useEffect(()=> {
        console.log('zoom to riding', props.selectedRiding)
        if (props.selectedRiding) {
            zoomToED(props.selectedRiding.name)
        }
    }, [props.selectedRiding])

    const getPartyResults = (EDName) => {
        try {
            if (props.data) {
                let partyResults = props.data.data.find(ed=>
                    ed.name.toUpperCase() === EDName.toUpperCase()
                )
                return partyResults
            }
        } catch (e) {
            console.log("Couldn't get party results")
        }
    }
    
    const getFillByResults = (results) =>{
        if(props.parties) {
            let fill = props.parties.data.find(party=>{
                if (results.results[0].votes > 0) {   
                    return party.nameShort === results.results[0].partyCode
                }
            })
            if (fill) {
                return fill.colour
            } else {
                return 'lightgrey'
            }
        }
    }


    const handleFill = (feature) => {
        if (feature) {

            let partyResults = getPartyResults(feature.properties.Constituen);

            let fill = 'lightgrey'
            if (partyResults) {
                fill = getFillByResults(partyResults)
            }

            return {
                fillColor: fill,
                weight: 0.9,
                color: 'black',
                fillOpacity: 0.8
            }
        }
    }

    const handleClick = (e) => {
        var bounds = e.target.getBounds();
        var layerBounds = e.layer.getBounds();
        const map = mapRef.current.leafletElement;
        map.fitBounds(layerBounds)
        const clickedRiding = e.layer.feature.properties.Constituen
        const partyResults = getPartyResults(clickedRiding)
        props.handleSelectRiding(partyResults)
    }

    const zoomToED = (ridingName) => {
        const map = mapRef.current.leafletElement;
        const geo = geoRef.current.leafletElement;
        var findLayer = null;
        geo.eachLayer(layer=>{
            if (layer.feature.properties.Constituen === ridingName.toUpperCase()) {
                findLayer = layer
            }
        })
        map.fitBounds(findLayer.getBounds())
    }

    const resetBounds = () => {
        const map = mapRef.current.leafletElement
        map.fitBounds(initBounds)
    }

    return (
        <div className={classes.mapContainer}>
            <Map 
                ref={mapRef} 
                maxBounds={[[29.305561325527698, -130.53515625000003], [74.16408546675687, -90.54296875000001]]}
                minZoom={3}    
            >
                <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
                />

                {geo && <GeoJSON ref={geoRef} style={handleFill} data={geo} onClick={handleClick} />  }   
                <Control position="topleft">
                    <a id="zoomOut" style={{color: 'black !important'}} className={`leaflet-control-zoom ${classes.resetButton}`} onClick={resetBounds}>
                        <ZoomOutMapIcon />

                    </a>
                </Control>
            </Map>
      </div>
    )
}

export default MapTest;