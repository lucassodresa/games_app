import styled from 'styled-components';
import { Avatar, Layout } from 'antd/lib';
import { NavLink } from 'react-router-dom';
const { Sider } = Layout;

export const StyledSider = styled(Sider)`
  height: 100%;
  background: white;
  & .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const StyledAvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
`;

export const StyledAvatar = styled(Avatar)`
  margin-top: 40px;
  margin-bottom: 15px;
`;

export const StyledName = styled.h3`
  color: #001940;
`;

export const StyledLogoutButton = styled.h3`
  background: #e6f2ff;
  color: #0079ff;
  border: none;
  text-align: center;
  padding: 6px 0;
  margin: 0 25px;
  margin-bottom: 35px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 2px;

  &:hover {
    filter: brightness(0.95);
  }
`;

export const StyledMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: left;
  width: 100%;
  margin: 0;
  padding: 0;

  svg,
  span {
    color: #001940;
    transition: cubic-bezier(0.645, 0.045, 0.355, 1), color 0.3s;
  }
`;

export const StyledNavLink = styled(NavLink)`
  padding: 0 16px;
  height: 35px;
  margin-bottom: 8px;

  &:hover,
  &.active {
    svg,
    span {
      color: #1890ff;
    }
  }
`;

export const StyleSpan = styled.span`
  margin-left: 10px;
`;

export const StyleMenuTitle = styled.h4`
  padding: 0 16px;
  font-weight: bold;
  color: '#00194';
  margin-bottom: 25px;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
`;
