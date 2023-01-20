import { Outlet, Link } from "react-router-dom";
import React from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import SideMenu from '@/components/sandbox/SideMenu'
import TopHeader from '@/components/sandbox/TopHeader'
import { useState } from 'react';

const { Content, Footer} = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false)
  const collapsedProps = {
    collapsed,setCollapsed
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideMenu {...collapsedProps} ></SideMenu>
      <Layout className="site-layout">
        <TopHeader {...collapsedProps} colorBgContainer={colorBgContainer}></TopHeader>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;