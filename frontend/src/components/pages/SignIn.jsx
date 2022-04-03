import { Button, Input, Form } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import * as yup from 'yup';

const StyledSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;

const StyledForm = styled.form`
  margin-left: auto;
  margin-right: auto;
  max-width: 400px;
  width: 100%;
`;

const StyledH1 = styled.h1`
  margin-top: -40px;
  margin-bottom: 45px;
  text-align: center;
  font-weight: bold;
  font-size: 32px;
  color: #002257;
`;

const StyledP = styled.p`
  color: #9cadbf;
  font-size: 14px;
  margin-top: ${(props) => props.marginTop || 0};
  margin-bottom: ${(props) => props.marginBottom || 0};
  text-align: center;
`;

const StyledButton = styled(Button)`
  background: #e6f2ff;
  color: #0079ff;
  border: none;

  &:hover {
    filter: brightness(0.95);
  }
`;

const schema = yup
  .object({
    name: yup.string().min(4).max(255).required(),
    email: yup.string().email().min(4).max(255).required(),
    password: yup.string().min(4).max(255).required()
  })
  .required();

const SignIn = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <StyledSection>
      <StyledH1>Sign Up</StyledH1>
      <StyledP marginBottom="52px">Access the app by signing up</StyledP>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Form.Item
          hasFeedback
          validateStatus={errors.name && 'error'}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input placeholder="Name" {...field} />}
          />
        </Form.Item>

        <Form.Item
          hasFeedback
          validateStatus={errors.email && 'error'}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            defaultValue=""
            control={control}
            render={({ field }) => <Input placeholder="Email" {...field} />}
          />
        </Form.Item>

        <Form.Item
          hasFeedback
          validateStatus={errors.password && 'error'}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Input.Password placeholder="Password" {...field} />
            )}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginTop: '10px' }}
          block
        >
          Continue
        </Button>
        <StyledP marginBottom="20px" marginTop="20px">
          or
        </StyledP>
        <StyledButton block>Sign In</StyledButton>
      </StyledForm>
    </StyledSection>
  );
};

export default SignIn;
