import React, { useEffect, useState,useCallback } from 'react'
import { useScrollForFetching } from "Hooks/useScrollPosition";
import House from "components/House";
import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import useGlobalStore from "store/global";

import { useGetPropertyQuery } from "api/property";

const HouseList = () => {
   const { location,type,price,isFilter } = useGlobalStore((state) => ({
    location: state.data.location,
    type: state.data.type,
    price: state.data.price,
    isFilter: state.data.isFilter,
  }));
  const [y, setY] = useState(window.scrollY);
  const [scrollingDirection, setScrollingDirection] = useState("");
  const [reachButtom, setReachedBottom] = useState(false);

  const { data, isLoading, hasNextPage, fetchNextPage,isFetchingNextPage,isSuccess } = useGetPropertyQuery({location,type,price,isFilter});
  useScrollForFetching(hasNextPage, fetchNextPage,isFetchingNextPage);

  const LoadMoreMessage = () => {
    return (
        <div className={`flex justify-center fixed bottom-3 right-48 left-48 mb-2 mt-10`}>
            <h2 className='text-2xl text-slate-500 font-thin'>fetching more...</h2>
        </div>
    )
}


const EndOfScrollMessage = () => {
    return (
        <div className="flex justify-center fixed bottom-3 right-48 left-48 mb-2 mt-10 h-10 z-10">
            <h2 className='text-2xl text-slate-500 font-thin'>Congrats! You have scrolled to the end of the property.</h2>
        </div>
    )
}

const Loader = () => {
  return (
      <div className='flex flex-col justify-center items-center mt-20'>
         <ImSpinner2 className="mx-auto animate-spin text-blue-700 text-4xl" />
          <h2 className='text-2xl'>fetching property...</h2>
      </div>
  )
}


const handleNavigation = useCallback(
  e => {
    const window = e.currentTarget;

    if (y > window.scrollY) {
      setScrollingDirection("up")
      setReachedBottom(false);
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
        setReachedBottom(true);
      }
  };
  document.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
},[handleNavigation,scrollingDirection]);



  if (!data?.pages[0]?.data?.properties?.length && !isLoading) {
    return (
      <div className="flex justify-center items-center mt-[280px]">
        <h2 className="text-slate-400 text-3xl">{isFilter?"No property match your filter":"Sorry, no property at the moment"}</h2>
      </div>
    );
  }

  return (
    <section className="mb-1">
      <div className="container mx-auto mb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-12">

             {
                isLoading ? <Loader /> : isSuccess &&
                    data?.pages?.map((page) =>
                        page?.data?.properties?.map((property, i) => (
                          <Link to={`/property/${property._id}`} key={property._id}>
                          <House house={property} />
                        </Link>
                        ))
                    )
            }

        </div>
            {!hasNextPage && !isLoading && scrollingDirection ==='down' && reachButtom && <EndOfScrollMessage />}
            {isFetchingNextPage &&  <LoadMoreMessage />}
           
      </div>
    </section>
  );
};

export default HouseList;


