import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { formatCurrency } from "lib/utils";


export default function ReviewModal({ open, setOpen, setClose, property }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between mb-4">
                        <Dialog.Title className="text-lg  text-gray-900 font-normal">
                          Property summary
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={setClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon
                              className="h-6 w-6 text-red-500"
                              aria-hidden="true"
                              onClick={setClose}
                            />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex flex-col space-y-1 justify-between mb-3">
                          <div>
                            <span className="text-sm md:text-lg text-slate-700">
                              Name :
                            </span>
                            <strong className="ml-2 text-sm md:text-lg text-slate-800 font-medium">
                              {property?.name}
                            </strong>
                          </div>
                          <div>
                            <span className="text-sm md:text-lg text-slate-700">
                              Address :
                            </span>
                            <strong className="ml-2 text-sm md:text-lg font-semibold first-letter:capitalize">
                              {property?.address}
                            </strong>
                          </div>
                          <div>
                            <span className="text-sm md:text-lg text-slate-700">
                              Type :
                            </span>
                            <strong className="ml-2 text-sm md:text-lg font-semibold">
                              {property?.type}
                            </strong>
                          </div>
                          <div>
                            <span className="text-sm md:text-lg text-slate-700">
                              Location :
                            </span>
                            <strong className="ml-2 text-sm md:text-lg font-semibold">
                              {property?.country}
                            </strong>
                          </div>
                          <div>
                            <span className="text-sm md:text-lg text-slate-700">
                              Price:
                            </span>
                            <strong className="ml-2 text-sm md:text-lg font-semibold">
                            {property?.price
                              ? formatCurrency(property?.price)
                              : ""}
                            </strong>
                          </div>
                          <div>
                            <span className="text-sm md:text-lg text-slate-700">
                              bedroom:
                            </span>
                            <strong className="ml-2 text-sm md:text-lg font-semibold">
                            {property?.bedrooms}
                            </strong>
                          </div>
                          <div>
                            <span className="text-sm md:text-lg text-slate-700">
                              bathroom:
                            </span>
                            <strong className="ml-2 text-sm md:text-lg font-semibold">
                            {property?.bathrooms}
                            </strong>
                          </div>
                          <div>
                            <span className="text-sm md:text-lg text-slate-700">
                              Area:
                            </span>
                            <strong className="ml-2 text-sm md:text-lg font-semibold">
                            {property?.surface}
                            </strong>
                          </div>
                          <div>
                            <span className="text-sm md:text-lg text-slate-700">
                              Desc:
                            </span>
                            <strong className="ml-2 text-sm md:text-lg font-semibold">
                            {property?.description}
                            </strong>
                          </div>
                        </div>
                        <div className="flex justify-center items-center h-full mt-4 mb-4">
                          <img src={property?.image} alt="not exist"  className="h-full"/>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
