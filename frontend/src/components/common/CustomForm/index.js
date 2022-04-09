import React from 'react';
import StyledForm from './styles';

const CustomForm = ({ children, ...props }) => {
  return <StyledForm {...props}>{children}</StyledForm>;
};

export default CustomForm;
