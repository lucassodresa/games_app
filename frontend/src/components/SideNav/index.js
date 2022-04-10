import React, { useEffect } from 'react';
import { Divider } from 'antd';
import { TeamOutlined, RocketOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import userService from '../../services/user';
import useAxios from '../../hooks/useAxios';
import {
  StyledAvatar,
  StyledAvatarContainer,
  StyledLogoutButton,
  StyledMenu,
  StyledName,
  StyledNavLink,
  StyledSider,
  StyleMenuTitle,
  StyleSpan
} from './styles';

const SideNav = () => {
  const { api, logout } = useAxios({ withAuth: true });
  const { data } = useQuery('userInfo', userService.getMe(api));

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <StyledSider>
      <div>
        <StyledAvatarContainer>
          <StyledAvatar size={75}>L</StyledAvatar>
          <StyledName>Lucas Sodré</StyledName>
          <Link to="/profile">Profile</Link>
        </StyledAvatarContainer>
        <Divider />

        <StyledMenu>
          <StyleMenuTitle>Labels</StyleMenuTitle>
          <StyledNavLink to="/users">
            <TeamOutlined />
            <StyleSpan>Users</StyleSpan>
          </StyledNavLink>

          <StyledNavLink to="/games">
            <RocketOutlined />
            <StyleSpan>Games</StyleSpan>
          </StyledNavLink>
        </StyledMenu>
      </div>
      <StyledLogoutButton onClick={logout}>Logout</StyledLogoutButton>
    </StyledSider>
  );
};

export default SideNav;
