

import { timeFormatter } from 'helper/timeFormatter'


const RequestCard = ({ request }) => {
    console.log(request)
    const imageSrc = () => {
        if (request?.image) return request.image
        return 'https://www.ei-ie.org/img/Future-of-work-in-education.jpg?p=card'
    }
    return (
        <div className="w-full  md:flex  lg:flex p-4 md:space-x-3 lg:space-x-3  xl:space-x-3  border  border-gray-400 rounded-md relative">
            <div className="max-w-md"  title="Woman holding a mug">
                <img src={imageSrc()} alt="" className='h-full object-cover  md:w-[250px] lg:w-[300px]'/>
            </div>
            <div className="bg-white sm:pl-0 md:pb-0 lg:pb-0 xl:pb-0   md:p-4 lg:p-4 xl:p-4 flex flex-col justify-between leading-normal">
                <div className="py-2">
                    <div className="flex-grow-1">
                        <div className="flex justify-between">

                        <h5 className="mb-2 font-normal d-flex items-center text-[1.2rem] text-slate-700"> {request?.name}</h5>
                        </div>
                        <h5 className="font-normal mb-1 d-flex align-items-center  text-[1.2rem] text-slate-600"> Email: {request?.email?.split('@')[0]}</h5>
                        <h5 className="font-normal mb-1 d-flex align-items-center text-[1.2rem] text-slate-600">Phone: {request?.phone}</h5>
                        <h5 className="font-normal mb-1 d-flex align-items-center text-[1.2rem] text-slate-600">University: {request?.university}</h5>
                        <h5 className="font-normal mb-1 d-flex align-items-center text-[1.2rem] text-slate-600">Degree: {request?.degree}</h5>
                        <h5 className="font-normal mb-1 d-flex align-items-center text-[1.2rem] text-slate-600">Amount: {request?.loan_amount}</h5>
                        <h5 className="font-normal mb-1 flex items-center text-[1.2rem] text-slate-600">Date: <span className="border-r- border-slate-600 pr-1">
                            {
                                request?.createdAt?.split(
                                    "T"
                                )[0]
                            }
                        </span>{" "}
                            <span className="pl-1 font-mono font-bold">
                                {request?.createdAt &&
                                    timeFormatter(
                                        new Date(
                                            request.createdAt?.split(".")[0]?.replace("T", " ")
                                        )
                                    )}
                            </span></h5>
                            
                    </div>
                </div>

            <button className="bg-blue-500 text-white pb-0 mb-0 px-1 font-momo w-32 mt-2  rounded-md h-8 text-xl">view detail</button>
            </div>
        </div>
       
    )
}

export default RequestCard

