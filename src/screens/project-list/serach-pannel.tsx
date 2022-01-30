/**@jsxImportSource @emotion/react */
import { Input, Select, Form } from "antd"
// import {jsx} from '@emotion/react'
import React from 'react'


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
    return <Form css={{marginBottom:'2rem'}} layout={"inline"} >
        <Form.Item>
            <Input type="text" value={param.name} onChange={(evt)=>{
                setParam({
                    ...param,
                    name:evt.target.value
                })
            }} />
        </Form.Item>
        <Form.Item>
            <Select value={param.personId} onChange={(value)=>{
                setParam({
                    ...param,
                    personId:value
                })
            }}>
                <Select.Option value="">负责人</Select.Option>
                {
                    users.map(user=>{
                        return (
                            <Select.Option value={user.id} key={user.id}>{user.name}</Select.Option>
                        )
                    })
                }
            </Select>
        </Form.Item>
    </Form>
}