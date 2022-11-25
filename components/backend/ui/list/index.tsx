import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ChangeEvent, ComponentProps, ReactNode, useEffect, useState } from "react";

import { useContentContext } from "../../../../app/contexts/content";
import { classNames } from "../../../../app/helpers/utils";

import Button from "../form/button";
import Input from "../form/input";

let timeout: NodeJS.Timeout | null;

type ListProps = {
    total: number
    title: string
    subtitle?: string
    data: string
    add: string
    loading?: boolean
    link: string
    fields: { key: string, name: string, className?: string }[]
    array: { [key: string]: ReactNode }[]

    icon: (props: ComponentProps<'svg'>) => JSX.Element
    get: (page: number, show: string | number, search: string) => void
}

export default function List({ total, get, icon: Icon, data, title, subtitle, fields, array, add, link, loading }: ListProps) {
    const { content } = useContentContext()
    const { cms: { backend: { components: { list: cms } } } } = content!

    const [page, setPage] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    const [pageFirst, setPageFirst] = useState(1)
    const [pageSecond, setPageSecond] = useState(2)
    const [pageLast, setPageLast] = useState(3)

    const [search, setSearch] = useState('')
    const [show, setShow] = useState<string | number>(10)

    useEffect(() => {
        if (show !== 'All') setPageNumber(Math.ceil(total / +show))
        else setPageNumber(1)
    }, [show, total])

    const inputChangedHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        firstPageHandler();
        if (name === 'show') {
            get(page, value, search);
            return setShow(value)
        }
        if (name === 'search') {
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                get(page, show, value);
                clearTimeout(timeout!);
            }, 1000);
            return setSearch(value)
        }
    }

    const previousPageHandler = () => {
        if (page <= 1) return;
        pageChangeHandler(page - 1);
    }

    const nextPageHandler = () => {
        const lastPage = pageNumber;
        if (page >= lastPage) return;
        pageChangeHandler(page + 1);
    }

    const firstPageHandler = () => {
        if (page <= 1) return;
        pageChangeHandler(1);
    }

    const lastPageHandler = () => {
        const lastPage = pageNumber;
        if (page >= lastPage) return;
        pageChangeHandler(lastPage);
    }

    const pageChangeHandler = (page: number) => {
        const lastPage = pageNumber;
        let pageFirst;
        if (page < 3) pageFirst = 1;
        else if (page === lastPage) pageFirst = lastPage - 2;
        else pageFirst = page - 1;
        const pageSecond = pageFirst + 1, pageLast = pageFirst + 2;
        setPage(page)
        setPageFirst(pageFirst)
        setPageSecond(pageSecond)
        setPageLast(pageLast)
        get(page, +show, search)
    }

    const onClick = (e: Event) => {
        e.preventDefault();

        const target = e!.target! as EventTarget & HTMLAnchorElement

        const url = target.href;
        exportData(url);
    };

    const exportData = async (url: string) => {
        const format = url.split('/')[url.split('/').length - 1];
        const name = `${title}.${format}`;
        const token = localStorage.getItem('token');

        try {
            const formData = new FormData();

            formData.append('data', data);
            formData.append('name', name);

            const res = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                body: formData,
                headers: { 'x-auth-token': token! }
            });

            const resData = await res.blob();

            const downloadLink = URL.createObjectURL(resData);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = downloadLink;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(downloadLink);
        } catch (err) {
            console.log(err)
        }
    }

    const modulo = total % +show;
    const entries = total === 0 ? total : (modulo !== 0 ? modulo : show);

    return <>
        <input type="hidden" id="table-page" value={page} />
        <input type="hidden" id="table-show" value={show} />
        <input type="hidden" id="table-search" value={search} />

        <div className="bg-white rounded-[30px] py-8 px-[38.36px] shadow-2xl mb-[25px]">
            <div className="mb-[30.89px] flex flex-wrap items-center justify-between">
                <div className='order-2 md:order-1 space-y-[4.63px]'>
                    <div className="font-bold md:font-medium text-[25px] md:text-[22.21px]">{title}</div>

                    {subtitle && <div className="text-[12.96px]">{subtitle}</div>}

                    <div className="w-[30.24px] h-[6.5732px] rounded-xl bg-yellow" />
                </div>

                <div className="order-1 md:order-2 flex items-center ml-auto md:ml-0 mb-8 md:mb-0">
                    <div className="hidden md:flex items-center h-12 bg-secondary-500/[0.06] rounded-[6.5732px]">
                        <div className="flex items-center divide-x-[0.5px] divide-x-secondary-300 text-sm">
                            <div className="px-3 h-[39px] flex items-center justify-center">{cms.show}</div>

                            <div className="h-[39px] flex items-center justify-center relative">
                                <select name="show" id="show" onChange={inputChangedHandler} value={show} className='text-sm font-bold bg-transparent outline-none border-0 pl-3 pr-8'>
                                    <option value="5">05</option>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="All">{cms.all}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='hidden md:block mr-[12.83px] ml-4'><Input type="search" name="search" icon={MagnifyingGlassIcon} onChange={inputChangedHandler} value={search} placeholder={cms.search} /></div>

                    <div className='space-x-3 md:space-x-0 flex md:block'>
                        <div className='md:hidden'><Input type="search" name="search" icon={MagnifyingGlassIcon} onChange={inputChangedHandler} value={search} placeholder={cms.search} /></div>
                        {add && <div><Link href={link}><Button icon={PlusIcon} color='yellow'><span className="hidden md:inline">{add}</span><span><Icon className="w-8 inline-block md:hidden" /></span></Button></Link></div>}
                    </div>
                </div>
            </div>

            <div className="overflow-auto pb-5">
                <table className="border-collapse table-auto w-full text-sm">
                    <thead>
                        <tr className='relative z-0 after:absolute after:inset-0 after:rounded-lg after:bg-secondary-500/10 after:-z-10'>
                            <th className="font-bold pt-[12.49px] pb-[10.98px] first:pl-[14.64px] pl-1.5 last:pr-[14.64px] pr-1.5 text-left">SL</th>
                            {fields.map(({ name }, i) => <th key={`table-thead-th-${i}`} className="font-bold pt-[12.49px] pb-[10.98px] first:pl-[14.64px] pl-1.5 last:pr-[14.64px] pr-1.5 text-left">{name}</th>)}
                        </tr>
                    </thead>

                    <tbody className="bg-white dark:bg-secondary-800">
                        {array && array.map((row, i) => <tr key={`table-tbody-tr-${i}`} className='group'>
                            <td className="group-last:border-0 border-b border-secondary-100 dark:border-secondary-700 py-3 first:pl-[14.64px] pl-1.5 last:pr-[14.64px] pr-1.5">{(show !== 'All' ? (page - 1) * +show : 0) + i + 1}</td>
                            {fields.map(({ key, className }, j) => <td key={`table-tbody-tr-${i}-td-${j}`} className={classNames("group-last:border-0 border-b border-secondary-100 dark:border-secondary-700 py-3 first:pl-[14.64px] pl-1.5 last:pr-[14.64px] pr-1.5 truncate", className || 'max-w-[250px]')}>{row[key]}</td>)}
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>

        <div className="flex items-center justify-between">
            <div>{cms.showing} {show === 'All' ? total : (+page < pageNumber) ? show : entries} {cms.from} {total} {total > 1 ? cms.entries.plural : cms.entries.singular}.</div>

            <div className="pt-2 d-flex justify-content-end">
                {show !== "All" && <div className="inline-flex text-sm space-x-2.5 items-center p-1 rounded-3xl bg-white border border-yellow/40 relative z-0 overflow-hidden after:absolute after:inset-0 after:bg-yellow/20 after:-z-10">
                    {page !== 1 && <>
                        <div className='w-7 h-7 cursor-pointer rounded-full flex items-center justify-center bg-primary text-white' onClick={firstPageHandler}><ChevronDoubleLeftIcon className='w-3.5' /></div>
                        <div className='w-7 h-7 cursor-pointer rounded-full flex items-center justify-center bg-yellow text-white' onClick={previousPageHandler}><ChevronLeftIcon className='w-3.5' /></div>
                    </>}

                    <div className={classNames("cursor-pointer font-bold w-7 text-center", page === pageFirst ? "text-yellow" : "opacity-30")} onClick={() => pageChangeHandler(pageFirst)}>{pageFirst}</div>

                    {pageNumber > 1 && <>
                        <div className={classNames("cursor-pointer font-bold w-7 text-center", page === pageSecond ? "text-yellow" : "opacity-30")} onClick={() => pageChangeHandler(pageSecond)}>{pageSecond}</div>

                        {pageNumber > 2 && <div className={classNames("cursor-pointer font-bold w-7 text-center", page === pageLast ? "text-yellow" : "opacity-30")} onClick={() => pageChangeHandler(pageLast)}>{pageLast}</div>}

                        {page !== pageNumber && <>
                            <div className='w-7 h-7 cursor-pointer rounded-full flex items-center justify-center bg-yellow text-white' onClick={nextPageHandler}><ChevronRightIcon className='w-3.5' /></div>
                            <div className='w-7 h-7 cursor-pointer rounded-full flex items-center justify-center bg-primary text-white' onClick={lastPageHandler}><ChevronDoubleRightIcon className='w-3.5' /></div>
                        </>}
                    </>}
                </div>}
            </div>
        </div>
    </>
}
