import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { TeamOutlined, RocketOutlined } from '@ant-design/icons';
import useAxios from '../../hooks/useAxios';
import { loggedUserInfoState } from '../../recoil/user';
import userService from '../../services/user';

import { StyledLayout } from './styles';
import SideNav from '../SideNav';
import Menu from '../common/Menu';
import { Outlet } from 'react-router-dom';

const items = [
  { to: '/users', icon: <TeamOutlined />, name: 'Users' },
  { to: '/games', icon: <RocketOutlined />, name: 'Games' }
];

const Layout = () => {
  const { api } = useAxios({ withAuth: true });
  const { data } = useQuery('userInfo', userService.getMe(api));
  const setLoggedUserInfo = useRecoilState(loggedUserInfoState)[1];

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
