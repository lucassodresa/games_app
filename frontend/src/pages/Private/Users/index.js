import React, { useCallback, useState } from 'react';
import { List, Avatar, Badge, Divider, Button, Modal } from 'antd';
import Page from '../../../components/Page';
import { useQuery } from 'react-query';
import useAxios from '../../../hooks/useAxios';
import userService from '../../../services/user';
import { useRecoilValue } from 'recoil';
import { loggedUserInfoState, usersOnlineState } from '../../../recoil/user';
import { StyledListContainer } from './styles';
import {
  UserAddOutlined,
  DisconnectOutlined,
  WifiOutlined
} from '@ant-design/icons';

import ListItem from '../../../components/common/ListItem';
import CustomAvatar from './components/CustomAvatar';
import CustomDivider from './components/CustomDivider';

const Users = () => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [userToInviteID, setUserToInviteID] = useState(null);
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

  const handleCreateRoom = (id) => {
    // socketInstance.emit('select_room', { room: uuid(), userIdToInvite: id });
    alert(id);
  };

  const handleInvite = (id) => {
    setIsOpenedModal(true);
    setUserToInviteID(id);
  };

  const userSelected = usersOnline.find(({ _id }) => _id === userToInviteID);

  return (
    <>
      <Modal
        title="Room"
        visible={isOpenedModal}
        onOk={handleCreateRoom}
        onCancel={() => setIsOpenedModal(false)}
        okText="Create room"
      >
        <p>Game: Tic Tac Toe</p>
        <p>User to Invite: {userSelected?.name}</p>
      </Modal>
      <Page title="Users">
        <StyledListContainer>
          <CustomDivider
            text="Online"
            icon={<WifiOutlined />}
            count={usersOnline.length}
            status="success"
            style={{ paddingBottom: '30px' }}
          />

          <List
            itemLayout="horizontal"
            dataSource={usersOnline}
            renderItem={({ _id, name, email }) =>
              loggedUserInfo._id === _id ? (
                <Badge.Ribbon
                  style={{ left: 0, top: '-15px' }}
                  placement="start"
                  text="YOU"
                  key={_id}
                >
                  <ListItem
                    avatar={<CustomAvatar />}
                    title={name}
                    description={email}
                  />
                </Badge.Ribbon>
              ) : (
                <ListItem
                  title={name}
                  description={email}
                  avatar={<CustomAvatar />}
                  actions={[
                    <Button
                      key={_id}
                      onClick={() => handleInvite(_id)}
                      type="primary"
                      icon={<UserAddOutlined />}
                      block
                    >
                      Invite
                    </Button>
                  ]}
                />
              )
            }
          />

          <CustomDivider
            text="Offline"
            icon={<DisconnectOutlined />}
            count={usersOffline.length}
            status="Error"
            style={{ paddingTop: '20px', paddingBottom: '5px' }}
          />

          <List
            itemLayout="horizontal"
            dataSource={usersOffline}
            renderItem={({ _id, name, email }) => (
              <ListItem
                key={_id}
                style={{ opacity: '.7' }}
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={name}
                description={email}
              />
            )}
          />
        </StyledListContainer>
      </Page>
    </>
  );
};

export default Users;
