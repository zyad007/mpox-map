import { useEffect, useMemo, useState } from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'

export default function Table({ dataTable }) {
    const Sorted = {
        NO: 0,
        ASC: 1,
        DEC: -1
    }
    const [records, setRecords] = useState([])
    const [sorted, _2] = useState(false)
    const [searchedRecords, setSearchedRecords] = useState([])
    const [headers, setHeaders] = useState([])
    const [_, setSorters] = useState([])
    const [search, setSearch] = useState('')

    async function fetchRecords() {
        setHeaders(['country', 'date', 'cases', 'deaths']);
        
        const records = dataTable

        console.log(records);

        setSearch('')
        setSearchedRecords(records)
        setRecords(records)
        setSorters([{date: Sorted.NO, country: Sorted.NO, cases: Sorted.NO, deaths: Sorted.NO}])
    }

    useMemo(() => {
        fetchRecords()
    }, [dataTable])
    
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
                    <TableHeader header={headers} />
                    <TableBody searchedRecords={searchedRecords}   />
                </div>



            </div>
        </div>
    )
}