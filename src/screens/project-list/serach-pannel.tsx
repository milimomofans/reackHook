import React from "react"

export interface User {
    id:string
    name:string
    email:string
    title:string
    organization:string
    token:string
}

interface SerachPanelProps {
    users:User[],
    param:{
        name:string,
        personId:string
    },
    setParam:(param:SerachPanelProps['param']) => void
}

export const SerachPanel = ({param,setParam,users}:SerachPanelProps) => { 
    return <form action="">
        <input type="text" value={param.name} onChange={(evt)=>{
            setParam({
                ...param,
                name:evt.target.value
            })
        }} />
        <select value={param.personId} onChange={(evt)=>{
            setParam({
                ...param,
                personId:evt.target.value
            })
        }}>
            {
                users.map(user=>{
                    return (
                        <option value={user.id} key={user.id}>{user.name}</option>
                    )
                })
            }
        </select>
    </form>
}