import MapGL, { Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import myData from '../public/data.json';


console.log(myData);

// type Case = {
//   country: string,
//   countryCode: string,
//   cases: string,
//   deaths: string,
//   location: string
// }

const MapComponent = () => {

  return (
    <div className='w-screen h-screen relative'>
      <MapGL
        initialViewState={{
          longitude: 30,
          latitude: 30,
          zoom: 2
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle='https://api.maptiler.com/maps/streets-v2-light/style.json?key=GVM5THoOUkC8NZ2rlee0'

      >
        {myData.map((country, index) => {
          const loc = country.location?.split(',');
          if (!loc) return

          let className = ''
          if (+country.cases > 1000) className = 'w-[70px] h-[70px] font-semibold text-sm flex justify-center items-center bg-red-700 bg-opacity-50 border-2 border-red-700 rounded-full';
          if (+country.cases < 1000) className = 'w-[50px] h-[50px] font-semibold text-sm flex justify-center items-center bg-red-500 bg-opacity-50 border-2 border-red-500 rounded-full';
          if (+country.cases < 500) className = 'w-[30px] h-[30px] font-semibold text-sm flex justify-center items-center bg-orange-400 bg-opacity-50 border-2 border-orange-400 rounded-full';
          if (+country.cases < 10) className = 'w-[20px] h-[20px] font-semibold text-sm flex justify-center items-center bg-orange-300 bg-opacity-50 border-2 border-orange-300 rounded-full';

          return (
            <Marker key={index} latitude={+loc[0]} longitude={+loc[1]}>
              <div
                className={className}
              >
                {country.cases}
              </div>
            </Marker>
          )
        })}
      </MapGL>
    </div>
  )

};

export default MapComponent;