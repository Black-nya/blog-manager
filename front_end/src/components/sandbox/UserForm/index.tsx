import { Region, Role, User } from "@/types/types";
import { Modal, Input, Select, Form } from "antd";
import { ObjectID } from "bson";
import { useEffect, useState } from "react";

interface UserFormProps {
    open: boolean;
    onOk: (values: User) => void;
    onCancel: () => void;
    title: string;
    okText: string;
    regions: Region[];
    roles: Role[];
    user?: User;
}

const UserForm: React.FC<UserFormProps> = ({
    open,
    onOk,
    onCancel,
    title,
    okText,
    regions,
    roles,
    user
}) => {
    const [form] = Form.useForm();
    const [disabled, setDisabled] = useState(false);
    useEffect(()=>{
        if(open){
            form.setFieldsValue(user);
            setDisabled(user?.roleId as unknown as string =="63d5cfb6dd0af57c67f04c68")
        }
    },[open])
    return (
        <Modal
            forceRender
            open={open}
            title={title}
            okText={okText}
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onOk(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: 'Please input a username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input a password!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="region"
                    label="Region"
                    rules={disabled?[]:[{ required: true, message: 'Please select a region!' }]}
                >
                    <Select
                        disabled={disabled}
                        style={{ width: 150 }}
                        options={regions}
                    />
                </Form.Item>
                <Form.Item
                    name="roleId"
                    label="Role"
                    rules={[{ required: true, message: 'Please select a role!' }]}
                >
                    <Select
                        style={{ width: 120 }}
                        onChange={(value) => {
                            if(value == "63d5cfb6dd0af57c67f04c68"){
                                form.setFieldValue(
                                    "region",""
                                )
                                setDisabled(true)
                            }else{
                                setDisabled(false)
                            }
                        }}
                        options={roles.map((role => {
                            return {
                                value: role._id,
                                label: role.roleName
                            }
                        }))}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};
export default UserForm