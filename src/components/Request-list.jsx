

import React from 'react'
// import SqareBox from 'components/SquareBox/SquareBox'

const RequestList = () => {
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex p-4 space-x-6 border  border-gray-400 rounded-md">
  <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{backgroundImage: "url('https://www.ei-ie.org/img/Future-of-work-in-education.jpg?p=card')"}} title="Woman holding a mug">
  </div>
  <div className="bg-white p-4 flex flex-col justify-between leading-normal">
    <div className="py-2">
    <div class="flex-grow-1">
    <h5 class="mb-2 font-normal flex items-center text-[1.2rem] text-slate-700"> Babatunde Joseph</h5>
    <h5 class="font-normal mb-1 flex items-center text-[1.2rem] text-slate-600"> Email: babatundejoseph85@gmail.com</h5>
    <h5 class="font-normal mb-1 d-flex align-items-center text-[1.2rem] text-slate-600">Phone: 08143274300</h5>
    <h5 className="font-normal mb-1 flex items-center text-[1.2rem] text-slate-600">Date: 2022-08-02</h5>
    </div> 
    </div>
   
  </div>
</div>
  )
}

export default RequestList