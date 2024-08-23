import 'maplibre-gl/dist/maplibre-gl.css';
import myData from '../public/data.json';
import Map from './Map';
import { useEffect, useState } from 'react';
import Indicator from './Indicator';
import Tabs from './Tabs';


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
  const [years, setYears] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("0")
  const [yearsData, setYearsData] = useState<any>({})
  useEffect(() => {
    const years: string[] = []
    Object.keys(myData[0]).forEach((key) => {
      if (key == "cases" || key == "location" || key == "country" || key == "countryCode" || key == "deaths") return
      years.push(key)
    })
    setYears(years)
    console.log(myData)
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
  useEffect(() => {
    if (!years) return
    const newData = {}
    for (let year of years) {
      let casesSum = 0
      let deathsSum = 0
      let numberOfCountries = 0
      myData.forEach((country) => {
        if(!country[year] || !country[year].cases || country[year].cases == 0) return
        const cases = parseInt(country[year]?.cases)
        const deaths = parseInt(country[year]?.deaths)
        cases && (casesSum += cases)
        deaths && (deathsSum += deaths)
        numberOfCountries++
      })
      newData[year] = {
        cases: casesSum,
        deaths: deathsSum,
        numberOfCountries
      }
    }
    setYearsData(newData)
  }, [years])
  return (
    <div className='w-screen h-screen relative overflow-hidden'>
      <div className='w-full h-[10%] font-bold flex justify-center pt-5 text-3xl bg-[#fafafa]'>MPOX Tracker</div>
      <div className='w-full h-[90%] flex'>
        <div className='h-full w-[20%] bg-[#fafafa]'>
          <Tabs
            years={years}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          {
            activeTab == "0" ? (
              <Indicator stats={{
                totalCases,
                numberOfCountries,
                totalDeaths
              }} />
            ) : (
              <Indicator stats={{
                totalCases: yearsData[activeTab].cases,
                numberOfCountries: yearsData[activeTab].numberOfCountries,
                totalDeaths: yearsData[activeTab].deaths
              }} />
            )
          }
        </div>
        <div className='h-full w-[70%] border-2 border-white pr-5 pb-5 bg-[#fafafa]'>
          <Map years={years} activeYear={activeTab} />
        </div>
      </div>
    </div>
  )

};

export default MapComponent;