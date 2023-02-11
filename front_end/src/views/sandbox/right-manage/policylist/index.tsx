import { Modal, Button, Space, Table, Tag, Popover, Switch } from 'antd';
import { useEffect, useState } from 'react'
import apiRequest from '@/requests/api'
import { MyMenu } from '@/types/types';
import { DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons'
const { confirm } = Modal
export default function policylist() {
  const [dataSource, setdataSource] = useState<MyMenu[]>([])
  useEffect(
    ()=>{
      apiRequest.getMenus().then(
        (res)=>{
            setdataSource(((res as unknown) as MyMenu[]).sort((a:MyMenu,b:MyMenu)=>(a.id-b.id)))
        }
      )
    },[]
  )
  const handleSelect = (item:MyMenu)=>{
    item.pagepermission = item.pagepermission === 1 ? 0:1;
    setdataSource([...dataSource])
    apiRequest.updateMenu(item.key,{pagepermission: item.pagepermission})
  }
  const handleDelete = (item:MyMenu)=>{
    const update = (datalist:MyMenu[]) : MyMenu[]=>
      datalist.map((data:MyMenu)=>{
        if(data.children){
          return {...data, children: update(data.children.filter(data=>data.id!==item.id))};
        }
        return data
      })
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setdataSource(update(dataSource.filter(data=>data.id!==item.id)))
        apiRequest.deleteMenu(item.key)
      },
      onCancel(){
        //console.log("cancelled");
      }
    });
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'title',
    },
    {
      title: 'Pathname',
      dataIndex: 'key',
      render: (text:string)=> <Tag color="magenta">{text}</Tag>
    },
    {
      title:'Action',
      render:(item:MyMenu)=>
      <Space wrap>
        <Switch disabled={item.pagepermission===undefined} checked={!!item.pagepermission} onChange={()=>{handleSelect(item)}}/>
        <Button danger type="primary" shape="circle" icon={<DeleteOutlined />} onClick={()=>{handleDelete(item)}}/>
        
      </Space>
    }
  ];
  return (
    <Table dataSource={dataSource} columns={columns} pagination={{pageSize:5}}/>
  )
}
