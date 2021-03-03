import React,{ useState,useEffect } from "react"
import qs from 'qs'
import { clearObject,useMount,useDebounce } from 'utils/index'
import { SerachPanel } from "./serach-pannel"
import { List } from './list'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
    const [list,setList] = useState([])
    const [param,setParam] = useState({
        name:'',
        personId:''
    })
    const [users,setUsers] = useState([]) 
    const debounceValue = useDebounce(param,500)
    
    useEffect(() => {
      fetch(`${apiUrl}/projects?${qs.stringify(clearObject(debounceValue))}`).then(async response=>{
          if (response.ok) {
            setList(await response.json())
          }
      })
    }, [debounceValue])

    useMount(()=>{
      fetch(`${apiUrl}/users`).then(async response=>{
        if (response.ok) {
          setUsers(await response.json())
        }
      })
    })

    return <div>
        <SerachPanel users={users} param={param} setParam={setParam}></SerachPanel>
        <List users={users} list={list}></List>
    </div>
}