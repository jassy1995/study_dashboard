import React, { useState } from "react";
import { useGetOrder } from "api/property";
import ReviewModal from "components/ReviewModal";
import Footer from "components/Footer";
import { timeFormatter } from "helper/timeFormatter";

function OrderPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [request, setRequest] = useState(null);
  const [open, setOpen] = useState(false);
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    isPreviousData,
  } = useGetOrder(pageNumber);
  const handleRefetchPrevious = () => {
    setPageNumber((page) => page - 1);
  };

  const handleRefetchNext = () => {
    if (!isPreviousData && pageNumber < data.data.total_page) {
      setPageNumber((page) => page + 1);
    }
  };

  const Review = (request) => {
    setRequest(request);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const EmptyOrder = () => {
    return (
      <div className="flex justify-center items-center mt-96">
        <h2 className="text-slate-400 text-3xl">Sorry no oreder at the moment</h2>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col space-y-2 pb-32 md:pb-32 lg:pb-32 xl:pb-32">
        {isFetching || isLoading ? <span> Loading...</span> : null}{" "}
        {isError && <span> {error.message}</span>}
        {(!data?.data?.orders?.length && (!isFetching && !isLoading && !isError)) ?  <EmptyOrder/>:''}
        {!!data && data?.data?.orders?.length > 0  && (
          <>
            <div className="container mx-auto overflow-auto">
              <ReviewModal
                open={open}
                setOpen={setOpen}
                setClose={closeModal}
                property={request}
              />
              <table className="min-w-full table-fixed mt-24 overflow-auto">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-violet-500 px-6 py-4 text-left border  border-slate-300"
                    >
                      S/n
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-violet-500 px-6 py-4 text-left border  border-slate-300"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-violet-500 px-6 py-4 text-left  border  border-slate-300"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-violet-500 px-6 py-4 text-left border  border-slate-300"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-violet-500 px-6 py-4 text-left border  border-slate-300"
                    >
                      Message
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-violet-500 px-6 py-4 text-center border  border-slate-300"
                    >
                      Action
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-violet-500 px-6 py-4 text-left border  border-slate-300"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.orders.map((request, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-slate-300">
                        {index + 1}
                      </td>
                      <td className="px-6 py-3 whitespace-normal text-sm font-medium text-gray-900 border border-slate-300">
                        {request?.name}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-3 whitespace-nowrap border border-slate-300">
                        {request?.email}
                      </td>

                      <td className="text-sm text-gray-900 font-light px-6 py-3 whitespace-nowrap border border-slate-300">
                        {request?.phone}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-3 whitespace-normal border border-slate-300">
                        {request?.message}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-3 whitespace-nowrap border border-slate-300 text-center">
                        <button
                          type="button"
                          className="bg-yellow-100 px-2 py-1 text-yellow-700 text-sm font-medium rounded-full text-center"
                          onClick={() => Review(request?.property)}
                        >
                          review
                        </button>
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-3 whitespace-nowrap border border-slate-300">
                        <span className="border-r- border-slate-600 pr-1">
                        {
                          request?.createdAt?.split(
                            "T"
                          )[0]
                        }
                      </span>{" "}
                      <span className="pl-1 font-mono font-bold">
                        {request?.createdAt &&
                          timeFormatter(
                            new Date(
                              request.createdAt?.split(".")[0]?.replace("T"," ")
                            )
                          )}
                      </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="container mx-auto">
              <div className="flex justify-between mt-6">
                <div className="md:text-lg">
                  page <strong>{pageNumber}</strong> of{" "}
                  <strong>{data.data.total_page}</strong>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleRefetchPrevious}
                    disabled={pageNumber === 1}
                    className="border text-white bg-violet-600 font-bold py-1 rounded-lg px-2 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    previous
                  </button>
                  <button
                    onClick={handleRefetchNext}
                    disabled={
                      isPreviousData || pageNumber === data.data.total_page
                    }
                    className="border text-white bg-violet-600 font-bold py-1 px-5 rounded-lg disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    next
                  </button>{" "}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
export default OrderPage;
