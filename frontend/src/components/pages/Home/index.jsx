import React from 'react';
import { Menu, Layout } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Sider } = Layout;

const Home = () => {
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
      </Menu>
    </Sider>
  );
};

export default Home;
