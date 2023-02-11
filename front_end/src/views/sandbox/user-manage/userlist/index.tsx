import { User } from '@/types/types'
import React, { useEffect, useState } from 'react'
import apiRequest from '@/requests/api'
import { Tag, Space, Button, Switch, Table } from 'antd'
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons'

export default function Userlist() {
  const [dataSource, setdataSource] = useState<User[]>([])
  useEffect(
    ()=>{
      apiRequest.getUsers().then(
        (res)=>{
            setdataSource(((res as unknown) as User[]).sort((a:User,b:User)=>(a.id-b.id)))
        }
      )
    },[]
  )
  const columns = [
    {
      title: 'Region',
      dataIndex: 'region',
      render: (region:string)=>region===""?'Global':region
    },
    {
      title: 'Role Name',
      dataIndex: 'roleId',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Enabled?',
      dataIndex: 'roleState',
      render: (item:User)=><Switch />
    },
    {
      title:'Action',
      render:(item:User)=>
      <Space wrap>
        <Button danger type="primary" shape="circle" icon={<DeleteOutlined />} onClick={()=>{}}/>
      </Space>
    }
  ];

  return (
    <Table dataSource={dataSource} columns={columns} pagination={{pageSize:5}} rowKey={item=>item.id}/>
  )
}
