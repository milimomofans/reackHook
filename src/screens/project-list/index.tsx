import React,{ useState,useEffect } from "react"
import { clearObject,useMount,useDebounce } from 'utils/index'
import { SerachPanel } from "./serach-pannel"
import {useHttp} from 'utils/http'
import { List } from './list'


export const ProjectListScreen = () => {
    const [list,setList] = useState([])
    const [param,setParam] = useState({
        name:'',
        personId:''
    })
    const [users,setUsers] = useState([]) 
    const debounceValue = useDebounce(param,500)
    const client = useHttp()

    useEffect(() => {
      client("projects", { data: clearObject(debounceValue) }).then(setList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceValue])

    useMount(()=>{
      client("users").then(setUsers);
    })

    return <div>
        <SerachPanel users={users} param={param} setParam={setParam}></SerachPanel>
        <List users={users} list={list}></List>
    </div>
}