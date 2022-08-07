import { useState} from "react";
import Modal from 'components/Modal';
import useGlobalStore from "store/global";

export default function FilterModal({ open, setOpen, setClose }) {
    const updateFilterParams = useGlobalStore((state) => state.updateFilterParam);
  const [startDateValue, setStartDateValue] = useState("");
  const [endDateValue, setEndDateValue] = useState("");
  const [period, inputProps] = useRadioButtons("");
  


  const handleStartDateUpdate = (e) => setStartDateValue(e.target.value);
  const handleEndDateUpdate = (e) => setEndDateValue(e.target.value);
 


 const validateDateInput=()=>{
    if(startDateValue && endDateValue && !period) return true;
    if(!startDateValue && !endDateValue && period) return true
    if(startDateValue && endDateValue && period) return true;
    return false;
 } 

 
 


  const fetchFilter = () => {
    updateFilterParams({ start_date:startDateValue,end_date:endDateValue,status:period,searchParam:'',isFilter:true,isSearch:false})
    setStartDateValue("");
    setEndDateValue("");
    setClose();
  };

  const resetFilter = () => {
    updateFilterParams({ start_date:'all',end_date:'all',status:'all',searchParam:'',isFilter:false,isSearch:false})
  };

  function useRadioButtons(name) {
    const [period, setState] = useState(null);

    const clearInput = () => {
      setState(null)
    }

    const handleChange = e => {
      setState(e.target.value);
    };

    const inputProps = {
      name,
      type: "radio",
      onChange: handleChange
    };

    return [period, inputProps, clearInput];
  }


  return (
    <Modal
      open={open}
      setOpen={setOpen}
      setClose={setClose}
      text='Filter Your list'>
      
      <div className="flex flex-col space-y-4 mt-3">

      <div className="border-b mb-4 pb-8">
        <div className="flex flex-col space-y-4 ">
          <div className="flex justify-between">
            <div className="flex space-x-3 items-center">
              <input
                type="radio"
                value="approve"
                checked={period === "approve"}

                {...inputProps}
                className=" h-5 w-5"
              />
              <div className="text-l ml-1 font-medium text-slate-600">
                Approve
              </div>
            </div>
            <div className="flex space-x-3 items-center">
              <input
                type="radio"
                value="pending"
                checked={period === "pending"}
                {...inputProps}

                className="w-5 h-5"
              />
              <div className="text-l ml-1 font-mono text-slate-600">
                Pending
              </div>
            </div>
          </div>
          <div className="flex gap-[180px]">
            <div className="flex space-x-3 items-center">
              <input
                type="radio"
                value="all"
                checked={period === "all"}
                {...inputProps}
                className=" h-5 w-5"
              />
              <div className="text-l ml-1 font-mono text-slate-600">
                All
              </div>
            </div>

          </div>
        </div>
      </div>

        <div>
          <div className="text-md ml-1 font-mono mb-1 text-slate-600">
            Start Date
          </div>
          <input
            type="date"
            onChange={(e) => handleStartDateUpdate(e)}
            className="w-full mb-3 appearance-none block  px-4 py-2 text-l font-normal 
                                      text-gray-700  bg-clip-padding bg-no-repeat border border-solid border-gray-300 
                                      rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                      bg-gray-50 sm:text-md placeholder:text-slate-100
                                      "
          ></input>
        </div>
        <div>
          <div className="text-md ml-1 font-mono mb-1 text-slate-600">
            End Date
          </div>
          <input
            type="date"
            onChange={(e) => handleEndDateUpdate(e)}
            className="w-full mb-3 appearance-none block  px-4 py-2  text-l font-normal text-gray-700 
                                      bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded-lg transition 
                                      ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                      bg-gray-50 sm:text-md placeholder:text-slate-100
                                      "
          ></input>
        </div>
        <button
          type="button"
          className="font-medium text-white hover:text-slate-200 bg-blue-600 rounded-md mt-2 p-2 disabled:opacity-75 
                                    disabled:cursor-not-allowed disabled:bg-blue-300"
          disabled={ !validateDateInput()
            
          }
          onClick={fetchFilter}
        >
          search
        </button>
        <div className="flex justify-end items-end  text-end">
        <button
          type="button"
          className="w-[50%] font-mono text-red-500 hover:text-white hover:bg-red-400 bg-white border border-red-400 rounded-md mt-2 p-2 disabled:opacity-75 
                                    disabled:cursor-not-allowed disabled:bg-blue-300"
          onClick={resetFilter}
        >
          reset filter
        </button>
        </div>
      </div>
    </Modal>
  );
}
