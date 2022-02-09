/**@jsxImportSource @emotion/react */
import { Input, Form } from "antd"
// import {jsx} from '@emotion/react'
import React from 'react'
import { Project } from "./list"
import { UserSelect } from "components/user-select"


export interface User {
    id:number
    name:string
    email:string
    title:string
    organization:string
    token:string
}

interface SerachPanelProps {
    users:User[],
    param:Partial<Pick<Project,'name' | 'personId'>>
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
            {/* <IdSelect 
                value={param.personId} 
                options={users}
                onChange={(value)=>{
                    setParam({
                        ...param,
                        personId:value
                    })
                }}
                defaultOptionName="负责人"
            >
            </IdSelect> */}
            <UserSelect 
                value={param.personId}
                onChange={(value)=>{
                    setParam({
                        ...param,
                        personId:value
                    })
                }}
                defaultOptionName={"负责人"}
            />
        </Form.Item>
    </Form>
}