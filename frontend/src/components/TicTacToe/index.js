import React from 'react';
import { GameContainer, Item } from './style';

const TicTacToe = ({ currentGame, socket, isYourTurn, roomId }) => {
  const options = ['O', 'X'];

  const handleClick = (line, column) => {
    socket.emit('games:play', { line, column, roomId });
    console.log(line, column);
  };

  console.log(currentGame);

  return (
    <GameContainer>
      {currentGame &&
        Object.values(currentGame).map((line, lineNumber) =>
          line.map((item, columnNumber) => {
            const option = options[item];
            if (option) {
              return <Item isSelected>{option}</Item>;
            } else {
              if (!isYourTurn) {
                return <Item isSelected>{item}</Item>;
              }
              return (
                <Item onClick={() => handleClick(lineNumber, columnNumber)}>
                  {item}
                </Item>
              );
            }
          })
        )}
    </GameContainer>
  );
};

export default TicTacToe;
