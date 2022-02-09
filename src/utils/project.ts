import { useEffect } from "react"
import { useHttp } from "./http"
import { useAsync } from "./useAsync"
import { clearObject } from "./index"
import { Project } from "screens/project-list/list"


export const useProject = (param?:Partial<Project>) => {
    const client = useHttp()
    const {run,...result} = useAsync<Project[]>()
    useEffect(()=>{
        run(client('projects',{data: clearObject(param || {})}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[param])

    return result
}

export const useEditProject = () => {
    const {run,...asyncResult} = useAsync()
    const client = useHttp()
    const mutate = (params:Partial<Project>) => {
        return run(client(`projects/${params.id}`,{data:params,method:'PATCH'}))
    }
    return {
        mutate,
        ...asyncResult
    }
}

export const useAddProject = () => {
    const {run,...asyncResult} = useAsync()
    const client = useHttp()
    const mutate = (params:Partial<Project>) => {
        return run(client(`projects/${params.id}`,{data:params,method:'POST'}))
    }
    return {
        mutate,
        ...asyncResult
    }
}