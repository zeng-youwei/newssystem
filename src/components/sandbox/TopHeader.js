import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Layout, Dropdown, Avatar } from 'antd';
import React, { useState } from 'react';
const { Header } = Layout;
export default function TopHeader() {
    const [collapsed, setCollapsed] = useState(false);
    const changeCollapsed = () => {
        console.log(111);
        setCollapsed(!collapsed)
    }
    const items = [
        { label: '菜单项一', key: 'item-1' },
        { label: '菜单项二', key: 'item-2' },
    ];
    return (
        <Header
            className="site-layout-background"
            style={{
                padding: '0 16px',
            }}
        >
            {
                collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />
            }
            <div style={{ float: "right" }}>
                <span>欢迎admin回来</span>
                <Dropdown menu={{ items }}>
                    <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </Header>
    )
}