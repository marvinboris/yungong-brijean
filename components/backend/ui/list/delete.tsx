import { Dialog, Transition } from "@headlessui/react";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ComponentProps, Fragment, useState } from "react";

import Button from "../form/button";

type DeleteProps = ComponentProps<'div'> & {
    deleteAction: () => void
}

export default function Delete({ deleteAction, children }: DeleteProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    
    return <div>
        <div className='inline-block' onClick={() => setIsOpen(true)}>{children}</div>

        <Transition show={isOpen} as={Fragment}>
            <Dialog onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex flex-col items-center justify-center max-h-screen pb-6 pt-14 overflow-auto">
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
                </Transition.Child>

                {/* Full-screen container to center the panel */}
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                    <div className="container">
                        <Dialog.Panel className="mx-auto max-w-4xl w-full relative rounded-[40.8836px] bg-white text-secondary-700 pt-[44px] md:pt-[51px] pb-[50px] md:pb-[66px]">
                            <div className="absolute xl:translate-x-full -translate-y-full xl:-translate-y-1/2 top-0 right-0 xl:-right-10">
                                <div onClick={() => setIsOpen(false)} className="xl:w-20 xl:h-20 rounded-full inline-flex items-center justify-center cursor-pointer xl:bg-white/20"><div><XMarkIcon className='w-8 xl:w-10 text-white' /></div></div>
                            </div>

                            <div className='text-center space-y-4'>
                                <p>Are you sure you want to delete this item?</p>

                                <div className="flex items-center justify-center space-x-4">
                                    <Button color="red" onClick={() => {
                                        deleteAction()
                                        setIsOpen(false)
                                    }} icon={TrashIcon}>Delete</Button>{' '}
                                    <Button color="yellow" onClick={() => setIsOpen(false)} icon={XMarkIcon}>Close</Button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    </div>
};