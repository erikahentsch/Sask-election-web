import React, { useState, useEffect, useRef } from 'react'
import ReactDOMServer from 'react-dom/server'
import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import Control from 'react-leaflet-control'
import L from 'leaflet'

import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

import {makeStyles} from '@material-ui/core'

import Tooltip from './Tooltip'
import axios from 'axios'
import 'babel-polyfill'

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

const defaultStyle={
    weight: 0.9,
    color: 'black',
    fillOpacity: 0.9
}

const selectedStyle={
    weight: 3,
    fillOpacity: 1
}


 const MapTest = (props) => {
    // const [position, setPosition] = useState({lat: 54, lng: -105, zoom: 5});
    const [initBounds, setInitBounds] = useState();
    const [currentBounds, setCurrentBounds] = useState();
    const [geo, setgeo] = useState(null);
    // const [selectedRiding, setSelectedRiding] = useState(null)
    const mapRef = useRef(null);
    const geoRef = useRef(null)

    const classes = styles();

    useEffect(()=> {
        console.log('render map')
        if(!mapRef) {return}
        else {
            axios.get('/geojson')
                .then(res=>{
                    if (res.status === 200) {
                        setgeo(res.data)
                        var bounds = L.geoJSON(res.data).getBounds()
                        setInitBounds(bounds)
                        console.log(mapRef)
                        var map = mapRef.current.leafletElement
                        map.fitBounds(bounds)
                    }
                })
                .catch(err=>{
                    console.log(err);
                    console.log('error getting geojson data')
                })
        }   
    }, [props.data])

    useEffect(()=> {
        console.log(geoRef)
        if (props.selectedRiding) {
            zoomToED(props.selectedRiding.name)
            if (geoRef.current) {
                const geo = geoRef.current.leafletElement;

                geo.eachLayer(layer=>{
                    if (layer.feature.properties.Name.toUpperCase() === props.selectedRiding.name.toUpperCase()) {
                        layer.setStyle({
                            weight: 3,
                            fillOpacity: 1
                        })
                    }
                })
            }
            
        } else {
            resetBounds()
        }
    }, [geoRef.current, props.selectedRiding])

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
        try {
            if(props.parties && results.results.length > 0) {
                let fill = props.parties.find(party=>{
                    if (results.results[0].votes > 0) {   
                        return party.nameShort === results.results[0].partyCode
                    }
                })
                if (fill) {
                    return fill.color
                } else {
                    return 'lightgrey'
                }
            } else {
                return 'lightgrey'
            }
        } catch(err) {
            console.log("Error getting Geo Fill for ", results.name)
            return 'lightgrey'
        } 
    }


    const handleFill = (feature) => {
        if (feature) {
            let partyResults = getPartyResults(feature.properties.Name);
            let fill = 'lightgrey'
            if (partyResults) {
                fill = getFillByResults(partyResults)
            }
            return {
                fillColor: fill,
                weight: 0.9,
                color: 'black',
                fillOpacity: 0.9
            }
        }
    }

    const handleClick = (e) => {
        // var mapbounds = e.target.getBounds();
        var layerBounds = e.layer.getBounds();

        if (currentBounds === layerBounds) {
            e.layer.closeTooltip()
        } else {
            const map = mapRef.current.leafletElement;
            setCurrentBounds(layerBounds)
            map.fitBounds(layerBounds)
            const clickedRiding = e.layer.feature.properties.Name
            const partyResults = getPartyResults(clickedRiding)
            props.handleSelectRiding(partyResults)
            // setSelectedRiding(e.layer.feature.properties.Name)
            e.layer.setStyle(selectedStyle)
        }
    }

    const zoomToED = (ridingName) => {
        try {
            if (geoRef.current) {
                const map = mapRef.current.leafletElement;
                const geo = geoRef.current.leafletElement;
                var findLayer = null;
                geo.eachLayer(layer=>{
                    if (layer.feature.properties.Name.toUpperCase() === ridingName.toUpperCase()) {
                        findLayer = layer
                    }
                })
                map.fitBounds(findLayer.getBounds())
            }    
        } catch (err) {
            console.log('error zooming on riding')
        }
    }

    const resetBounds = () => {
        try {
            const map = mapRef.current.leafletElement
            map.fitBounds(initBounds)    
        } catch (err) {

        }
    }

    function highlightFeature(e) {
        e.layer.setStyle(selectedStyle)
    }

    function resetFeature(e) {
        if (props.selectedRiding) {
            let layerName = e.layer.feature.properties.PED_Name_E
            if (layerName.toUpperCase() !== props.selectedRiding.name.toUpperCase()) {
                e.layer.setStyle(defaultStyle)
            } 
        } else {
            e.layer.setStyle(defaultStyle)
        }
    }

    const getTooltipData = (feature, layer) => {
        if (feature.properties ) {
            try {
                const featureData = getPartyResults(feature.properties.Name)
                const featureColor = getFillByResults(featureData)
                if (featureData && featureColor) {
                    layer.bindTooltip(ReactDOMServer.renderToString(<Tooltip results={featureData} color={featureColor} />), {sticky: false, direction: 'top'})
                }
            } catch(e) {

            }
        }
    }

    return (
        <div className={classes.mapContainer}>
            <Map 
                ref={mapRef} 
                zoomSnap={0.25}
                zoomDelta={0.5}
                // maxBounds={[[29.305561325527698, -130.53515625000003], [74.16408546675687, -90.54296875000001]]}
                minZoom={3}    
            >
                <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
                />

                {/* {geo && 
                <GeoJSON 
                    ref={geoRef} 
                    style={handleFill} 
                    data={geo} 
                    onClick={handleClick} 
                    onEachFeature={getTooltipData}
                    onMouseOver={highlightFeature}
                    onMouseOut={resetFeature}
                />  
                }    */}
                <Control position="topleft">
                    <a id="zoomOut" style={{color: 'black !important'}} className={`leaflet-control-zoom leaflet-bar ${classes.resetButton}`} onClick={resetBounds}>
                        <ZoomOutMapIcon />

                    </a>
                </Control>
            </Map>
      </div>
    )
}

export default MapTest;