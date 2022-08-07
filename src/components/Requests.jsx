import React, { useEffect, useState,useCallback } from 'react'
import { useScrollForFetching } from "Hooks/useScrollPosition";
import { ImSpinner2 } from "react-icons/im";
import useGlobalStore from "store/global";
import { useGetRequestQuery } from "api/request";
import RequestCard from './RequestCard';


const Requests = () => {
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
        <h2 className="text-slate-400 text-3xl">{isFilter?"No property match your filter":"Sorry, no property at the moment"}</h2>
      </div>
    );
  }

  return (
    <section className="">
      <div className="bg-red-40 mb-5">
        <div className="flex flex-col space-y-4 mb-3">
             {
                isLoading ? <Loader /> : isSuccess &&
                    data?.pages?.map((page) =>
                        page?.data?.requests?.map((request, i) => (
                        
                          <RequestCard request={request} key={i}/>
                   
                        ))
                    )
            }

        </div>
            {((!hasNextPage && !isLoading) || (!hasNextPage && !isLoading && (scrollingDirection ==='down' || scrollingDirection ==='up')))  && <EndOfScrollMessage />}
            {isFetchingNextPage &&  <LoadMoreMessage />}
           
      </div>
    </section>
  );
};

export default Requests;


