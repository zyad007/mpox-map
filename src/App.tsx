import 'maplibre-gl/dist/maplibre-gl.css';
import myData from '../public/data.json';
import Map from './Map';
import { useEffect, useState } from 'react';
import Indicator from './Indicator';


console.log(myData);

// type Case = {
//   country: string,
//   countryCode: string,
//   cases: string,
//   deaths: string,
//   location: string
// }

const MapComponent = () => {
  const [totalCases, setTotalCases] = useState(0)
  const [totalDeaths, setTotalDeaths] = useState(0)
  const [numberOfCountries, setNumberOfCountries] = useState(0)
  useEffect(() => {
    let casesSum = 0
    let deathsSum = 0
    myData.forEach((country) => {
      const cases = parseInt(country.cases)
      const deaths = parseInt(country.deaths)
      cases && (casesSum += cases)
      deaths && (deathsSum += deaths)
    })
    setTotalCases(casesSum)
    setTotalDeaths(deathsSum)
    setNumberOfCountries(myData.length)
  }, [])
  return (
    <div className='w-screen h-screen relative overflow-hidden'>
      <div className='w-full h-[10%] font-bold flex justify-center pt-5 text-3xl bg-[#fafafa]'>MPOX Tracker</div>
      <div className='w-full h-[90%] flex'>
        <div className='h-full w-[20%] bg-[#fafafa]'>
          <Indicator stats={{
            totalCases,
            numberOfCountries,
            totalDeaths
          }} />
        </div>
        <div className='h-full w-[70%] border-2 border-white pr-5 pb-5 bg-[#fafafa]'>
          <Map />
        </div>
      </div>
    </div>
  )

};

export default MapComponent;