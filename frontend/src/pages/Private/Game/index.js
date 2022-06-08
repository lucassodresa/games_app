import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { io } from 'socket.io-client';
import Page from '../../../components/Page';
import TicTacToe from '../../../components/TicTacToe';
import { getToken } from '../../../helpers/auth';
import { loggedUserInfoState } from '../../../recoil/user';

const Game = () => {
  const { roomId } = useParams();
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const userInfo = useRecoilValue(loggedUserInfoState);
  const [socketState, setSocketState] = useState(null);
  const [currentGame, setCurrentGame] = useState([]);
  const [isYourTurn, setIsYourTurn] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:3001/games', {
      auth: { token: `Bearer ${getToken()}` }
    });
    socket.emit('games:join', { roomId });
    socket.on('games:status', ({ status, message, gameInfo, winner }) => {
      if (status === 'turn') {
        const { currentTurn } = gameInfo;

        if (userInfo?._id === currentTurn) {
          setIsYourTurn(true);
          setMessage('Your turn');
        } else {
          setIsYourTurn(false);
          setMessage('Opponent turn');
        }
      } else if (status === 'end') {
        const { users } = gameInfo;
        const { user: winnerUser } = users[winner];
        console.log(winnerUser);

        if (winnerUser._id === userInfo?._id) {
          setMessage('You win');
        } else {
          setMessage('You lose');
        }
      }

      setStatus(status);
      setCurrentGame(gameInfo.game);
      console.log(gameInfo);
    });
    setSocketState(socket);
  }, []);

  return (
    <Page title="Game">
      <p>Status: {message}</p>
      {status === 'turn' ? (
        <TicTacToe
          socket={socketState}
          currentGame={currentGame}
          isYourTurn={isYourTurn}
          roomId={roomId}
        />
      ) : (
        ''
      )}
    </Page>
  );
};

export default Game;
