/**
 * 权限列表
 */
import { ExclamationCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import { Button, Table, Tag, Modal, Popover, Switch } from 'antd';
import axios from "axios";
const { confirm } = Modal;

export default function RightList() {

    const [dataSource, setDatasource] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/rights?_embed=children').then(res => {
            setDatasource(res.data)
            console.log(res.data);
        })
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <b>{id}</b>
            }
        },
        {
            title: '权限名称',
            dataIndex: 'title',
        },
        {
            title: '权限路径',
            dataIndex: 'key',
            render: (key) => {
                return <Tag color="orange">{key}</Tag>
            }
        },
        {
            title: '操作',
            render: (item) => {
                return <div>
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)} />
                    <Popover content={<Switch onChange={() => switchMethod(item)} checked={item.pagepermisson}></Switch>} title="配置项" trigger={item.pagepermisson === undefined ? '' : 'click'} >
                        <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.pagepermisson === undefined} />
                    </Popover>
                </div>
            }
        },
    ];

    const switchMethod = (item) => {
        item.pagepermisson = item.pagepermisson === 1 ? 0 : 1
        setDatasource([...dataSource])
        if (item.grade === 1) {
            axios.patch(`http://localhost:5000/rights/${item.id}`, {
                pagepermisson: item.pagepermisson
            })
        } else {
            axios.patch(`http://localhost:5000/children/${item.id}`, {
                pagepermisson: item.pagepermisson
            })
        }
    }

    const confirmMethod = (item) => {
        confirm({
            title: '你确定要删除',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                console.log('OK');
                deleteMethod(item)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const deleteMethod = (item) => {
        if (item.grade === 1) {
            setDatasource(dataSource.filter(data => data.id !== item.id))
            // axios.delete(`http://localhost:5000/rights/${item.id}`)
        } else {
            let list = dataSource.filter(data => data.id === item.rightId)
            list[0].children = list[0].children.filter(data => data.id !== item.id)
            setDatasource([...dataSource])
            // axios.delete(`http://localhost:5000/children/${item.id}`)
        }
    }

    return (
        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
    )
}