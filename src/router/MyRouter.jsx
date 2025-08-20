import React from 'react'
import { ListUser } from './listRouter'
import { Route, Routes } from 'react-router'

function MyRouter() {
    return (
        <Routes>
            {ListUser.map(val=> <Route key={val.id} path={val.path} element={val.element}/>)}
        </Routes>
    )
}

export default MyRouter