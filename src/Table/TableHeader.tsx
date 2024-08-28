import { useEffect } from 'react'

export default function TableHeader({ header }) {
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
            </div>
            <div className='relative w-[20%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'>
                New Cases

            </div>
            <div className='relative w-[20%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'>
                New Deaths
            </div>
            <div className='relative w-[20%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'>
                Total Cases
            </div>
            <div className='relative w-[20%] h-full flex justify-center items-center text-center border-r border-slate-500 text-base'>
                Total Deaths
            </div>
            
        </div>
    )
}