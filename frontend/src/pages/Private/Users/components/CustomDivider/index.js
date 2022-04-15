import { Badge, Divider } from 'antd';
import React from 'react';

const CustomDivider = ({ icon, text, count, status, ...props }) => {
  return (
    <Divider orientation="left" {...props}>
      <Badge status={status} count={count} showZero>
        {icon}
        <span style={{ marginLeft: '5px', paddingRight: '10px' }}>{text}</span>
      </Badge>
    </Divider>
  );
};

export default CustomDivider;
