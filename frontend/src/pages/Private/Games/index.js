import { Button, Modal, Select } from 'antd';
import React, { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { io } from 'socket.io-client';
import ListItem from '../../../components/common/ListItem';
import Page from '../../../components/Page';
import { getToken } from '../../../helpers/auth';
import { usersOnlineState, loggedUserInfoState } from '../../../recoil/user';
import CustomAvatar from '../Users/components/CustomAvatar';
import userService from '../../../services/user';
import useAxios from '../../../hooks/useAxios';
import { v4 as uuid } from 'uuid';
import { Navigate, useNavigate } from 'react-router-dom';
const { Option } = Select;

const Games = () => {
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [userToInvite, setUserToInvite] = useState('');
  const usersOnline = useRecoilValue(usersOnlineState);
  const loggedUserInfo = useRecoilValue(loggedUserInfoState);
  const { api } = useAxios({ withAuth: true });
  const { data } = useQuery('users', userService.getUsers(api));
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const socket = io('http://localhost:3001/games', {
      auth: { token: `Bearer ${getToken()}` }
    });
    const roomId = uuid();
    socket.emit('games:create', {
      roomId,
      userToInvite
    });
    navigate(roomId);
    // socket.disconnect();
  };

  const sortFuncByName = useCallback(
    (item1, item2) => (item1.name > item2.name ? 1 : -1),
    []
  );

  const users = data?.data?.users || [];
  const usersOnlineWithInfo = users
    .filter(
      ({ _id }) => usersOnline.includes(_id) && _id !== loggedUserInfo._id
    )
    .sort(sortFuncByName);

  return (
    <Page title="Games">
      <Modal
        title="Room"
        visible={isOpenedModal}
        okText="Create room"
        onCancel={() => setIsOpenedModal(false)}
        onOk={handleCreateRoom}
      >
        <Select
          style={{ width: '100%' }}
          placeholder="select one country"
          onChange={(value) => setUserToInvite(value)}
          optionLabelProp="label"
        >
          {usersOnlineWithInfo.map(({ _id, name, email }) => (
            <Option key={_id} value={_id} label={name}>
              <ListItem
                avatar={<CustomAvatar />}
                title={name}
                description={email}
              />
            </Option>
          ))}
        </Select>
      </Modal>
      <Button onClick={() => setIsOpenedModal(true)} type="primary" block>
        Create room
      </Button>
    </Page>
  );
};

export default Games;
