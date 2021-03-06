import styled from 'styled-components';
import { device } from '../../../constants/mediaQueries';

const StyledForm = styled.form`
  margin-left: auto;
  margin-right: auto;
  max-width: 400px;
  width: 100%;
  @media ${device.mobileL} {
    padding: 20px;
  }
`;

export default StyledForm;
