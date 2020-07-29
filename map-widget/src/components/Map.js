import React, {useState} from 'react';

import {makeStyles} from '@material-ui/core'

import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
  } from "react-simple-maps";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";



const Map = (props) => {

    const [zoomCenter, setZoomCenter] = useState({zoom: 12, center: [-105, 54]})


    return (
        <div>
            <ComposableMap projection="geoMercator" projectionConfig={{scale: 108}}>
                <ZoomableGroup disableZooming center={zoomCenter.center} zoom={zoomCenter.zoom}>
                    <Geographies geography={'/SASK_Union_proj_lakes.json'}>
                        {({geographies})=>
                            geographies.map(geo=>{
                                return <Geography 
                                    geography={geo}
                                />
                            })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    );
}

export default Map;