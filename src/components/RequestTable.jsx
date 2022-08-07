import React from "react";

import { timeFormatter } from "helper/timeFormatter";

function RequestTable({request,index}) {
  console.log(request);
  return (
    <>
      <div className="flex flex-col space-y-2 pb-32 md:pb-32 lg:pb-32 xl:pb-32">
          <>
            <div className="container mx-auto overflow-auto">
              <table className="min-w-full table-fixed mt-24 overflow-auto">
                <thead className="border-b">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-blue-500 px-6 py-4 text-left border  border-slate-300"
                    >
                      S/n
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-blue-500 px-6 py-4 text-left border  border-slate-300"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-blue-500 px-6 py-4 text-left  border  border-slate-300"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-blue-500 px-6 py-4 text-left border  border-slate-300"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-blue-500 px-6 py-4 text-left border  border-slate-300"
                    >
                      University
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-blue-500 px-6 py-4 text-center border  border-slate-300"
                    >
                      Degree
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-blue-500 px-6 py-4 text-center border  border-slate-300"
                    >
                      Loan Amount
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-blue-500 px-6 py-4 text-left border  border-slate-300"
                    >
                      Res Date
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-blue-500 px-6 py-4 text-left border  border-slate-300"
                    >
                      Gra Date
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-blue-500 px-6 py-4 text-left border  border-slate-300"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
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
                        {request?.unversity}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-3 whitespace-nowrap border border-slate-300 text-center">
                          {request.degree}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-3 whitespace-nowrap border border-slate-300 text-center">
                          {request.loan_amount}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-3 whitespace-nowrap border border-slate-300 text-center">
                      <span className="border-r- border-slate-600 pr-1">
                        {
                          request?.resumption_date?.split(
                            "T"
                          )[0]
                        }
                      </span>{" "}
                      <span className="pl-1 font-mono font-bold">
                        {request?.resumption_date &&
                          timeFormatter(
                            new Date(
                              request.resumption_date?.split(".")[0]?.replace("T"," ")
                            )
                          )}
                      </span>
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-3 whitespace-nowrap border border-slate-300 text-center">
                      <span className="border-r- border-slate-600 pr-1">
                        {
                          request?.graduation_date?.split(
                            "T"
                          )[0]
                        }
                      </span>{" "}
                      <span className="pl-1 font-mono font-bold">
                        {request?.graduation_date &&
                          timeFormatter(
                            new Date(
                              request.graduation_date?.split(".")[0]?.replace("T"," ")
                            )
                          )}
                      </span>
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
                </tbody>
              </table>
            </div>
        
          </>
      </div>
     
    </>
  );
}
export default RequestTable;
