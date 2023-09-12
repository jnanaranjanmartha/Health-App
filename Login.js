import React from 'react'
import "../styles/RegisterStyle.css";
import {Form, Input,message} from 'antd';
import {Link, userNavigate} from 'react-router-dom';
import axios from 'axios'
const Login = () => {
    const navigate = userNavigate()
    const onfinishHandler = async (values) =>{
        try{
            const res = await axios.post('/api/v1/user/login', values);
            if(res.data.success){
                localStorage.setItem("token", res.data.token);
                message.success('Login successfully')
                navigate('/')
            }else{
                message.error(res.data.message);
            }
        }catch(error){
            console.log(error)
            message.error('Something went wrong')
        }
    };
  return (
    <div className="form-container card">
    <Form layout="vertical" onFinish={onfinishHandler} className="register-form">
       <h3 className='text-center'>Login Form</h3>
       
       <Form.Item label="Email" name="email">
           <Input type="email" required />
       </Form.Item>
       <Form.Item label="Password" name="password">
           <Input type="password" required />
       </Form.Item>
       <Link to="/register" className='m-2'>
       Not a User Register Here</Link>
       <button className="btn btn-primary" type="submit">
           Login
       </button>
       
    </Form>

</div>
  )
}

export default Login