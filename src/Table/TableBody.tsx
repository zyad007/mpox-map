import React from 'react'
import TableRow from './TableRow'

export default function TableBody({ searchedRecords, records, header, setRecords, setSearchedRecords }) {
    return (
        <div className='w-full h-[95%]'>

            <div className='border-2 border-slate-500 border-t-0 h-full [&>*:nth-child(even)]:bg-blue-200 [&>*:nth-child(odd)]:bg-blue-400
                        [&>*:nth-child(even)]:border-slate-200 [&>*:nth-child(odd)]:border-slate-300
                            border-x border-b overflow-y-scroll scrollbar-none'>
                {searchedRecords?.map((record, i) => {
                    return (
                        <TableRow key={i} record={record} i={i}  />
                    )
                })}
            </div>

        </div>
    )
}