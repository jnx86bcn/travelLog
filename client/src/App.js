import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import { listLogEntries } from './API.js';

const App = () => {
  const [logsEntries,setLogsEntries] = useState([])
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 0,
    longitude: 0,
    offsetLeft: -24,
    offsetTop: 12,
    zoom: 2
  });

  useEffect(()=>{
    (async ()=>{
      const logsEntries = await listLogEntries();
      setLogsEntries(logsEntries);
    })();
  },[]);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle='mapbox://styles/jnx86bcn/ck6zkmp0e4dcs1is7fz5orosd'
      mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
      onViewportChange={setViewport}
    >
      {
        logsEntries.map((entry,index)=>{
          return(
            <Marker key = {index} mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN} latitude={entry.latitude} longitude={entry.longitude} offsetLeft={-20} offsetTop={-10}>
              <svg 
              viewBox="0 0 24 24"
              style={{
                width:"24px",
                height:"24px"
              }}
              stroke="#2f3542"
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="marker">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
              </svg>
            </Marker>
          )
        })
      }

    </ReactMapGL>
  );
};

export default App;