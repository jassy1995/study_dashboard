import React from "react";
import HouseList from "components/HouseList";
import Search from "components/Search";
import Footer from "components/Footer";
import useGlobalStore from "store/global";
import { useGetPropertyQuery } from "api/property";

// import { useScrollForFetching } from "Hooks/useScrollPosition";

export const PropertyPage = () => {
  // const { scrollHeight, scrollTop, clientHeight } = useScrollForFetching();
  // if (scrollHeight - scrollTop <= clientHeight * 1.5) {
  //   console.log("yes");
  // }

  const { location,type,price,isFilter } = useGlobalStore((state) => ({
    location: state.data.location,
    type: state.data.type,
    price: state.data.price,
    isFilter: state.data.isFilter,
  }));

  const { data, isLoading,isError,hasNextPage } = useGetPropertyQuery({location,type,price,isFilter});




  return (
    <>
      <div className=" mt-20 lg:pt-6 z-10">
        <div className={!data?.pages[0]?.data?.properties?.length && !isLoading && !isError && !isFilter?"hidden":""}>
        <Search/>
        </div>
        {/* <div className="overflow-y-auto"> */}
        <HouseList/>
        {/* </div> */}
      </div>
      <div className={(!hasNextPage && !isLoading) && (!data?.pages[0]?.data?.properties?.length && !isLoading && !isError)?"block":"hidden"}>
        <Footer />
      </div>
    </>
  );
};
