import { Button } from 'antd';
import React from 'react';
import StyledButton from './styles';

const CustomButton = ({ children, ...props }) => {
  return !props.type === 'primary' ? (
    <StyledButton {...props}>{children}</StyledButton>
  ) : (
    <Button {...props}>{children}</Button>
  );
};

export default CustomButton;
