import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import {User} from './serach-pannel'
// react-router和react-router-dom的关系,类似于react和reacst-dom/react-native/react-vr...
import {Link} from 'react-router-dom'
import { Pin } from 'components/pin'
import { useEditProject } from 'utils/project'

export interface Project {
    id:number
    name:string
    personId:number
    pin:boolean
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
    const {mutate} = useEditProject()
    const pinProject = (id:number) => (pin:boolean) => mutate({id,pin})
    return <Table 
        pagination={false} 
        columns={[
        {
            title:<Pin checked={true} disabled={true} />,
            render(value,project){
                return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}/>
            }
        },
        {
            title:'名称',
            // dataIndex:'name',
            sorter:(a,b)=> { return a.name.localeCompare(b.name) },
            key:'name',
            render(value,project) {
                return <Link to={`projects/${String(project.id)}`}>{project.name}</Link>
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