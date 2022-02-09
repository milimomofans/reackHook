import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { EpicScreen } from '../Epic'
import { KanbanScreen } from '../Kanban'

export const ProjectScreen = () => {
    return <div>
        <h1>ProjectScreen</h1>
        <Link to={window.location.pathname + '/kanban'}>看板</Link>
        <Link to={window.location.pathname +'/epic'}>任务组</Link>
        <Routes>
            <Route path={'/kanban'} element={<KanbanScreen/>}/>
            <Route path={'/epic'} element={<EpicScreen />} />
        </Routes>
    </div>
}