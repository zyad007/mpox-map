import React, { useEffect } from 'react'
import SORT from '/sort.png'
import SORT_UP from '/sort-up.png'
import SORT_DOWN from '/sort-down.png'

export default function TableHeader({ sort, header, sorters }) {
    useEffect(() => {
        // console.log(sorters)
        // console.log(header)
    }, [header])

    return (
        <div className='border-b border-r border-slate-500 select-none w-full bg-blue-500 text-white font-semibold h-[10%] flex items-center justify-start text-[1rem] shadow font-Sansation-Bold border-t'>
            <div className='relative w-[10%] h-full flex justify-center items-center text-center border-l border-slate-500 text-base'>
                no.
            </div>
            <div className='relative w-[20%] h-full flex justify-center items-center text-center border-x border-slate-500 text-base'>
                Country
            </div>
            <div className='relative w-[20%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'>
                Date
                <img src={(sorters.Date === 0) ? SORT : (sorters.Date === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
            </div>
            <div className='relative w-[20%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                onClick={() => {
                    sort("cases", "Number")
                }}>
                Cases
                <img src={(sorters.Cases === 0) ? SORT : (sorters.Cases === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
            </div>
            <div className='relative w-[20%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'
                onClick={() => {
                    sort("deaths", "Number")
                }}>
                Deaths
                <img src={(sorters.Deaths === 0) ? SORT : (sorters.Deaths === 1 ? SORT_UP : SORT_DOWN)}
                    className='absolute w-[1rem] h-[1rem] right-[5%] bottom-[12%]'
                />
            </div>
            
        </div>
    )
}