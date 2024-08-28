import MapGL, { Marker } from 'react-map-gl/maplibre';
import myData from '../public/data.json';
interface props {
    years: string[]
    activeYear: string
}
export default function Map({ activeYear }: props) {
    return (
        activeYear == "0" ? (
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
                    const cont = ['Africa', 'North America', 'South America', 'Europe', 'Asia', 'Aisa']
                    if (country.country == "Israel") country.country = "Palestine"
                    if (cont.includes(country.country)) return
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
        ) : (
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
                if(!country[activeYear]) return
                const cont = ['Africa', 'North America', 'South America', 'Europe', 'Asia']
                if(country.country == "Israel") country.country = "Palestine"
                if(cont.includes(country.country)) return
                let className = ''
                if (+country[activeYear].cases > 1000) className = 'group w-[70px] h-[70px] font-semibold text-sm flex justify-center items-center bg-red-700 bg-opacity-50 border-2 border-red-700 rounded-full';
                if (+country[activeYear].cases < 1000) className = 'group w-[50px] h-[50px] font-semibold text-sm flex justify-center items-center bg-red-500 bg-opacity-50 border-2 border-red-500 rounded-full';
                if (+country[activeYear].cases < 500) className = 'group w-[30px] h-[30px] font-semibold text-sm flex justify-center items-center bg-orange-400 bg-opacity-50 border-2 border-orange-400 rounded-full';
                if (+country[activeYear].cases < 10) className = 'group w-[20px] h-[20px] font-semibold text-sm flex justify-center items-center bg-orange-300 bg-opacity-50 border-2 border-orange-300 rounded-full';
                if (+country[activeYear].cases == 0) className = 'hidden group w-[20px] h-[20px] font-semibold text-sm justify-center items-center bg-orange-300 bg-opacity-50 border-2 border-orange-300 rounded-full';

                return (
                    <Marker key={index} latitude={+loc[0]} longitude={+loc[1]}>
                        <div
                            className={className}
                        >
                            {country[activeYear].cases}
                            <span className="sidebar-tooltip group-hover:scale-100">
                                {country.country}
                                <br />
                                Cases: {country[activeYear].cases}
                                <br />
                                Deaths: {country[activeYear].deaths}
                            </span>
                        </div>
                    </Marker>
                )
            })}
        </MapGL>
        )
    )
}
