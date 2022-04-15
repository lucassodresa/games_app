import { List } from 'antd';
import React from 'react';
import StyledButton from './styles';

const ListItem = ({ actions, title, description, avatar }) => {
  return (
    <List.Item actions={actions}>
      <List.Item.Meta title={title} description={description} avatar={avatar} />
    </List.Item>
  );
};

export default ListItem;
