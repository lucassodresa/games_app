import React, { useEffect } from 'react';
import { Menu, Layout, Button } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import userService from '../../../services/user';
import useAxios from '../../../hooks/useAxios';
import useAuth from '../../../hooks/useAuth';
const { Sider } = Layout;

const Home = () => {
  const api = useAxios({ withAuth: true });
  const { logout } = useAuth();
  const { data } = useQuery('userInfo', userService.getMe(api));

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/signin">signin</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          <Link to="/signup">signup</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          <Link to="/dfsdfsd">Qualquer lugar</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<UploadOutlined />}>
          <Button onClick={logout}>Logout</Button>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Home;
