import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { TeamOutlined, RocketOutlined } from '@ant-design/icons';
import useAxios from '../../hooks/useAxios';
import { loggedUserInfoState, usersOnlineState } from '../../recoil/user';
import userService from '../../services/user';
import { StyledLayout } from './styles';
import SideNav from '../SideNav';
import Menu from '../common/Menu';
import { Outlet } from 'react-router-dom';

import { io } from 'socket.io-client';
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
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io('http://localhost:3001/users', {
      auth: { token: `Bearer ${getToken()}` }
    });
    socketInstance.on('loadUsers', (users) => {
      setUsersOnline([...users]);
    });
    socketInstance.on('newUser', (newUserId) => {
      setUsersOnline((prevState) => [...prevState, newUserId]);
    });
    socketInstance.on('userLeft', (leftUserId) => {
      setUsersOnline((prevState) =>
        prevState.filter((id) => id !== leftUserId)
      );
    });
    setSocket(socketInstance);
    console.log('render');

    return () => socketInstance.close();
  }, [setUsersOnline]);

  useEffect(() => {
    data && setLoggedUserInfo(data?.data?.user);
  }, [data, setLoggedUserInfo]);
  return (
    <StyledLayout>
      <SideNav>
        <Menu items={items} />
      </SideNav>
      <Outlet context={{ socket }} />
    </StyledLayout>
  );
};

export default Layout;
