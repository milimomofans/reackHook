import { useEffect } from "react"
import { useHttp } from "./http"
import { useAsync } from "./useAsync"
import { clearObject } from "./index"

interface Project {
    id:string
    name:string
    personId:string
    pin:string
    organization:string
    created:number
}

export const useProject = (param?:Partial<Project>) => {
    const client = useHttp()
    const {run,...result} = useAsync<Project[]>()
    useEffect(()=>{
        run(client('projects',{data: clearObject(param || {})}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[param])

    return result
}