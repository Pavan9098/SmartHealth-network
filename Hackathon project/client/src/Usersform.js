import React from 'react';
import { Button, Input, Form, DatePicker, Radio, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './UserRegistrationForm.css'; // Import the CSS file

const UserRegistrationForm = () => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log("data",data);
    try {
      await axios.post('http://localhost:4000/register-user', data);
      message.success('User registered successfully!');
      navigate('/userview');
    } catch (error) {
      message.error('Registration failed');
    }
  };

  return (
    <div className="user-registration-form">
      <h2>User Registration</h2>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Full Name">
          <Controller
            name="fullName"
            control={control}
            rules={{ required: 'Full Name is required' }}
            render={({ field }) => <Input {...field} />}
          />
          {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
        </Form.Item>

        <Form.Item label="Email">
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            }}
            render={({ field }) => <Input {...field} type="email" />}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </Form.Item>

        <Form.Item label="Password">
          <Controller
            name="password"
            control={control}
            rules={{
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters long' },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: 'Password must include uppercase, lowercase, number, and special character',
              },
            }}
            render={({ field }) => <Input.Password {...field} />}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </Form.Item>

        <Form.Item label="Confirm Password">
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: 'Confirm Password is required',
              validate: (value) => value === watch('password') || 'Passwords do not match',
            }}
            render={({ field }) => <Input.Password {...field} />}
          />
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
        </Form.Item>

        <Form.Item label="Phone Number">
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item label="Age">
          <Controller
            name="age"
            control={control}
            render={({ field }) => <Input {...field} type="number" />}
          />
        </Form.Item>

        <Form.Item label="Weight">
          <Controller
            name="weight"
            control={control}
            render={({ field }) => <Input {...field} type="number" />}
          />
        </Form.Item>

        <Form.Item label="Date of Birth">
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => <DatePicker {...field} />}
          />
        </Form.Item>

        <Form.Item label="Gender">
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Radio.Group {...field}>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
                <Radio value="other">Other</Radio>
              </Radio.Group>
            )}
          />
        </Form.Item>

        <Form.Item label="Address">
          <Controller
            name="address"
            control={control}
            render={({ field }) => <Input.TextArea {...field} />}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default UserRegistrationForm;
