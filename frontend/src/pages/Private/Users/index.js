import React, { useCallback, useEffect } from 'react';
import { List, Avatar, Badge, Divider, Button } from 'antd';
import Page from '../../../components/Page';
import { useQuery } from 'react-query';
import useAxios from '../../../hooks/useAxios';
import userService from '../../../services/user';
import { useRecoilValue } from 'recoil';
import { loggedUserInfoState, usersOnlineState } from '../../../recoil/user';
import { StyledListContainer } from './styles';
import { UserAddOutlined } from '@ant-design/icons';

const Users = () => {
  const { api } = useAxios({ withAuth: true });
  const { data } = useQuery('users', userService.getUsers(api));

  const usersOnlineId = useRecoilValue(usersOnlineState);
  const loggedUserInfo = useRecoilValue(loggedUserInfoState);

  // useCallBack
  const sortFuncByName = useCallback(
    (item1, item2) => {
      if (loggedUserInfo._id === item1._id) return -1;
      if (loggedUserInfo._id === item2._id) return 1;
      return item1.name > item2.name ? 1 : -1;
    },
    [loggedUserInfo]
  );

  const users = data?.data?.users || [];
  const usersOnline = users
    .filter(({ _id }) => usersOnlineId.includes(_id))
    .sort(sortFuncByName);

  const usersOffline = users
    .filter(({ _id }) => !usersOnlineId.includes(_id))
    .sort(sortFuncByName);

  const handleInvite = (id) => {
    alert(id);
  };

  return (
    <Page title="Users">
      <StyledListContainer>
        <Divider orientation="left">Online - {usersOnline.length}</Divider>
        <List
          itemLayout="horizontal"
          dataSource={usersOnline}
          renderItem={({ _id, name, email }) => (
            <List.Item
              key={_id}
              actions={[
                loggedUserInfo._id !== _id && (
                  <Button
                    onClick={() => handleInvite(_id)}
                    type="primary"
                    icon={<UserAddOutlined />}
                    block
                  >
                    Invite
                  </Button>
                )
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Badge dot status="success">
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                  </Badge>
                }
                title={loggedUserInfo._id !== _id ? name : `${name} - You`}
                description={email}
              />
            </List.Item>
          )}
        />
        <Divider orientation="left">Offline - {usersOffline.length}</Divider>
        <List
          itemLayout="horizontal"
          dataSource={usersOffline}
          renderItem={({ _id, name, email }) => (
            <List.Item key={_id} style={{ opacity: '.7' }}>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={<a href="https://ant.design">{name}</a>}
                description={email}
              />
            </List.Item>
          )}
        />
      </StyledListContainer>
    </Page>
  );
};

export default Users;
