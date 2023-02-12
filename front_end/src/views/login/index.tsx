import styles from './login.module.scss'
import { useEffect, useRef } from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import apiRequest from '@/requests/api'
import { User } from '@/types/types'
import { useNavigate } from 'react-router-dom'
const view = () => {
    const navigateTo = useNavigate()
    const onFinish = (values: {username : string, password : string}) => {
        apiRequest.checkUser(values.username, values.password).then(
            (res)=>{
                if(res){
                    localStorage.setItem("token",JSON.stringify(res[0]))
                    navigateTo('/');
                    
                }else{
                    message.error("Username and password do not match!")
                }
            }
        )
    };
    return (
        <div className={styles.loginpage}>
            <div className={styles.night}>
                {[...Array(20)].map((x, i) => <div key={i} className={styles.shooting_star}></div>)}
            </div>
            
            <Form
                name="normal_login"
                className={styles.login}
                onFinish={onFinish}
            >
                <div className={styles.title}>Blog Manager</div>
                <Form.Item
                    name="username"
                    className={styles.input}
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    className={styles.input}
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item >
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.go}>
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </Form.Item>
            </Form>
        </div>
    );

    // return (

    //     
    //         
    //         { <div className={styles.login}>
    //             <div className={styles.box}>
    //                 <p className={styles.table}>Login</p>
    //                 <br />
    //                 <input ref={usr} id="username" type="text" placeholder="Username" />
    //                 <input ref={pwd} id="password" type="password" placeholder="Password" />
    //                 <br />
    //                 <a onClick={handleSubmit} className={styles.go}>GO</a>
    //             </div>
    //         </div>}
    //    
    // )
}
export default view