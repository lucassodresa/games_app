import React from 'react';
import StyledParagraph from './styles';

const CustomParagraph = ({ children, ...props }) => {
  return <StyledParagraph {...props}>{children}</StyledParagraph>;
};

export default CustomParagraph;
