import React, {useState} from 'react';

import {makeStyles} from '@material-ui/core'

import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
  } from "react-simple-maps";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const styles = makeStyles({
    map: {
        display: 'flex',
        height: '100%',
        flex: 3,
    }
});

const Map = (props) => {

    const [zoomCenter, setZoomCenter] = useState({zoom: 1500, center: [-105, 54.5]})
    const classes = styles()


    const getFill =(geo) => {
        if (!geo.ConCode) {
            if (geo.name === 'United States of America') {
                return 'lightgrey'
            }
            return 'darkgrey'
        }
        else return 'slategrey'
    }

    return (
        <div className={classes.map} >
            <TransformComponent>
            <ComposableMap style={{width: '100%', overflow: 'visible', height: '100%'}} projection="geoMercator" projectionConfig={{center: zoomCenter.center, scale: zoomCenter.zoom}}>
                    <Geographies geography={'/SASK_Union_proj_lakes.json'}>
                        {({geographies})=>
                            geographies.map((geo, i)=>{
                                const fill = getFill(geo.properties)
                                return <Geography 
                                    key={i}
                                    geography={geo}
                                    fill={fill}
                                    style={{
                                        default: {
                                            outline: 'none'
                                        },
                                        pressed: {
                                            outline: 'none'
                                        },
                                        hover: {
                                            outline: 'none',
                                            opacity: '0.9'
                                        }
                                    }}
                                />
                            })
                        }
                    </Geographies>
            </ComposableMap>
            </TransformComponent>
        </div>
    );
}

export default Map;