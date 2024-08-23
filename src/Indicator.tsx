
interface Stats {
    totalCases: number
    totalDeaths: number
    numberOfCountries: number
}
const Indicator = ({
    stats
}: {
    stats: Stats
}) => {


    return (
        <div className="w-full h-full flex flex-col justify-start items-center mt-10">

            <div className="flex flex-col justify-center items-start border border-white p-5 w-2/3 rounded-md bg-[#dedede] mr-20">
                <div className='mb-2 text-lg font-light'>TOTAL CASES</div>
                <div className='font-bold text-3xl'>{stats.totalCases.toLocaleString("en-US")}</div>
            </div>
            <div className="flex flex-col justify-center items-start border border-white p-5 w-2/3 rounded-md my-10 bg-[#dedede] mr-20">
                <div className='mb-2 text-lg font-light'>TOTAL DEATHS</div>
                <div className='font-bold text-3xl'>{stats.totalDeaths.toLocaleString("en-US")}</div>
            </div>
            <div className="flex flex-col justify-center items-start border border-white p-5 w-2/3 rounded-md bg-[#dedede] mr-20">
                <div className='mb-2 text-lg font-light'>Number Of Countries</div>
                <div className='font-bold text-3xl'>{stats.numberOfCountries.toLocaleString("en-US")}</div>
            </div>

            

        </div>
    );
}

export default Indicator;