import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

import { useCountriesContext } from '../../../../../app/contexts/countries'
import Image from 'next/image'

interface CountrySelectProps {
    value: string
    onChange: (value: string) => void
}

export default function CountrySelect({ value, onChange }: CountrySelectProps) {
    const { countries } = useCountriesContext()

    const selected = countries?.find(c => c.code === value)

    return (
        <div className="w-full">
            <Listbox value={selected?.code} onChange={onChange}>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default text-left sm:text-sm">
                        {selected && <div className='flex items-center'>
                            <div className='mr-[5.55px]'>
                                <div className="w-[19.42px] h-[19.42px]">
                                    {selected.code && <Image fill src={`/images/flags/1x1/${selected.country.toLowerCase()}.svg`} alt="Flag" className="rounded-full" />}
                                </div>
                            </div>

                            <div className='mr-[9.59px] uppercase'>{selected.country}</div>

                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronDownIcon className="h-5 w-5 text-secondary-400" aria-hidden="true" />
                            </span>
                        </div>}
                    </Listbox.Button>

                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute mt-1 max-h-60 max-w-[200px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {countries?.filter(c => c.code !== value).map((country, index) => (
                                <Listbox.Option key={index} className={({ active }) => `relative cursor-default select-none p-2 ${active ? 'bg-primary-100 text-primary-900' : 'text-secondary-900'}`} value={country.code}>
                                    {({ selected }) => (
                                        <>
                                            <div className="flex items-center">
                                                <div className='mr-[5.55px]'>
                                                    <div className="w-[19.42px] h-[19.42px]">
                                                        {country.code && <Image fill src={`/images/flags/1x1/${country.country.toLowerCase()}.svg`} alt="Flag" className="rounded-full" />}
                                                    </div>
                                                </div>

                                                <div className={`truncate ${selected ? 'font-medium' : 'font-normal'}`}>{country.name}</div>
                                            </div>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
