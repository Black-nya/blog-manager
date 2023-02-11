import React, { Suspense, lazy } from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"
import Login from '@/views/login'
import BlogSandBox from '@/views/sandbox'
const Home = lazy(()=>import("@/views/sandbox/home"))
const Userlist = lazy(()=>import("@/views/sandbox/user-manage/userlist"))
const Policylist = lazy(()=>import("@/views/sandbox/right-manage/policylist"))
const Rolelist = lazy(()=>import("@/views/sandbox/right-manage/rolelist"))
const wrap = (elem:JSX.Element)=>(
    <Suspense>
        {elem}    
    </Suspense>
)
export const router = createBrowserRouter(
    [
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/',
            element: localStorage.getItem("token")? <Navigate to="/home"/>: <Navigate to="/login"/>,
        },
        {
            path: '/',
            element: <BlogSandBox />,
            children: [
                {
                    path:'/home',
                    element: wrap(<Home />)
                },{
                    path:'/user-manage/list',
                    element: wrap(<Userlist />)
                },{
                    path:'/auth-manage/role/list',
                    element: wrap(<Rolelist />)
                },{
                    path:'/auth-manage/right/list',  
                    element: wrap(<Policylist />)
                }
            ]
        },
        {
            path:'*',
            element: <Navigate to="/"/>
        }
    ]
)