import { useHttp } from "./http"
import { useMount } from "./index"
import { useAsync } from "./useAsync"

interface User {
    id:string
    name:string
    email:string
    title:string
    organization:string
    token:string
}

export const useUsers = () => {
    const {run,...result} = useAsync<User[]>()
    const client = useHttp()
    
    useMount(()=>{
        run(client('users'))
    })
    return result
}