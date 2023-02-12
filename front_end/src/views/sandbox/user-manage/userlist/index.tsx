import { Region, Role, User } from '@/types/types'
import { useEffect, useState } from 'react'
import apiRequest from '@/requests/api'
import { Space, Button, Switch, Table } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import Userform from '@/components/sandbox/UserForm'
import confirm from 'antd/es/modal/confirm'
export default function Userlist() {
  const [openCreate, setopenCreate] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [dataSource, setdataSource] = useState<User[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [regions, setRegions] = useState<Region[]>([])
  const [update, setUpdate] = useState(false)
  const [user, setUser] = useState<User>()
  const onCreate = (values: Object) => {
    apiRequest.addUser({
      ...values,
      "roleState":true,
      "default":false,
  } as User).then(
      ()=>{
        setUpdate(!update);
      }
    )
    setopenCreate(false);
  };

  const onEdit = (values: Object)=>{
    if(user){
      setTimeout(()=>{
        apiRequest.updateUser(user._id,values)
        setUpdate(!update)
      },0)
    }
    setopenEdit(false)
  }

  useEffect(
    () => {
      apiRequest.getUsers().then(
        (res) => {
          setdataSource(((res as unknown) as User[]))
        }
      )
    }, [update]
  )

  useEffect(
    () => {
      apiRequest.getRoles().then(
        (res) => {
          setRoles(((res as unknown) as Role[]))
        }
      )
    }, []
  )

  useEffect(
    () => {
      apiRequest.getRegions().then(
        (res) => {
          // console.log(res);
          setRegions(((res as unknown) as Region[]))
        }
      )
    }, []
  )
  // console.log(roles)
  // console.log(regions)
  const handleDelete = (user: User) => {
    confirm({
      title: 'Are you sure to delete this user?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setdataSource(dataSource.filter(data => data._id !== user._id))
        apiRequest.deleteUser(user._id)
      },
      onCancel() {
        //console.log("cancelled");
      }
    });
  }

  const handleChange = (user: User) =>{
    user.roleState = !user.roleState;
    setdataSource([...dataSource]);
    apiRequest.updateUser(user._id, {roleState: user.roleState});
  }

  const columns = [
    {
      title: 'Region',
      dataIndex: 'region',
      filters: [...regions.map(region=>({
          text: region.title,
          value: region.value,
        })),{text:"Global",value:"Global"}],
      onFilter:(value:string|number|boolean,record:User)=>(value==='Global'?record.region==="":record.region===value),
      render: (region: string) => region === "" ? 'Global' : region
    },
    {
      title: 'Role Name',
      dataIndex: 'role',
      render: (role: Role) => role?.roleName
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Enabled?',
      dataIndex: 'roleState',
      render: (roleState: boolean, user: User) => <Switch checked={roleState} disabled={user.default} onChange={()=>{handleChange(user)}}/>
    },
    {
      title: 'Action',
      render: (user: User) =>
        <Space wrap>
          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => {setopenEdit(true);setUser(user)}} disabled={user.default} />
          <Button danger type="primary" shape="circle" icon={<DeleteOutlined />} onClick={() => {handleDelete(user)}} disabled={user.default} />
        </Space>
    }
  ];


  return (
    <div>
      <Button type='primary' style={{ marginBottom: '16px' }} onClick={() => {
        setopenCreate(true);
      }} >Add User</Button>
      <Userform
        open={openCreate}
        onOk={onCreate}
        title="Create a new user"
        okText='Create'
        onCancel={() => {setopenCreate(false);}}
        regions={regions}
        roles={roles}
      />
      <Userform
        open={openEdit}
        onOk={onEdit}
        title="Edit existing user"
        okText='Edit'
        onCancel={() => {setopenEdit(false);}}
        regions={regions}
        roles={roles}
        user={user}
      />
      <Table tableLayout='fixed' dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} rowKey={user => user._id as unknown as string} />
    </div>
  )
}
