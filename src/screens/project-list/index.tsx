import React,{ useState } from "react"
import { useDebounce, useDocumentTitle } from 'utils/index'
import { SerachPanel } from "./serach-pannel"
import { List } from './list'
import styled from "@emotion/styled"
import { Typography } from "antd"
import { useProject } from "utils/project"
import { useUsers } from "utils/user"


export const ProjectListScreen = () => {
    const [param,setParam] = useState({
        name:'',
        personId:''
    })
   
    // const [users,setUsers] = useState([]) 
    const debounceValue = useDebounce(param,500)
    const {isLoading,data:list,error} = useProject(debounceValue)
    const {data:users} = useUsers()
    useDocumentTitle('项目列表',false)
    return <Container>
        
        <h1>项目列表</h1>
        <SerachPanel users={users || []} param={param} setParam={setParam}></SerachPanel>
        {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
        <List users={users || []} dataSource={list || []} loading={isLoading}></List>
    </Container>
}

const Container = styled.div`
  padding:3.2rem;
`