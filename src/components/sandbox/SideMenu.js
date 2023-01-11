import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './index.css'
import { withRouter } from "react-router-dom";
const { Sider } = Layout;


function SideMenu(props) {

  const [menu, SetMenu] = useState([])
  // icon映射表
  const iconList = {
    '/home': <UserOutlined />,
    '/user-manage': <UploadOutlined />,
    '/right-manage': <VideoCameraOutlined />
  }

  useEffect(() => {
    axios.get('http://localhost:5000/rights?_embed=children').then(res => {
      SetMenu(res.data)
    })
  }, [])

  /**
   * 将菜单列表修改成Menu组件需要的格式
   * @param {*} data 
   * @returns Array
   */
  const renderMenu = (data) => {
    let newData = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].pagepermisson !== 1) continue
      let obj = {}
      obj.key = data[i].key
      obj.icon = iconList[data[i].key]
      obj.label = data[i].title
      if (data[i].children && data[i].children.length > 0) {
        obj.children = renderMenu(data[i].children)
      }
      newData.push(obj)
    }
    return newData
  }

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div className="logo" >全球新闻发布系统</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[props.location.pathname]}
        defaultOpenKeys={["/" + props.location.pathname.split('/')[1]]}
        items={renderMenu(menu)}
        onClick={(obj) => {
          props.history.push(obj.key)
        }}
      />
    </Sider>
  )
}
export default withRouter(SideMenu) 