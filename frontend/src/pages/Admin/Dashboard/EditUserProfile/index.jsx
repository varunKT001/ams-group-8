import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack, Typography, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { deleteUser, fetchSingleUser } from '../../../../api/user';
import { NewUserCredentialModal } from '../../../../components/NewUserCredentialModal';
import { useNavigate } from 'react-router-dom';

export default function EditUserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, allUsers } = useSelector((store) => store.user);
  const [rollNumber, setRollNumber] = useState('');

  function handleChange(e) {
    const value = e.target.value;
    setRollNumber(value);
  }

  function handleSubmit() {
    const user = allUsers.find((user) => user.rollNumber === rollNumber);
    dispatch(fetchSingleUser(user?._id));
    navigate(`/admin/dashboard/edit/${user?._id}`);
  }

  return (
    <Stack spacing={4} sx={{ minWidth: '35%', maxWidth: '50%' }}>
      <NewUserCredentialModal />
      <Typography variant='h6'>Edit User Profile</Typography>
      {/* ///////////////////// */}
      {/* //// ROLL NUMBER //// */}
      {/* ///////////////////// */}
      <Stack spacing={1}>
        <Typography>Roll Number</Typography>
        <TextField
          size='small'
          name='rollNumber'
          value={rollNumber}
          onChange={handleChange}
        />
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
