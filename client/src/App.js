import React, { useState, useEffect, Fragment } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API.js';

const App = () => {
  const [logsEntries,setLogsEntries] = useState([])
  const [showPopup,setShowPopup] = useState({})
  const [addNewEntry,setAddNewEntry] = useState(null)
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 0,
    longitude: 0,
    offsetLeft: 0,
    offsetTop: 0,
    zoom: 2
  });

  useEffect(()=>{
    (async ()=>{
      const logsEntries = await listLogEntries();
      setLogsEntries(logsEntries);
    })();
  },[]);

  function addNewMarker(viewport) {
    const [longitude,latitude] = viewport.lngLat
    setAddNewEntry({
      longitude,
      latitude
    });
  };

  return (
      <ReactMapGL
        {...viewport}
        mapStyle='mapbox://styles/jnx86bcn/ck70y2hm5044j1irt32r1mzn7'
        mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
        onViewportChange={setViewport}
        onDblClick={(viewport) => {addNewMarker(viewport);}}
      >
        {
          logsEntries.map((entry)=>{
          return(
            <Fragment key={entry._id}>
                <Marker 
                  mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN} 
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                >
                  <div onClick={()=>setShowPopup({
                      ...showPopup,
                      [entry._id]: true,
                    })}
                  >
                    {/* <img 
                      className='marker' 
                      style={{
                        height: `${7 * viewport.zoom}px`,
                        width: `${7 * viewport.zoom}px`,
                      }}
                      src='https://i.imgur.com/y0G5YTX.png' 
                      alt=''/> */}
                  {/* </div> */}
                  {/* <div> */}
                    <svg 
                        x="100px" y="100px"
                        style={{
                          height: `${7 * viewport.zoom}px`,
                          width: `${7 * viewport.zoom}px`,
                        }}
                        viewBox="0 0 512 512">
                      <g>
                        <g>
                          <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                            c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                            c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                        </g>
                      </g>
                    </svg>
                  </div>
                </Marker>
                {showPopup[entry._id] ? 
                  <Popup
                    className='popup'
                    latitude={entry.latitude}
                    longitude={entry.longitude}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={()=>setShowPopup({
                      ...showPopup,
                      [entry._id]: false,
                    })}
                    anchor='top' >
                    <div>
                      <h3>{entry.title}</h3>
                      <p>{entry.description}</p>
                      <small>Visited on {new Date(entry.visit_Date).toLocaleDateString()}</small>
                    </div>
                  </Popup>:null
                }
            </Fragment>
          )})
        }
        {addNewEntry ?
        <>
            <Marker 
              mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN} 
              latitude={addNewEntry.latitude}
              longitude={addNewEntry.longitude}>
                <img 
                  className='marker' 
                  style={{
                    height: `${7 * viewport.zoom}px`,
                    width: `${7 * viewport.zoom}px`,
                  }}
                  src='https://i.imgur.com/y0G5YTX.png' 
                  alt=''/>
            </Marker>
            <Popup
              className='popup'
              latitude={addNewEntry.latitude}
              longitude={addNewEntry.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={()=>setAddNewEntry(null)}
              anchor='top'>
              <div>
                <h3>Add a new entry here</h3>
              </div>
            </Popup>
        </> :null}
      </ReactMapGL>
  );
};

export default App;