
import {FaFilter} from "react-icons/fa";
import {BsFillGridFill,BsTable} from "react-icons/bs"
import { useWindowDimensions} from "Hooks/useScrollPosition";

const Topbar = ({setOpen,open,setToGrid,setToTable}) => {
  const hideFilteBtn = false;
 
     const {  width } = useWindowDimensions();
  return (
    <>
     <div>
    
        <nav className="border border-slate-400 shadow-sm w-full py-3 px-4 md:px-8 lg:px-8 xl:px-8 flex justify-between items-center rounded-md">
        <h5 className="font-medium m-0 text-slate-700  text-xl">
         Request(s)
       </h5>
        <div>
        <input
            type="search" name="search" id="search" className="w-[220px] px-3 h-10 border border-slate-400 rounded-full hidden lg:block xl:block"
            placeholder="Search.."
          />
        </div>
        <div className="max-w-full flex space-x-5">
          <BsFillGridFill className='sm:text-sm text-blue-500 md:text-2xl cursor-pointer' onClick={setToGrid}/>
          <BsTable className=' sm:text-sm text-blue-500 md:text-2xl cursor-pointer'onClick={setToTable}/>
        </div>
        
      </nav>
    </div>


  <div>
    {hideFilteBtn && (
     <div>
     { 
     width < 768 ? (
       <nav className="border border-slate-400 shadow-sm w-full py-3 px-4 flex justify-between items-center rounded-md">
       <div>
       <input
           type="search" name="search" id="search" className="w-[220px] px-3 h-10 border border-slate-400 rounded-full"
           placeholder="Search.."
         />
       </div>
       <div className="max-w-full">
       {!open && (<button  onClick={() => setOpen(true)} className="flex justify-center items-center py-1  w-20 px-2 border border-slate-500 rounded-full">
         <FaFilter className='text-slate-500 text-sm'/><span className="text-slate-500 text-[12px]">filter</span> 
       </button>)}
       
       {open && 
           <button onClick={()=>setOpen(true)} className="flex justify-center items-center py-1 px-2 w-20 border border-slate-500 rounded-full">
           <FaFilter className='text-blue-500 text-sm'/><span className="text-slate-500 text-[12px]">filter</span>
         </button>
       }
       
       </div>
       
     </nav>
     ): (
       <nav className="border border-slate-400 shadow-sm w-full py-3 px-4 flex justify-between items-center rounded-md">
       <h5 className="font-medium m-0 text-slate-700  text-xl">
         Request(s)
       </h5>
       <div>
       <input
           type="search" name="search" id="search" className="w-[220px] px-3 h-12 border border-slate-400 rounded-full"
           placeholder="Search.."
         />
       </div>
       <div className="max-w-full">
       {!open && (<button  onClick={() => setOpen(true)} className="flex justify-center items-center py-1  w-[144px] space-x-2 border border-slate-500 rounded-full">
         <FaFilter className='text-slate-500'/>  <span className='text-slate-500'>Filter</span>
       </button>)}
       
       {open && 
           <button onClick={()=>setOpen(true)} className="flex justify-center items-center py-1 px-2 w-[144px] space-x-2 border border-slate-500 rounded-full">
           <FaFilter className='text-blue-500'/> <span className='text-blue-500'>Change filter</span>
         </button>
       }
       
       </div>
       
     </nav>
     )
     }
   </div>
    )}
  </div>
    
   
    </>
    
   
  )
}

export default Topbar