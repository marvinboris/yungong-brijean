import React, { Fragment, ReactNode, useState } from "react";

import { htmlEntities } from "../../../../../app/helpers/utils";
import ContentType from "../../../../../app/types/content";
import Select from "../../../../frontend/ui/form/select";

import TextArea from "../../../../frontend/ui/form/text-area";

type StringObject = { [key: string]: string | string[] | StringObject }
type AddParams = { regex: string, action: (item: string | StringObject) => ReactNode }[]

const recursiveDeepness = (paramItem: StringObject, paramName: string, paramId: string, paramValue: string | StringObject, paramDeepness: string[], paramPrepends: AddParams = [], paramAppends: AddParams = []): ReactNode[] => Object.keys(paramItem).map(item => {
    const mainItem = paramItem[item];
    const mainName = `${paramName}[${item}]`;
    const mainId = `${paramId}-${item}`;
    const mainValue = (paramValue as StringObject)[item];
    const mainDeepness = paramDeepness.concat(item);
console.log('mainValue', mainValue);

    let prepend;
    const findPrepend = paramPrepends.find(el => (new RegExp(el.regex.replace(/\[/g, '\\[').replace(/\]/g, '\\]'))).test(mainName));
    prepend = !findPrepend ? null : findPrepend.action(mainItem as string);

    let append;
    const findAppend = paramAppends.find(el => (new RegExp(el.regex.replace(/\[/g, '\\[').replace(/\]/g, '\\]'))).test(mainName));
    append = !findAppend ? null : findAppend.action(mainItem as string);

    return typeof mainItem === 'string' ? <Fragment key={Math.random() + mainName}>
        {prepend}
        <TextArea inputSize="sm" key={`${Math.random() + mainName}-input`} name={mainName} id={mainId} label={htmlEntities(mainItem) as string} placeholder={htmlEntities(mainItem) as string} defaultValue={mainValue as string} />
        {append}
    </Fragment> : recursiveDeepness(mainItem as StringObject, mainName, mainId, mainValue as string | StringObject, mainDeepness, paramPrepends, paramAppends);
});

type CmsType = any
interface WithPagesProps {
    cmsExample: CmsType
    cmsValue: CmsType
    part: 'auth' | 'backend' | 'frontend'
}

const capitalize = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

export const WithPages = ({ cmsExample, cmsValue, part }: WithPagesProps) => {
    const [activeSection, setActiveSection] = useState(Object.keys(cmsExample).sort()[0]);

    const sectionsOptions = Object.keys(cmsValue).map(key => {
        let name = capitalize(key.split('_').join(' '));
        if (Object.keys(cmsExample.pages).find(k => k === key)) name = `Page - ${name}`;

        return { key, name };
    }).sort((a, b) => a.name.localeCompare(b.name)).map(({ key, name }) => {
        const id = key;

        return <option key={id} value={id}>{name}</option>;
    });

    const prefix = part;
    const prefixId = part;

    const resourceDeepness = (resource: string, paramPrepends: AddParams = [], paramAppends: AddParams = []) => {
        const resourceItem = cmsExample[resource];
        const resourceName = `${prefix}[${resource}]`;
        const resourceId = `${prefixId}-${resource}`;
        const resourceValue = cmsValue[resource];
        const resourceDeepness = [resource];
        return recursiveDeepness(resourceItem, resourceName, resourceId, resourceValue, resourceDeepness, paramPrepends, paramAppends);
    };

    const nonPagesKeys = Object.keys(cmsExample).filter(key => key !== 'pages');
    const nonPagesContent = nonPagesKeys.map(item => <div key={`${Math.random()}${prefix}[${item}]`} className={`md:col-span-2 xl:col-span-3 gap-y-2 gap-x-4 grid md:grid-cols-2 xl:grid-cols-3 pt-4${item === activeSection ? "" : " hidden"}`}>
        {resourceDeepness(item)}
    </div>);

    const pagesResourceDeepness = (resource: string, paramPrepends = [], paramAppends = []) => {
        const resourceItem = cmsExample.pages[resource];
        const resourceName = `${prefix}[pages][${resource}]`;
        const resourceId = `${prefixId}-pages-${resource}`;
        const resourceValue = cmsValue[resource];
        const resourceDeepness = [resource];
        return recursiveDeepness(resourceItem, resourceName, resourceId, resourceValue, resourceDeepness, paramPrepends, paramAppends);
    };

    const pagesKeys = Object.keys(cmsExample.pages);
    const pagesContent = pagesKeys.map(item => <div key={`${Math.random()}${prefix}[pages][${item}]`} className={`md:col-span-2 xl:col-span-3 gap-y-2 gap-x-4 grid md:grid-cols-2 xl:grid-cols-3 pt-4${item === activeSection ? "" : " hidden"}`}>
        {pagesResourceDeepness(item)}
    </div>);

    return <>
        <div>
            <Select inputSize="sm" name="section" label={'Section'} onChange={e => setActiveSection(e.target.value)} value={activeSection}>
                {sectionsOptions}
            </Select>
        </div>

        <div className='md:col-span-2 xl:col-span-3 py-4'>
            <hr />
        </div>

        {nonPagesContent}
        {pagesContent}
    </>
};