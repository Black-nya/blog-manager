import { Header } from "antd/es/layout/layout"
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons'
import styles from './index.module.scss'
import { Avatar, Dropdown } from "antd"
import type { MenuProps } from 'antd';

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Admin
        </a>
      ),
    },
    {
      key: '2',
      danger: true,
      label: 'Log out',
    },
  ];
const comp = (
    {
        colorBgContainer,
        collapsed,
        setCollapsed
    }:
        {
            colorBgContainer: string,
            collapsed: boolean,
            setCollapsed: Function
        }) => {
    return (
        <Header style={{ padding: 0, background: colorBgContainer, display: "flex", justifyContent: "space-between" }}>
            <div className={styles.trigger} onClick={() => setCollapsed(!collapsed)}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <div className={styles.avatar}>
                <span>Welcome Admin</span>
                <Dropdown menu={{ items }}>
                    <Avatar size={40} icon={<UserOutlined />} />
                </Dropdown>
            </div>

        </Header>
    )
}
export default comp