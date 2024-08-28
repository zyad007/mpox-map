import 'maplibre-gl/dist/maplibre-gl.css';
import myData from '../public/data.json';
import Map from './Map';
import { useEffect, useState } from 'react';
import Indicator from './Indicator';
import Tabs from './Tabs';
import Table from './Table/Table';
import Tabs2 from './Tabs2';
import dataTable from '../public/dataTable.json'


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

  const [tabs, setTabs] = useState<'Map' | 'Table'>('Map');

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
        if (!country[year] || !country[year].cases || country[year].cases == 0) return
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
    <div className='w-screen h-screen relative overflow-hidden bg-blue-950'>
      <div className='w-full h-[10%] font-semibold flex justify-center pt-5 text-5xl text-white'>MPOX Tracker</div>
      <div className='w-full h-[90%] flex'>
        <div className='h-full w-[20%] flex flex-col justify-center items-center px-5'>
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
        <div className='h-full w-[70%] px-5 pb-5 border-r border-l border-blue-800'>
          <div>
            <Tabs2
              activeTab={tabs}
              setActiveTab={setTabs}
            />
          </div>
          {
            tabs === 'Map' && <Map years={years} activeYear={activeTab} />
          }
          {
            tabs === 'Table' && <Table dataTable={dataTable} />
          }
        </div>
        <div className='relative'>
          <div className='w-96 px-4 mb-4 mt-4'>
            <button onClick={() => {
              window.open('https://mpoxvaccine.cdc.gov/')
            }} className='select-none hover:cursor-pointer w-full h-14 bg-blue-600 text-xl text-white rounded-xl hover:bg-opacity-85 transition-all'>Find MPOX Vaccines</button>
          </div>
          <div className='flex w-96 h-14 space-x-4 px-4'>
            <a href='https://www.paypal.com/donate/?business=2AP6C5WSUQJTU&no_recurring=0&item_name=Help+us+keep+the+MPOX+Tracker+online.&currency_code=USD' className='bg-white text-sm flex select-none hover:cursor-pointer justify-center items-center w-full h-14 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-500 hover:text-white transition-all px-4'>
              Donate via PayPal
              <div>
                <img className='w-12' src='/paypal.png' />
              </div>
            </a>
            <a href='https://cash.app/$mpoxtracker' className='bg-green-600 text-white flex select-none hover:cursor-pointer text-sm justify-center items-center w-full h-14 border-2 border-green-500 text-green-500 font-semibold rounded-xl hover:bg-green-500 hover:text-white transition-all px-4'>Donate via Cash App
              <div>
                <img className='w-20' src='/cash-app.png' />
              </div>
            </a>
          </div>

          <div className='text-white absolute bottom-0 flex flex-col p-2'>
            Contact us:
            <a className='text-blue-400 hover:text-blue-200' href='http://hello@mpox-tracker.com'>hello@mpox-tracker.com</a>
          </div>
        </div>
      </div>
    </div>
  )

};

export default MapComponent;