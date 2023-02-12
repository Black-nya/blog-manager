import { Button, Space, Table, Modal, Tree } from 'antd'
import React, { useEffect, useState } from 'react'
import apiRequest from '@/requests/api'
import { MyMenu, Role } from '@/types/types';
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { ObjectID } from 'bson';
const { confirm } = Modal
export default function Rolelist() {
  const [dataSource, setdataSource] = useState<Role[]>([]);
  const [rightsList, setrightsList] = useState<MyMenu[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentChecked, setcurrentChecked] = useState<string[]>([]);
  const [currentId, setcurrentId] = useState<ObjectID>(new ObjectID(0));
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Role name',
      dataIndex: 'roleName',
    },
    {
      title: 'Action',
      render: (item: Role) =>
        <Space wrap>
          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>{setcurrentId(item._id);setcurrentChecked(item.rights); setIsModalOpen(true);}} />
          <Button danger type="primary" shape="circle" icon={<DeleteOutlined />} onClick={() => { handleDelete(item) }} />
        </Space>
    }
  ];

  useEffect(
    () => {
      apiRequest.getRoles().then(
        (res) => {
          setdataSource(((res as unknown) as Role[]).sort((a: Role, b: Role) => (a.id - b.id)))
        }
      )
    }, []
  )

  useEffect(()=>{
    apiRequest.getMenus().then(
      (res)=>{
        setrightsList(((res as unknown) as MyMenu[]).sort((a:MyMenu,b:MyMenu)=>(a.id-b.id)))
      }
    )
  },[])

  const handleDelete = (item: Role) => {
    confirm({
      title: 'Are you sure to delete this role?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setdataSource(dataSource.filter(data => data._id !== item._id))
        apiRequest.deleteRole(item._id)
      },
      onCancel() {
        //console.log("cancelled");
      }
    });
  }

  const handleOk = () => {
    setIsModalOpen(false);
    setdataSource(dataSource.map(item=>{
      if(item._id===currentId){
        return{
          ...item,
          rights:currentChecked
        }
      }
      return item;
    }))
    apiRequest.updateRole(currentId, {rights:currentChecked})
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Table dataSource={dataSource} columns={columns} rowKey={(item) => item.id} />
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Tree
          checkable
          checkedKeys={currentChecked}
          onCheck={(checked)=>{setcurrentChecked(checked.checked as string[])}}
          checkStrictly={true}
          treeData={rightsList}
        />
      </Modal>
    </>
  )
}
