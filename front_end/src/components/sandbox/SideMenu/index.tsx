import { MenuProps, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import React from 'react';

type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Home', '/home', <PieChartOutlined />),
    getItem('Account Management', '2', <DesktopOutlined />, [
        getItem('User List','/account-manage/userlist')
    ]),
    getItem('User Policy', 'sub1', <UserOutlined />, [
        getItem('Roles List', '/user-manage/rolelist'),
        getItem('Policy List', '/user-manage/policylist')
    ]),
];

const comp = (
    {
        collapsed,
        setCollapsed,
    }: 
    {
        collapsed : boolean,
        setCollapsed : Function,
    }) => {
        const navigateTo = useNavigate()
        const menuSelect = (e :{key :string})=>{
            navigateTo(e.key)
        }
    return (
        <Sider width={250} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={menuSelect}/>
        </Sider>
    )
}
export default comp