import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Typography, TextField, Select, MenuItem } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { register, updateUser } from '../../../../api/user';
import { generatePassword } from '../../../../utils';
import { NewUserCredentialModal } from '../../../../components/NewUserCredentialModal';
import { useNavigate } from 'react-router-dom';

const initialState = () => {
  return {
    name: '',
    dob: '',
    department: '',
    address: '',
    phoneNumber: '',
    rollNumber: '',
    email: '',
    role: 'user',
    password: '',
  };
};

export default function RegisterNewUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, editing, editingUser } = useSelector(
    (store) => store.user
  );
  const [user, setUser] = useState(initialState);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function handleSubmit() {
    if (!editing) {
      dispatch(register(user));
      setUser({ ...initialState(), password: generatePassword() });
    } else {
      dispatch(updateUser(user));
      navigate('/admin/dashboard');
    }
  }

  useEffect(() => {
    if (!editing) setUser({ ...initialState(), password: generatePassword() });
  }, [isLoading]);

  useEffect(() => {
    if (editing) setUser(editingUser);
  }, [editing]);

  return (
    <Stack spacing={4} sx={{ minWidth: '35%', maxWidth: '50%' }}>
      <NewUserCredentialModal />
      <Typography variant='h6'>
        {editing ? `Edit ${editingUser.name}'s Details` : 'Register New User'}
      </Typography>
      {/* /////////////////// */}
      {/* //// USER NAME //// */}
      {/* /////////////////// */}
      <Stack spacing={1}>
        <Typography>Name</Typography>
        <TextField
          size='small'
          name='name'
          value={user.name}
          onChange={handleChange}
        />
      </Stack>
      {/* /////////////// */}
      {/* //// EMAIL //// */}
      {/* /////////////// */}
      <Stack spacing={1}>
        <Typography>Email</Typography>
        <TextField
          size='small'
          name='email'
          value={user.email}
          onChange={handleChange}
        />
      </Stack>
      {/* ///////////// */}
      {/* //// DOB //// */}
      {/* ///////////// */}
      <Stack spacing={1}>
        <Typography>Date of birth</Typography>
        <TextField
          size='small'
          name='dob'
          value={user.dob}
          placeholder='MM-DD-YY or MM/DD/YY'
          onChange={handleChange}
        />
      </Stack>
      {/* ///////////////////// */}
      {/* //// ROLL NUMBER //// */}
      {/* ///////////////////// */}
      <Stack spacing={1}>
        <Typography>Roll Number</Typography>
        <TextField
          size='small'
          name='rollNumber'
          value={user.rollNumber}
          onChange={handleChange}
        />
      </Stack>
      {/* //////////////////// */}
      {/* //// DEPARTMENT //// */}
      {/* //////////////////// */}
      <Stack spacing={1}>
        <Typography>Department</Typography>
        <TextField
          size='small'
          name='department'
          value={user.department}
          onChange={handleChange}
        />
      </Stack>
      {/* ///////////////// */}
      {/* //// ADDRESS //// */}
      {/* ///////////////// */}
      <Stack spacing={1}>
        <Typography>Address</Typography>
        <TextField
          size='small'
          name='address'
          value={user.address}
          onChange={handleChange}
        />
      </Stack>
      {/* //////////////////// */}
      {/* //// PHONE NUMBER //// */}
      {/* //////////////////// */}
      <Stack spacing={1}>
        <Typography>Phone Number</Typography>
        <TextField
          size='small'
          name='phoneNumber'
          value={user.phoneNumber}
          onChange={handleChange}
        />
      </Stack>
      {/* ////////////// */}
      {/* //// ROLE //// */}
      {/* ////////////// */}
      <Stack spacing={1}>
        <Typography>Role</Typography>
        <Select
          size='small'
          name='role'
          value={user.role}
          onChange={handleChange}
        >
          <MenuItem value='user'>User</MenuItem>
          <MenuItem value='admin'>Admin</MenuItem>
        </Select>
      </Stack>
      <LoadingButton
        loading={isLoading}
        variant='contained'
        sx={{ width: 'fit-content' }}
        onClick={handleSubmit}
      >
        Submit
      </LoadingButton>
    </Stack>
  );
}
