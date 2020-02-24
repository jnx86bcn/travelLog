import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

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
    <>
      <ReactMapGL
        {...viewport}
        mapStyle='mapbox://styles/jnx86bcn/ck70y2hm5044j1irt32r1mzn7'
        mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
        onViewportChange={setViewport}>
        {
          logsEntries.map((entry,index)=>{
            return(
              <Marker key = {entry._id} 
                mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN} 
                latitude={entry.latitude} 
                longitude={entry.longitude}>
                <div>
                  <img 
                    className='marker' 
                    style={{
                      height: `${7 * viewport.zoom}px`,
                      width: `${7 * viewport.zoom}px`,
                    }}
                    src='https://i.imgur.com/y0G5YTX.png' 
                    alt=''/>
                </div>
              </Marker>
            )
          })
        }
      <Popup
        latitude={37.78}
        longitude={-122.41}
        closeButton={true}
        closeOnClick={false}
        onClose={() => this.setState({showPopup: false})}
        anchor="top" >
        <div>You are here</div>
      </Popup>
      </ReactMapGL>

    </>
  );
};

export default App;