import { useMemo } from 'react'
import {URLSearchParamsInit, useSearchParams} from 'react-router-dom'
import { clearObject } from './index'

// export const useUrlQueryParam = <K extends string>(keys:K[]) => {
//     const [serachParams,setSerachParam] = useSearchParams()
//     return [
//         keys.reduce((prev:K, key:K)=>{
//             return {...prev,[key]:serachParams.get(key) || ''}
//         },{} as {[key in K]:string}),
//         setSerachParam
//     ] as const
// }
export const useUrlQueryParam = <K extends string>(keys:K[]) => {
    const [serachParams,setSerachParam] = useSearchParams()
    return [
        useMemo(()=>{
            return keys.reduce((prev:{[key in K]:string} ,key:K)=>{
                return {...prev,[key]:serachParams.get(key) || ''}
            },{} as { [key in K]:string})
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },[serachParams]),
        (params:Partial<{ [key in K]:unknown }>) => {
            const o = clearObject({...Object.fromEntries(serachParams),...params}) as URLSearchParamsInit
            return setSerachParam(o)
        } 
    ] as const
}