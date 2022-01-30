import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import {User} from './serach-pannel'
// react-router和react-router-dom的关系,类似于react和react-dom/react-native/react-vr...
import {Link} from 'react-router-dom'

interface Project {
    id:string
    name:string
    personId:string
    pin:string
    organization:string
    created:number
}

// interface ListProps {
//     list:Project[]
//     users:User[]
// }

interface ListProps extends TableProps<Project> {
    users:User[]
}

export const List = ({users,...props}:ListProps) => {
    return <Table 
        pagination={false} 
        columns={[{
            title:'名称',
            // dataIndex:'name',
            sorter:(a,b)=> { return a.name.localeCompare(b.name) },
            key:'name',
            render(value,project) {
                return <Link to={String(project.id)}>{project.name}</Link>
            }
        },{
            title:'部门',
            dataIndex:'organization',
            key:'organization'
        },
        {
            title:'负责人',
            render(value,project){
                return <span>
                    {users.find( user => user.id === project.personId )?.name || '未知'}
                </span>
            },
            key:'personid'
        },{
            title:'创建时间',
            render(value,project){
                return <span>
                    {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
                </span>
            },
            key:'created'
        }]} 
        rowKey="id"
        {...props}
    />
}