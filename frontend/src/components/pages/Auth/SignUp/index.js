import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomInput from '../../../common/CustomInput';
import { SCHEMAS } from '@games_app/shared';
import { useMutation } from 'react-query';
import authService from '../../../../services/auth';
import CustomParagraph from '../../../common/CustomParagraph';
import CustomForm from '../../../common/CustomForm';
import CustomHeading1 from '../../../common/CustomHeading1';
import CustomButton from '../../../common/CustomButton';
import { StyledLink, StyledSection } from '../styles';
import { notifyError, notifySuccess } from '../../../../helpers/notifications';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../../../hooks/useAxios';

const SignUp = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SCHEMAS.USER.SIGNUP),
    mode: 'onChange'
  });

  const { api } = useAxios();
  const { mutate, isLoading } = useMutation(authService.signUp(api), {
    onSuccess: ({ data }) => {
      navigate('/signin');
      notifySuccess('Sign up', data?.message);
    },
    onError: ({ response: { data } }) =>
      notifyError('Sign up', data?.data?.message)
  });

  return (
    <StyledSection>
      <CustomHeading1>Sign Up</CustomHeading1>
      <CustomParagraph marginBottom="52px">
        Access the app by signing up
      </CustomParagraph>
      <CustomForm onSubmit={handleSubmit(mutate)}>
        <CustomInput
          name="name"
          placeholder="Name"
          control={control}
          error={errors.name}
        />

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
          Continue
        </CustomButton>
        <CustomParagraph marginBottom="20px" marginTop="20px">
          or
        </CustomParagraph>
        <StyledLink className="ant-btn ant-btn-block" to={'/signin'}>
          Sign In
        </StyledLink>
      </CustomForm>
    </StyledSection>
  );
};

export default SignUp;
