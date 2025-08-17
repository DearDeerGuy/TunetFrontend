import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ListUser } from './listRouter'

function MyRouter() {
    const router = createBrowserRouter(ListUser)
    return (
        <RouterProvider router={router} />
    )
}

export default MyRouter