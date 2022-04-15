import { Button } from 'antd';
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Page from '../../../components/Page';

const Games = () => {
  const { socket } = useOutletContext();
  const handleClick = () => {
    socket.emit('create-room', 'id_room');
  };

  return (
    <Page title="Games">
      <Button onClick={handleClick} type="primary" block>
        Create room
      </Button>
    </Page>
  );
};

export default Games;
