


// import Loader from 'components/Loader'
import { useState } from 'react'
import Navbar from 'components/Navbar'
import Requests from 'components/Requests'
import Topbar from 'components/Topbar'
import {useGetTotalCountQuery} from "api/request"
import FilterModal from 'components/Filter'
import RequestTableList from 'components/RequestTableList'

const StudyPage = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('grid');
    const {data} = useGetTotalCountQuery()
    const closeModal = () => {
      setOpen(false);
    };
 






  return (
    <div className="">
        <Navbar/>
        <FilterModal open={open} setOpen={setOpen} setClose={closeModal} />
        <div className='flex space-x-5 justify-center px-2   md:px-24 lg:px-24 xl:px-24 xxl:px-24 mt-[100px]'>
           <div className='flex flex-col space-y-4 w-full'>
            <Topbar setOpen={setOpen} open={open} setToGrid={()=>setContent('grid')} setToTable={()=>setContent('table')}/>
            {content==='grid'? <Requests/>: <RequestTableList/>}
           </div>
           <div className='hidden  flex-col rounded-md justify-center items-center border border-slate-400  w-[30%]  bg-white h-[150px] '>
             <h1 className="text-3xl">{data?.data?.count}</h1>
             <span className='font-medium text-slate-500 text-lg'>Total Requests</span>
           </div>
       
        </div>
    </div>
  )
}

export default StudyPage