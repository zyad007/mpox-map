import React from 'react'
import MapGL, { Marker } from 'react-map-gl/maplibre';
import myData from '../public/data.json';

export default function Map() {
    return (
        <MapGL
            initialViewState={{
                longitude: 30,
                latitude: 30,
                zoom: 1
            }}
            style={{ width: '100%', height: '100%' }}
            mapStyle='https://api.maptiler.com/maps/streets-v2-light/style.json?key=GVM5THoOUkC8NZ2rlee0'

        >
            {myData.map((country, index) => {
                const loc = country.location?.split(',');
                if (!loc) return

                let className = ''
                if (+country.cases > 1000) className = 'group w-[70px] h-[70px] font-semibold text-sm flex justify-center items-center bg-red-700 bg-opacity-50 border-2 border-red-700 rounded-full';
                if (+country.cases < 1000) className = 'group w-[50px] h-[50px] font-semibold text-sm flex justify-center items-center bg-red-500 bg-opacity-50 border-2 border-red-500 rounded-full';
                if (+country.cases < 500) className = 'group w-[30px] h-[30px] font-semibold text-sm flex justify-center items-center bg-orange-400 bg-opacity-50 border-2 border-orange-400 rounded-full';
                if (+country.cases < 10) className = 'group w-[20px] h-[20px] font-semibold text-sm flex justify-center items-center bg-orange-300 bg-opacity-50 border-2 border-orange-300 rounded-full';

                return (
                    <Marker key={index} latitude={+loc[0]} longitude={+loc[1]}>
                        <div
                            className={className}
                        >
                            {country.cases}
                            <span className="sidebar-tooltip group-hover:scale-100">
                                {country.country}
                                <br />
                                Cases: {country.cases}
                                <br />
                                Deaths: {country.deaths}
                            </span>
                        </div>
                    </Marker>
                )
            })}
        </MapGL>
    )
}
