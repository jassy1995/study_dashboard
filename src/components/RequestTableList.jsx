import React, { useEffect, useState,useCallback } from 'react'
import { useScrollForFetching } from "Hooks/useScrollPosition";
import { ImSpinner2 } from "react-icons/im";
import useGlobalStore from "store/global";
import { useGetRequestQuery } from "api/request";
import {formatCurrency } from "lib/utils";


const RequestTableList = () => {
   const { start_date,end_date,status,searchParam,isFilter,isSearch } = useGlobalStore((state) => ({
    start_date: state.data.start_date,
    end_date: state.data.end_date,
    status: state.data.status,
    searchParam: state.data.searchParam,
    isFilter: state.data.isFilter,
    isSearch: state.data.isSearch,
  }));
  const [y, setY] = useState(window.scrollY);
  const [scrollingDirection, setScrollingDirection] = useState("");
 


  const { data, isLoading, hasNextPage, fetchNextPage,isFetchingNextPage,isSuccess } = useGetRequestQuery({start_date,end_date,status,searchParam,isFilter,isSearch});
  useScrollForFetching(hasNextPage, fetchNextPage,isFetchingNextPage);
  const LoadMoreMessage = () => {
    return (
        <div className={`flex justify-center fixed bottom-3 right-48 left-48 mb-2 mt-10`}>
            <h2 className='md:text-2xl lg:text-2xl xl:text-2xl text-slate-600 font-thin'>fetching more...</h2>
        </div>
    )
}


const EndOfScrollMessage = () => {
    return (
        <div className="flex justify-center  mb-2 h-10 z-10">
            <h2 className='md:text-2xl lg:text-2xl xl:text-2xl text-slate-600 font-thin'>Congrats! You have scrolled to the end of the list.</h2>
        </div>
    )
}

const Loader = () => {
  return (
      <div className='flex flex-col justify-center items-center mt-20'>
         <ImSpinner2 className="mx-auto animate-spin text-blue-700 text-4xl" />
          <h2 className='text-2xl'>fetching request...</h2>
      </div>
  )
}


const handleNavigation = useCallback(
  e => {
    const window = e.currentTarget;

    if (y > window.scrollY) {
      setScrollingDirection("up")
    } else if (y < window.scrollY) {
      setScrollingDirection("down")
    }
    setY(window.scrollY);
  }, [y]
);

useEffect(() => {
  setY(window.scrollY);
  window.addEventListener("scroll", handleNavigation);

  return () => {
    window.removeEventListener("scroll", handleNavigation);
  };
}, [handleNavigation]);



useEffect(() => {
  const onScroll = async (event) => {
    const { scrollHeight, scrollTop, clientHeight } =
      event.target.scrollingElement;
      if ((Math.round(scrollTop + clientHeight)+1) === scrollHeight || (Math.round(scrollTop + clientHeight)+2) === scrollHeight ) {
      }
  };
  document.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
},[handleNavigation,scrollingDirection]);



  if (!data?.pages[0]?.data?.requests?.length && !isLoading) {
    return (
      <div className="flex justify-center items-center mt-[280px]">
        <h2 className="text-slate-400 text-3xl">{isFilter?"No request match your filter":"Sorry, no request at the moment"}</h2>
      </div>
    );
  }

  return (
    <section className="">
      <div className="mb-5">
        <div className="mb-3">
             {
                isLoading ? <Loader /> : isSuccess && 
                        <>
                        <div className=" overflow-auto">
                        <table className="min-w-full table-fixed overflow-auto">
                        <thead className="border-b">
                        <tr>
                          <th
                            scope="col"
                            className="text-md font-medium text-blue-500 px-2 py-3 text-left border  border-slate-300"
                          >
                            S/n
                          </th>
                          <th
                            scope="col"
                            className="text-md font-medium text-blue-500 px-2 py-3 text-left border  border-slate-300"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="text-md font-medium text-blue-500 px-2 py-3 text-left  border  border-slate-300"
                          >
                            Email
                          </th>
                          <th
                            scope="col"
                            className="text-md font-medium text-blue-500 px-2 py-3 text-left border  border-slate-300"
                          >
                            Phone
                          </th>
                          <th
                            scope="col"
                            className="text-md font-medium text-blue-500 px-2 py-3 text-left border  border-slate-300"
                          >
                            University
                          </th>
                          <th
                            scope="col"
                            className="text-md font-medium text-blue-500 px-2 py-3 text-left border  border-slate-300"
                          >
                            Degree
                          </th>
                          <th
                            scope="col"
                            className="text-md font-medium text-blue-500 px-2 py-3 text-left border  border-slate-300"
                          >
                            Loan Amount
                          </th>
                          <th
                            scope="col"
                            className="text-md font-medium text-blue-500 px-2 py-3 text-left border  border-slate-300"
                          >
                            Resumption Date
                          </th>
                          <th
                            scope="col"
                            className="text-md font-medium text-blue-500 px-2 py-3 text-left border  border-slate-300"
                          >
                            Graduation Date
                          </th>
                          <th
                            scope="col"
                            className="text-md font-medium text-blue-500 px-2 py-3 text-left border  border-slate-300"
                          >
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                    {data?.pages?.map((page) =>(     
                   page?.data?.requests?.map((request, index) => (
                   <tr key={index} className="border-b">
                      <td className="px-2 py-3 whitespace-nowrap text-md font-medium text-gray-900 border border-slate-300">
                        {index + 1}
                      </td>
                      <td className="text-left px-2 py-3 whitespace-normal text-md font-medium text-gray-900 border border-slate-300">
                        {request?.name}
                      </td>
                      <td className="text-left text-md first-letter:capitalize text-gray-900 font-light px-2 py-3 whitespace-wrap border border-slate-300">
                        {request?.email}
                      </td>

                      <td className="text-left text-md  text-gray-600 font-light px-2 py-3 whitespace-nowrap border border-slate-300">
                        {request?.phone}
                      </td>
                      <td className="text-left text-md text-gray-900 font-light px-2 py-3 whitespace-normal border border-slate-300">
                        {request?.university}
                      </td>
                      <td className="text-md text-gray-900 font-light px-2 py-3 whitespace-nowrap border border-slate-300 text-left">
                          {request.degree}
                      </td>
                      <td className="text-md text-gray-900 font-light px-2 py-3 whitespace-nowrap border border-slate-300 text-left">
                          {request?.loan_amount&&formatCurrency(request.loan_amount)?.split(".")[0]}
                      </td>
                      <td className="text-md text-gray-900 font-light px-2 py-3 whitespace-nowrap border border-slate-300 text-left">
                      <span className="border-r- border-slate-600 pr-1">
                        {
                          request?.resumption_date?.split(
                            "T"
                          )[0]
                        }
                      </span>{" "}
                      </td>
                      <td className="text-md text-gray-900 font-light px-2 py-3 whitespace-nowrap border border-slate-300 text-left">
                      <span className="border-r- border-slate-600 pr-1">
                        {
                          request?.graduation_date?.split(
                            "T"
                          )[0]
                        }
                      </span>{" "}
                      </td>
                      <td className="text-md text-gray-900 font-light px-2 py-3 whitespace-nowrap border border-slate-300 text-left">
                        <span className="border-r- border-slate-600 pr-1">
                        {
                          request?.createdAt?.split(
                            "T"
                          )[0]
                        }
                      </span>{" "}
                      </td>
                    </tr> 
                   
                        ))
                    ))
                    }
                
                    </tbody>
              </table>
            </div>
        
     
      </>
      }

        </div>
            {((!hasNextPage && !isLoading) || (!hasNextPage && !isLoading && (scrollingDirection ==='down' || scrollingDirection ==='up')))  && <EndOfScrollMessage />}
            {isFetchingNextPage &&  <LoadMoreMessage />}
           
      </div>
    </section>
  );
};

export default RequestTableList;


