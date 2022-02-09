import { useCallback } from "react"
import { useHttp } from "./http"
import { useMount } from "./index"
import { useAsync } from "./useAsync"
import { User } from "screens/project-list/serach-pannel"


export const useUsers = () => {
    const {run,...result} = useAsync<User[]>()
    const client = useHttp()
    
    // useMount(()=>{

    //     run(client('users'))
    // })

    useMount(
        useCallback(()=>{
            run(client('users'))
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])
    )

    return result
}