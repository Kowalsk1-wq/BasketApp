import React, { useEffect, useState } from 'react';
import ReactMapGL from 'react-map-gl';

import useLocation from '../utils/useLocation';

import UI from './MapUI/index';

// const userLocation = JSON.parse(localStorage.getItem('location'));

const Map = () => {
  const location = useLocation();
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: location.latitude,
    longitude: location.longitude,
    zoom: 2,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      attributionControl={false}
      mapboxApiAccessToken={process.env.REACT_APP_MapboxAccessToken}
      {...viewport}
      onViewportChange={(vp) => setViewport(vp)}
    >
      <UI />
    </ReactMapGL>
  );
};

export default Map;
