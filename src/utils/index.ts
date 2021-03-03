import { useEffect,useState } from 'react'
export const isFalsy = (value:unknown) => value === 0 ? false : !value

export const clearObject = (object:Object) => {
    const result = {...object}
    Object.keys(object).forEach(key => {
        // @ts-ignore
        if (isFalsy(object[key]) ) {
            // @ts-ignore
            delete result[key]
        }
    })
    return result
} 

export const useMount = (callback:()=>void) => {
    useEffect(() => {
       callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export const useDebounce = <V>(value:V,delay?:number):V => {
    const [debouncedValue,setDebouncedValue] = useState(value)
    
    useEffect(() => {
       // 每次在value变化以后，设置一个定时器
       const timeout = setTimeout(() => {
           setDebouncedValue(value)
       }, delay);
       // 每次在上一个useEffect处理完以后再运行
       return () => clearTimeout(timeout)
    }, [value,delay])

    return debouncedValue
}


export const useArray = <T>(initialArray:T[]) => {
    const [value,setValue] = useState(initialArray)
    
    return {
        value,
        setValue,
        add:(item:T)=>{setValue([...value,item])},
        removeIndex:(index:number)=>{
            const copy = [...value]
            copy.splice(index,1)
            return setValue(copy)
        },
        clear:()=>{setValue([])}
    }
}