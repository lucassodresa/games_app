import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import useAxios from '../../hooks/useAxios';
import { loggedUserInfoState } from '../../recoil/user';
import userService from '../../services/user';

import { StyledAvatar, StyledAvatarContainer, StyledName } from './styles';

const AvatarContainer = () => {
  const userInfo = useRecoilValue(loggedUserInfoState);

  return (
    <StyledAvatarContainer>
      <StyledAvatar size={75}>{userInfo?.name?.[0]}</StyledAvatar>
      <StyledName>{userInfo?.name}</StyledName>
      <Link to="/profile">Profile</Link>
    </StyledAvatarContainer>
  );
};

export default AvatarContainer;
