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

import { v4 as uuid } from 'uuid';

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
          <Divider style={{ paddingBottom: '30px' }} orientation="left">
            <Badge status="success" count={usersOnline.length} showZero>
              <WifiOutlined />
              <span style={{ marginLeft: '5px', paddingRight: '10px' }}>
                Online
              </span>
            </Badge>
          </Divider>
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
                  <List.Item
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
                        <Badge
                          style={{
                            height: '10px',
                            width: '10px',
                            minWidth: '10px'
                          }}
                          size="default"
                          dot
                          status="success"
                          offset={[-5, 25]}
                        >
                          <Avatar src="https://joeschmoe.io/api/v1/random" />
                        </Badge>
                      }
                      title={name}
                      description={email}
                    />
                  </List.Item>
                </Badge.Ribbon>
              ) : (
                <List.Item
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
                      <Badge
                        dot
                        status="success"
                        offset={[-5, 25]}
                        style={{
                          height: '10px',
                          width: '10px',
                          minWidth: '10px'
                        }}
                      >
                        <Avatar src="https://joeschmoe.io/api/v1/random" />
                      </Badge>
                    }
                    title={name}
                    description={email}
                  />
                </List.Item>
              )
            }
          />
          <Divider
            orientation="left"
            style={{ paddingTop: '20px', paddingBottom: '5px' }}
          >
            <Badge status="Error" count={usersOffline.length} showZero>
              <DisconnectOutlined />
              <span style={{ marginLeft: '5px', paddingRight: '10px' }}>
                Offline
              </span>
            </Badge>
          </Divider>
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
    </>
  );
};

export default Users;
