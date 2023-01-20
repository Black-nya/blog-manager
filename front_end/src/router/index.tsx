import React, { Suspense, lazy } from "react"
import { createBrowserRouter, Navigate } from "react-router-dom"
import Login from '@/views/login'
import BlogSandBox from '@/views/sandbox'
const Home = lazy(()=>import("@/views/sandbox/home"))
const Userlist = lazy(()=>import("@/views/sandbox/account-manage/userlist"))
const Policylist = lazy(()=>import("@/views/sandbox/user-manage/policylist"))
const Rolelist = lazy(()=>import("@/views/sandbox/user-manage/rolelist"))
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
            element: localStorage.getItem("token")? <BlogSandBox />: <Navigate to="/login"/>,
            children: [
                {
                    path:'/home',
                    element: wrap(<Home />)
                },{
                    path:'/account-manage/userlist',
                    element: wrap(<Userlist />)
                },{
                    path:'/user-manage/rolelist',
                    element: wrap(<Rolelist />)
                },{
                    path:'/user-manage/policylist',
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