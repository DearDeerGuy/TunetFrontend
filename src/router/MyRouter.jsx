import React, { useEffect, useState } from 'react'
import { ListAuthorizedUser, ListUser } from './ListRouter'
import { Route, Routes } from 'react-router'
import { useSelector } from 'react-redux'

function MyRouter() {
    const [load,setLoad] = useState(true);
    const [token,setToken] = useState({token:JSON.parse(localStorage.getItem('user'))?.token,key:"localStorage"});
    const user=useSelector(state=>state.User)
    useEffect(()=>{
        if(load){
            setLoad(false);
            return;
        }
        setToken({token:user.token,key:"store"});
    },[user])
    return (
        <Routes key={token.key}>
            {token.token?
                ListAuthorizedUser.map(val=> <Route key={val.id} path={val.path} element={val.element}/>)
                :ListUser.map(val=> <Route key={val.id} path={val.path} element={val.element}/>)
            }
        </Routes>
    )
}

export default MyRouter