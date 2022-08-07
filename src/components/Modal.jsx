import { Fragment, } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";


export default function Modal({ open, setOpen, setClose, text, children }) {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setOpen}>
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
                                            <div className="flex items-start justify-between pb-4 border-b-2 divide-y divide-gray-200">
                                                <Dialog.Title className="text-lg font-thin text-gray-900 text-center font-mono">
                                                    {" "}
                                                    {text}{" "}
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={setClose}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XIcon
                                                            className="h-6 w-6"
                                                            aria-hidden="true"
                                                            onClick={setClose}
                                                        />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root border-b">
                                                    {children}
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
