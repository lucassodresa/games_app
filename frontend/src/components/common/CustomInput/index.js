import { Form, Input } from 'antd';
import React from 'react';
import { Controller } from 'react-hook-form';

const CustomInput = ({ name, placeholder, control, error, type = 'text' }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Form.Item
          hasFeedback
          validateStatus={
            (field.value || error) && (error ? 'error' : 'success')
          }
          help={error?.message}
        >
          {type === 'password' ? (
            <Input.Password placeholder={placeholder} {...field} />
          ) : (
            <Input placeholder={placeholder} {...field} />
          )}
        </Form.Item>
      )}
    />
  );
};

export default CustomInput;
