'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Flex, Spin } from 'antd';
import 'leaflet/dist/leaflet.css';

const mecklenburgCountyBounds = [
  [34.9980, -81.0379], 
  [35.4985, -80.5636]
];

const MapWithNoSSR = dynamic(
  () => import('react-leaflet').then((mod) => {
    const { MapContainer, TileLayer, useMap } = mod;
    const L = require('leaflet');
    
    // This is a controller for the map that is used to fit the map to the county bounds
    function MapController({ bounds }: { bounds: any }) {
      const map = useMap();
      
      useEffect(() => {
        if (bounds) {
          // Fit map to county bounds
          map.fitBounds(bounds, {
            padding: [30, 30],
            maxZoom: 12
          });
          
          // Restrict panning to area near bounds
          const southWest = L.latLng(bounds[0][0] - 0.1, bounds[0][1] - 0.1);
          const northEast = L.latLng(bounds[1][0] + 0.1, bounds[1][1] + 0.1);
          map.setMaxBounds(L.latLngBounds(southWest, northEast));
          
          // Set min/max zoom levels
          map.setMinZoom(10);  // Don't allow zooming out too far
          map.setMaxZoom(18); // Limit maximum zoom
        }
      }, [map, bounds]);

      return null;
    }

    return function Map() {
      const defaultCenter: [number, number] = [39.8283, -98.5795];
      const defaultZoom = 12;
   
      return (
        <div className="w-full h-full">
          <MapContainer
            center={defaultCenter}
            zoom={defaultZoom}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
            zoomControl
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapController bounds={mecklenburgCountyBounds} />
          </MapContainer>
        </div>
      );
    };
  }),
  { ssr: false }
);

const Map = () => {
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  if (!rendered) {
    return <Flex justify="center" align="center" style={{ height: '100vh' }}><Spin size='large' /></Flex>
  }

  return <MapWithNoSSR />;
};

export default Map;