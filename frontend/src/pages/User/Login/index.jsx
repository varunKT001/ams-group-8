import React from 'react';
import './user-login.css';
import { TextField, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import useForm from '../../../components/useForm/useForm';

const initialFValues = {
  userId: '',
  userPassword: '',
};

export const UserLogin = () => {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('userId' in fieldValues)
      temp.userId = fieldValues.userId.length == 5 ? '' : 'Invalid User Id';

    if ('userPassword' in fieldValues)
      temp.userPassword =
        fieldValues.userPassword.length >= 8
          ? ''
          : 'Minimum 8 characters required.';

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == '');
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);
  return (
    <div className='main'>
      <div className='card'>
        <div className='card-head'>User Login</div>
        <form action='' className='card-form'>
          <TextField
            label='User Id'
            name='userId'
            fullWidth
            required
            autoComplete='off'
            margin='dense'
            color='secondary'
            value={values.userId}
            onChange={handleInputChange}
            error={errors.userId ? true : false}
            helperText={errors.userId}
          />
          <TextField
            label='Password'
            type='password'
            fullWidth
            required
            name='userPassword'
            margin='dense'
            color='secondary'
            value={values.userPassword}
            onChange={handleInputChange}
            error={errors.userPassword ? true : false}
            helperText={errors.userPassword}
          />
          <Button
            variant='contained'
            id=''
            type='submit'
            style={{
              backgroundColor: '#D4EDDA',
              color: '#525759',
              margin: '0.5rem 0',
            }}
          >
            <b>Login</b>
          </Button>
        </form>
        <div className='change-page'>
          <Link to='/admin-login' className='toggle-link'>
            Admin Login →
          </Link>
        </div>
      </div>
    </div>
  );
};
