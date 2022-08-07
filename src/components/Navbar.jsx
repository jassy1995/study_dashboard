import {Link} from 'react-router-dom';
import { useScrollPosition} from "Hooks/useScrollPosition";

const Navbar = () => {
    const scrollPosition = useScrollPosition();
  
    
     






  return (
    <header className={`flex justify-between items-center shadow-sm z-20 fixed top-0 right-0 left-0  bg-white px-10 md:px-48 lg:px-48 xl:px-48 h-[74px] border-b-2 mb-[400px]  ${
        scrollPosition > 0 ? "shadow-md" : ""
      } `}>
         <div>
         <img src="/assets/images/logo.png" alt="not exist"  className="rounded h-[25px]" />
         </div>
         <div className="">
           <Link to="/" className='text-xl'>Request</Link> 
         </div>
         <div className='hidden  lg:block'>  
         <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt='' className='rounded-full w-10 h-10 object-cover'/>        
         </div>
    </header>
  )
}

export default Navbar 
