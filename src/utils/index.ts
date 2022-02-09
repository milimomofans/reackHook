import { useEffect,useRef,useState } from 'react'
export const isFalsy = (value:unknown) => value === 0 ? false : !value

export const isVoid = (value:unknown) => value === undefined || value === null || value === ''

export const clearObject = (object:{[key:string]:unknown}) => {
    const result = {...object}
    Object.keys(object).forEach(key => {
        if (isVoid(object[key]) ) {
            delete result[key]
        }
    })
    return result
} 

export const useMount = (callback:()=>void) => {
    useEffect(() => {
       callback()
    }, [callback])
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

export const useDocumentTitle = (title:string,keepOnUnmount:boolean = true) => {
    const oldTitle = useRef(document.title).current;
    useEffect(()=>{
        document.title = title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[title])

    useEffect(()=>{
        console.log(oldTitle,'------------------oldtitle')
        return () => {
            if (!keepOnUnmount) {
                document.title = oldTitle
            }
        }
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[keepOnUnmount,oldTitle])
    
}

export const ResetRoute = () => window.location.href = window.location.origin