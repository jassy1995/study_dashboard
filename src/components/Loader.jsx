
import React from 'react'

const Loader = () => {
  return (
//     // <div class="border border-slate-400 shadow rounded-md p-4 max-w-sm w-full mx-auto">
//     {/* <div class="animate-pulse flex space-x-4">
//       <div class="rounded-full bg-slate-200 h-10 w-10"></div>
//       <div class="flex-1 space-y-6 py-1">
//         <div class="h-2 bg-slate-200 rounded"></div>
//         <div class="space-y-3">
//           <div class="grid grid-cols-3 gap-4">
//             <div class="h-2 bg-slate-200 rounded col-span-2"></div>
//             <div class="h-2 bg-slate-200 rounded col-span-1"></div>
//           </div>
//           <div class="h-2 bg-slate-200 rounded"></div>
//         </div>
//       </div>
//     </div>
//   </div> */}


<div className="max-w-sm w-full lg:max-w-full lg:flex p-4 space-x-6 border  border-gray-400 rounded-md h-48">
<div class="animate-pulse flex space-x-4">
  <div class="rounded-full bg-slate-200 h-10 w-10"></div>
  <div class="flex-1 space-y-6 py-1">
    <div class="h-2 bg-slate-200 rounded"></div>
    <div class="space-y-3">
      <div class="grid grid-cols-3 gap-4">
        <div class="h-2 bg-slate-200 rounded col-span-2"></div>
        <div class="h-2 bg-slate-200 rounded col-span-1"></div>
        <div class="h-2 bg-slate-200 rounded col-span-2"></div>
        <div class="h-2 bg-slate-200 rounded col-span-1"></div>
      </div>
      <div class="h-2 bg-slate-200 rounded"></div>
    </div>
  </div>
</div>
</div>
  )
}

export default Loader