import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

import { useLanguageContext } from '../../../../app/contexts/language'

import LanguageType from '../../../../app/types/language'
import Image from 'next/image'

export default function LanguageSelect() {
    const { language, setLanguage, languages } = useLanguageContext()

    const selected = language!

    const changeLanguage = (language: LanguageType) => {
        setTimeout(() => {
            setLanguage(language)
        }, 100);
    }

    return language === null ? <></> : (
        <div className="w-full">
            <Listbox value={selected} onChange={changeLanguage}>
                <div className="relative">
                    <Listbox.Button className="relative w-full cursor-default text-left">
                        {selected && <div className="flex items-center rounded-full py-[5px] pl-[6px] w-[108px] cursor-pointer bg-secondary-100">
                            <div className='mr-2'>
                                <div className="w-[23px] h-[23px] rounded-full">
                                    <Image width={1920} height={1920} src={`/images/flags/1x1/${selected.flag}.svg`} alt="Flag" className="image-cover rounded-full" />
                                </div>
                            </div>

                            <div className="font-medium text-[10.3px] mr-3">{selected.name}</div>

                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronDownIcon className="h-5 w-5 text-secondary-400" aria-hidden="true" />
                            </span>
                        </div>}
                    </Listbox.Button>

                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {languages?.filter(l => l.abbr !== selected.abbr).map((l, index) => (
                                <Listbox.Option key={index} className={({ active }) => `relative cursor-default select-none p-2 ${active ? 'bg-primary-100 text-primary-900' : 'text-secondary-900'}`} value={l}>
                                    {({ selected }) => (<>
                                        <div className="flex items-center">
                                            <div className='mr-[5.55px]'>
                                                <div className="w-[19.42px] h-[19.42px]">
                                                    <Image width={1920} height={1920} src={`/images/flags/1x1/${l.flag}.svg`} alt="Flag" className="image-cover rounded-full" />
                                                </div>
                                            </div>

                                            <div className={`truncate text-[10.3px] ${selected ? 'font-medium' : 'font-normal'}`}>{l.name}</div>
                                        </div>
                                        {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>)}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
