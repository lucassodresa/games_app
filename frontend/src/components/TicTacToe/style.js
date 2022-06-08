import styled from 'styled-components';

export const GameContainer = styled.ul`
  background-color: #002257;
  margin-top: 50px;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  height: 400px;
  align-items: center;
  justify-items: center;
  gap: 10px;
`;

export const Item = styled.li`
  background: white;
  color: #1890ff;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 55px;
  width: 100%;
  height: 100%;
  cursor: ${(props) => !props.isSelected && 'pointer'};
  transition: 0.3s background;
  &:hover {
    background: ${(props) => !props.isSelected && '#e6f2ff'};
  }
`;
