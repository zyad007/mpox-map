
import React, { useEffect, useState } from 'react'

export default function TableRow({ record, i }) {

    useEffect(() => {
        // setCheck(record.check)
        // console.log(record[header[0].name])
    }, [record])


    return (
        <tr className="w-full flex h-[3rem] relative cursor-pointer" >
            {/* <div className='absolute w-full h-full bg-black bg-opacity-0 hover:bg-opacity-30 cursor-pointer'></div> */}
            <td className='w-[10%] h-full flex justify-center items-center text-center'>
                {i + 1}
            </td>
            <td className='w-[20%] h-full flex justify-center items-center text-center truncate'>
                {record.country}
            </td>
            <td className='w-[20%] h-full flex justify-center items-center text-center truncate'>
                {record.date}
            </td>
            <td className='w-[20%] h-full flex justify-center items-center text-center truncate'>
                {record.cases}
            </td>
            <td className='w-[20%] h-full flex justify-center items-center text-center truncate'>
                {record.deaths}
            </td>
        </tr>
    )
}
