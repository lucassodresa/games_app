import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { TeamOutlined, RocketOutlined } from '@ant-design/icons';
import useAxios from '../../hooks/useAxios';
import { loggedUserInfoState, usersOnlineState } from '../../recoil/user';
import userService from '../../services/user';
import { io } from 'socket.io-client';
import { StyledLayout } from './styles';
import SideNav from '../SideNav';
import Menu from '../common/Menu';
import { Outlet } from 'react-router-dom';
import { getToken } from '../../helpers/auth';

const items = [
  { to: '/users', icon: <TeamOutlined />, name: 'Users' },
  { to: '/games', icon: <RocketOutlined />, name: 'Games' }
];

const Layout = () => {
  const { api } = useAxios({ withAuth: true });
  const { data } = useQuery('userInfo', userService.getMe(api));
  const setLoggedUserInfo = useSetRecoilState(loggedUserInfoState);
  const setUsersOnline = useSetRecoilState(usersOnlineState);

  useEffect(() => {
    const token = `Bearer ${getToken()}`;
    const socket = io('http://localhost:3001', { auth: { token } });

    socket.on('loadUsers', (users) => {
      setUsersOnline([...users]);
    });
    socket.on('newUser', (newUserId) => {
      setUsersOnline((prevState) => [...prevState, newUserId]);
    });
    socket.on('userLeft', (leftUserId) => {
      setUsersOnline((prevState) =>
        prevState.filter((id) => id !== leftUserId)
      );
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    data && setLoggedUserInfo(data?.data?.user);
  }, [data]);
  return (
    <StyledLayout>
      <SideNav>
        <Menu items={items} />
      </SideNav>
      <Outlet />
    </StyledLayout>
  );
};

export default Layout;
