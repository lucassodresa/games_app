import React, { useEffect } from 'react';
import { List, Avatar, Badge, Divider } from 'antd';
import Page from '../../../components/Page';
import { useQuery } from 'react-query';
import useAxios from '../../../hooks/useAxios';
import userService from '../../../services/user';
import { useRecoilValue } from 'recoil';
import { usersOnlineState } from '../../../recoil/user';

const Users = () => {
  const { api } = useAxios({ withAuth: true });
  const { data } = useQuery('users', userService.getUsers(api));

  const usersOnlineId = useRecoilValue(usersOnlineState);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const sortFuncByName = (item1, item2) =>
    item1.name.toLowerCase() > item2.name.toLowerCase() ? 1 : -1;

  const users = data?.data?.users || [];

  const usersOnline = users
    .filter(({ _id }) => usersOnlineId.includes(_id))
    .sort(sortFuncByName);
  const usersOffline = users
    .filter(({ _id }) => !usersOnlineId.includes(_id))
    .sort(sortFuncByName);

  return (
    <Page title="Users">
      <Divider orientation="left">Online - {usersOnline.length}</Divider>
      <List
        itemLayout="horizontal"
        dataSource={usersOnline}
        renderItem={({ _id, name, email }) => (
          <List.Item key={_id}>
            <List.Item.Meta
              avatar={
                <Badge dot status="success">
                  <Avatar src="https://joeschmoe.io/api/v1/random" />
                </Badge>
              }
              title={<a href="https://ant.design">{name}</a>}
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
    </Page>
  );
};

export default Users;
