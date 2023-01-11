/**
 * 布局页面
 */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SideMenu from "../../components/sandbox/SideMenu";
import TopHeader from "../../components/sandbox/TopHeader";
import Home from "./home/Home";
import NoPermission from "./nopermission/Nopermission";
import RightList from "./right-manage/RightList";
import RoleList from "./right-manage/RoleList";
import UserList from "./user-manage/UserList";
import { Layout } from 'antd';
import './NewsSandBox.css'
const { Content } = Layout;
export default function NewsSandBox() {
    return (
        <Layout>
            <SideMenu></SideMenu>
            
            <Layout className="site-layout">
                <TopHeader></TopHeader>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Switch>
                        <Route path="/home" component={Home}></Route>
                        <Route path="/user-manage/list" component={UserList}></Route>
                        <Route path="/right-manage/role/list" component={RoleList}></Route>
                        <Route path="/right-manage/right/list" component={RightList}></Route>
                        <Redirect from="/" to='/home' exact></Redirect>
                        <Route path="*" component={NoPermission}></Route>
                    </Switch>
                </Content>
            </Layout>

        </Layout>
    )
}