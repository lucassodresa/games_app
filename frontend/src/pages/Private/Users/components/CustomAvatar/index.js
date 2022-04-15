import { Avatar, Badge } from 'antd';
import React from 'react';

const CustomAvatar = () => {
  return (
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
  );
};

export default CustomAvatar;
