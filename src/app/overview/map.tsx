'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Flex, Spin } from 'antd';
import 'leaflet/dist/leaflet.css';

const mecklenburgCountyBounds = [
  [34.998, -81.0379],
  [35.4985, -80.5636],
];

const businesses = [
  {
    name: 'NoDa Brewing Company',
    type: 'brewery',
    address: '2921 N Tryon St, Charlotte, NC 28206',
    lat: 35.2456,
    lng: -80.8089,
    phone: '(704) 900-6851',
    website: 'https://nodabrewing.com',
  },
  {
    name: 'Lost Worlds Brewing Company',
    type: 'brewery',
    address: '1100 Metropolitan Ave #165, Charlotte, NC 28204',
    lat: 35.212549,
    lng: -80.835303,
    phone: '(980) 207-0827',
    website: 'https://lostworldsbeer.com',
  },
  {
    name: 'Birdsong Brewing Co.',
    type: 'brewery',
    address: '1016 N Davidson St, Charlotte, NC 28206',
    lat: 35.230652,
    lng: -80.826538,
    phone: '(704) 332-1810',
    website: 'https://birdsongbrewing.com',
  },
  {
    name: 'Sycamore Brewing',
    type: 'brewery',
    address: '2151 Hawkins St, Charlotte, NC 28203',
    lat: 35.209042,
    lng: -80.86203,
    phone: '(980) 201-3370',
    website: 'https://sycamorebrewing.com',
  },
];
const MapWithNoSSR = dynamic(
  () =>
    import('react-leaflet').then((mod) => {
      const { MapContainer, TileLayer, useMap, Marker, Popup } = mod;
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const L = require('leaflet');

      const createUserLocationIcon = () => {
        return L.divIcon({
          className: 'user-location-icon',
          html: `<div style="background-color: #4285F4; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 3px rgba(0,0,0,0.5);"></div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });
      };

      // This is a controller for the map that is used to fit to the county bounds
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function MapController({ bounds }: { bounds: any }) {
        const map = useMap();

        useEffect(() => {
          if (bounds) {
            // Fit map to county bounds
            map.fitBounds(bounds, {
              padding: [30, 30],
              maxZoom: 12,
            });

            // Restrict panning to area near bounds
            const southWest = L.latLng(bounds[0][0] - 0.1, bounds[0][1] - 0.1);
            const northEast = L.latLng(bounds[1][0] + 0.1, bounds[1][1] + 0.1);
            map.setMaxBounds(L.latLngBounds(southWest, northEast));

            // Set min/max zoom levels
            map.setMinZoom(10); // Don't allow zooming out too far
            map.setMaxZoom(18); // Limit maximum zoom

            const resizeObserver = new ResizeObserver(() => {
              map.invalidateSize();
            });

            resizeObserver.observe(map.getContainer());
            return () => {
              resizeObserver.disconnect();
            };
          }
        }, [map, bounds]);

        return null;
      }

      return function Map({
        userLocation,
      }: {
        userLocation: { lat: number; lng: number } | null;
      }) {
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
              {userLocation && (
                <Marker
                  position={[userLocation.lat, userLocation.lng]}
                  icon={createUserLocationIcon()}
                >
                  <Popup>
                    <div>
                      <p className="font-bold">Your Location</p>
                      <p className="text-xs text-gray-600">
                        {userLocation.lat.toFixed(5)},{' '}
                        {userLocation.lng.toFixed(5)}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              )}
              {businesses &&
                businesses.map((business, index) => (
                  <Marker
                    key={index}
                    position={[business.lat, business.lng]}
                    icon={L.icon({
                      iconUrl: '/icons/beerIcon/beer-icon.svg',
                      iconSize: [20, 20],
                      iconAnchor: [10, 10],
                    })}
                  >
                    <Popup>
                      <div>
                        <h3 className="font-bold">{business.name}</h3>
                        <p>{business.address}</p>
                        <p className="text-sm text-gray-600">{business.type}</p>
                        {business.phone && <p>📞 {business.phone}</p>}
                        {business.website && (
                          <a
                            href={business.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            Visit Website
                          </a>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </div>
        );
      };
    }),
  { ssr: false }
);

const Map = () => {
  const [rendered, setRendered] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  useEffect(() => {
    if (rendered) {
      getUserLocation();
    }
  }, [rendered]);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocating(false);
      },
      (error) => {
        setLocationError('Unable to retrieve your location');
        setIsLocating(false);
        console.error('Geolocation error:', error);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  if (locationError) {
    return (
      <Flex justify="center" align="center" style={{ height: '100vh' }}>
        <div>{locationError}</div>
      </Flex>
    );
  }

  if (!rendered || isLocating) {
    return (
      <Flex justify="center" align="center" style={{ height: '100vh' }}>
        <Spin size="large" />
      </Flex>
    );
  }

  return <MapWithNoSSR userLocation={userLocation} />;
};

export default Map;
