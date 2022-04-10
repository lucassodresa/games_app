import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import { SCHEMAS } from '@games_app/shared';
import CustomInput from '../../../components/common/CustomInput';
import authService from '../../../services/auth';
import CustomParagraph from '../../../components/common/CustomParagraph';
import CustomForm from '../../../components/common/CustomForm';
import CustomHeading1 from '../../../components/common/CustomHeading1';
import CustomButton from '../../../components/common/CustomButton';
import { StyledLink, StyledSection } from '../styles';
import { notifyError, notifySuccess } from '../../../helpers/notifications';
import { loggedUserInfoState } from '../../../recoil/user';
import { setToken } from '../../../helpers/auth';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../../hooks/useAxios';

const SignIn = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SCHEMAS.USER.SIGNIN),
    mode: 'onChange'
  });
  const { api } = useAxios();
  const [, setLoggedUserInfo] = useRecoilState(loggedUserInfoState);

  const { mutate, isLoading } = useMutation(authService.signIn(api), {
    onSuccess: ({ data: { message, user, token } }) => {
      setLoggedUserInfo(user);
      setToken(token);
      notifySuccess('Sign In', message);
      navigate('/users');
    },
    onError: ({ response: { data } }) =>
      notifyError('Sign In', data?.data?.message)
  });

  return (
    <StyledSection>
      <CustomHeading1>Sign In</CustomHeading1>
      <CustomParagraph marginBottom="52px">
        Access the app by entering your credentials
      </CustomParagraph>
      <CustomForm onSubmit={handleSubmit(mutate)}>
        <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          error={errors.email}
        />

        <CustomInput
          name="password"
          placeholder="Password"
          control={control}
          error={errors.password}
          type="password"
        />

        <CustomButton
          type="primary"
          htmlType="submit"
          style={{ marginTop: '10px' }}
          block
          loading={isLoading}
        >
          Sign In
        </CustomButton>
        <CustomParagraph marginBottom="20px" marginTop="20px">
          or
        </CustomParagraph>
        <StyledLink className="ant-btn ant-btn-block" to={'/signup'}>
          Sign Up
        </StyledLink>
      </CustomForm>
    </StyledSection>
  );
};

export default SignIn;
