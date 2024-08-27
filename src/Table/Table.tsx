import React, { useEffect, useState } from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import data from '../../public/data.json'

export default function Table({ activeYear, years }) {
    const Sorted = {
        NO: 0,
        ASC: 1,
        DEC: -1
    }
    const [records, setRecords] = useState([])
    const [sorted, setSorted] = useState(false)
    const [searchedRecords, setSearchedRecords] = useState([])
    const [headers, setHeaders] = useState([])
    const [sorters, setSorters] = useState([])
    const [reload, setReload] = useState(false)
    const [search, setSearch] = useState('')
    async function refresh() {
        setReload(!reload)
    }
    const sort = (field, type) => {
        const tempSorter = { ...sorters }

        const keys = Object.keys(sorters).filter(x => x !== field)
        for (const key of keys) {
            tempSorter[key] = Sorted.NO
        }

        if (tempSorter[field] === Sorted.NO) tempSorter[field] = Sorted.ASC
        else tempSorter[field] = (tempSorter[field] * -1)

        setSorters(tempSorter)

        if (type == "Number") {
            if (tempSorter[field] === Sorted.ASC) setRecords(records.sort((a, b) => +a[field] - +b[field]))
            else if (tempSorter[field] === Sorted.DEC) setRecords(records.sort((a, b) => +b[field] - +a[field]))

            setRecords(records)
        } else if (type == "String") {
            if (tempSorter[field] === Sorted.ASC) {
                setRecords(records.sort((a, b) => {
                    if (a[field] < b[field]) {
                        return -1;
                    }
                    if (a[field] > b[field]) {
                        return 1;
                    }
                    return 0;
                }))
            } else if (tempSorter[field] === Sorted.DEC) {
                setRecords(records.sort((a, b) => {
                    if (a[field] < b[field]) {
                        return 1;
                    }
                    if (a[field] > b[field]) {
                        return -1;
                    }
                    return 0;
                }))
            }
        }
        setSorted(!sorted)

    }

    async function fetchRecords() {
        setHeaders(['country', 'date', 'cases', 'deaths']);
        
        const records = data.map(x => {
            return {
                cases: activeYear != 0 ? x[activeYear]?.cases : x.cases,
                deaths: activeYear != 0 ? x[activeYear]?.deaths : x.deaths,
                country: x.country,
                date: activeYear != 0 ? activeYear : 'Total'
            }
        })

        console.log(records);

        setSearch('')
        setSearchedRecords(records)
        setRecords(records)
        setSorters([{date: Sorted.NO, country: Sorted.NO, cases: Sorted.NO, deaths: Sorted.NO}])
    }

    useEffect(() => {
        fetchRecords()
    }, [activeYear])
    
    useEffect(() => {
        setSearchedRecords(records)
    }, [records])

    useEffect(() => {
        console.log("anas")
        if (search === "") {
            setSearchedRecords(records)
        } else {
            setSearchedRecords(records.filter(x => x.country?.toLowerCase().includes(search.toLowerCase().trim())))
        }
        return () => {
            // console.log(searchedRecords);
        }
    }, [search, sorted])

    return (
        <div className=' flex justify-center items-start w-full h-[90%] px-10 pb-10'>
            <div className='flex-col justify-center items-center w-full h-full'>

                {/* Search & Info */}
                <div className='w-full h-[10%] flex justify-between items-center space-x-2'>
                    <div className='w-[20%] rounded pl-4 items-center border border-slate-500'>
                        <input className='focus:outline-0 text-left font-Sansation-Light text-base w-full bg-transparent text-white' value={search}
                            onChange={(e) => { setSearch(e.target.value) }}
                            placeholder='Search'
                        />
                    </div>
                </div>

                {/* Table Header */}
                <div className='w-full border-collapse h-[90%]'>
                    <TableHeader sort={sort} header={headers} sorters={sorters} />
                    <TableBody searchedRecords={searchedRecords} header={headers} records={records} setRecords={setRecords} setSearchedRecords={setSearchedRecords} />
                </div>



            </div>
        </div>
    )
}