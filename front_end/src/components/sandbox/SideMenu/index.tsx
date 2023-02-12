import { MenuProps, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import React, { useEffect, useState } from 'react';
import apiRequest from '@/requests/api'
import { MyMenu } from '@/types/types';
import { ItemType } from 'antd/es/menu/hooks/useItems'
const icons = {
    "/home": <DesktopOutlined />,
    "/user-manage": <UserOutlined />,
    "/user-manage/list": <UnorderedListOutlined />,
}
const {role: {rights}} = JSON.parse(localStorage.getItem("token"))

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: ItemType[],
): ItemType {
    return {
        key,
        icon,
        children,
        label,
    } as ItemType;
}
function process(menus: MyMenu[]): ItemType[] {
    return menus.filter(
        (item) => (item.pagepermission === 1 && rights.includes(item.key))  
    ).map(
        (item) => {
            const {title, key, children} = item;
            return getItem(title, key, icons[key as keyof object], children ? process(children) : undefined)
        }
    )
}
const comp = (
    {
        collapsed,
        setCollapsed,
    }:
        {
            collapsed: boolean,
            setCollapsed: Function,
        }) => {
    const [menus, setMenus] = useState<ItemType[]>([])
    useEffect(
        () => {
            apiRequest.getMenus().then(res => {
                setMenus(process(((res as unknown) as MyMenu[]).sort((a:MyMenu,b:MyMenu)=>(a.id-b.id))))
            })
        }, []
    )
    
    const navigateTo = useNavigate()
    const menuSelect = (e: { key: string }) => {
        navigateTo(e.key)
    }
    const location = useLocation()
    const [openKeys, setOpenkeys] = useState<string[]>(['/'+location.pathname.split('/')[1]])
    const handleSelect = (keys: string[]) => {
        setOpenkeys([keys[keys.length - 1]])
    }
    return (
        <Sider width={250} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
            <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline" items={menus} onClick={menuSelect} onOpenChange={handleSelect} openKeys={openKeys}/>
        </Sider>
    )
}
export default comp