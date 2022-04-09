import React from 'react';
import StyledHeading1 from './styles';

const CustomHeading1 = ({ children, ...props }) => {
  return <StyledHeading1 {...props}>{children}</StyledHeading1>;
};

export default CustomHeading1;
