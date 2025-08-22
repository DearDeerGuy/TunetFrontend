import React from 'react'
import { ListAuthorizedUser, ListUser } from './ListRouter'
import { Route, Routes } from 'react-router'
import { useSelector } from 'react-redux'

function MyRouter() {
    const user=useSelector(state=>state.User)
    return (
        <Routes>
            {user.token?
                ListAuthorizedUser.map(val=> <Route key={val.id} path={val.path} element={val.element}/>)
                :ListUser.map(val=> <Route key={val.id} path={val.path} element={val.element}/>)
            }
        </Routes>
    )
}

export default MyRouter