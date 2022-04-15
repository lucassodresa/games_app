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
import { notifyInvite } from '../../helpers/notifications';

const items = [
  { to: '/users', icon: <TeamOutlined />, name: 'Users' },
  { to: '/games', icon: <RocketOutlined />, name: 'Games' }
];

const Layout = () => {
  const { api } = useAxios({ withAuth: true });
  const { data } = useQuery('userInfo', userService.getMe(api));
  const setLoggedUserInfo = useSetRecoilState(loggedUserInfoState);
  const setUsersOnline = useSetRecoilState(usersOnlineState);
  //   const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:3001/users', {
      auth: { token: `Bearer ${getToken()}` }
    });
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

    socket.on('games:invite', ({ roomId, userHost }) => {
      notifyInvite(userHost.name, 'some description');
      console.log(roomId);
    });

    // setSocket(socketInstance);
    // console.log('render');

    return () => socket.close();
  }, [setUsersOnline]);

  useEffect(() => {
    data && setLoggedUserInfo(data?.data?.user);
  }, [data, setLoggedUserInfo]);
  return (
    <StyledLayout>
      <SideNav>
        <Menu items={items} />
      </SideNav>
      <Outlet /*context={{ socket }}*/ />
    </StyledLayout>
  );
};

export default Layout;
