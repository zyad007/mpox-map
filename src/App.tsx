import React from 'react';
import MapGL, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

// Dummy data for countries with coordinates and numbers
const countriesData = [
  { country: 'USA', latitude: 37.7749, longitude: -122.4194, number: 10 },
  { country: 'Canada', latitude: 56.1304, longitude: -106.3468, number: 20 },
  { country: 'Brazil', latitude: -14.2350, longitude: -51.9253, number: 30 },
  { country: 'UK', latitude: 51.5074, longitude: -0.1278, number: 40 },
  // Add more countries as needed
];

const MapComponent = () => {


  return (
    <div className='w-screen h-screen relative'>
      <MapGL
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 1
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle='https://api.maptiler.com/maps/streets-v2-light/style.json?key=GVM5THoOUkC8NZ2rlee0'
        
      >
        {countriesData.map((country, index) => (
          <Marker key={index} latitude={country.latitude} longitude={country.longitude}>
            <div
              className='w-[30px] h-[30px] flex justify-center items-center bg-red-700 bg-opacity-50 border-2 border-red-700 rounded-full'
            >
              {country.number}
            </div>
          </Marker>
        ))}
      </MapGL>
    </div>
  )

};

export default MapComponent;