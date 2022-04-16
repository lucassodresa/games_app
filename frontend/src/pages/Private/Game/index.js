import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Page from '../../../components/Page';
import { getToken } from '../../../helpers/auth';

const Game = () => {
  const { roomId } = useParams();

  useEffect(() => {
    const socket = io('http://localhost:3001/games', {
      auth: { token: `Bearer ${getToken()}` }
    });
    socket.emit('games:join', { roomId });
    console.log(roomId);
  }, []);

  return <Page>Game</Page>;
};

export default Game;
