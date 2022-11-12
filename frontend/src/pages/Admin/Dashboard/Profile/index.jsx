import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleUser } from '../../../../api/user';
import { useNavigate } from 'react-router-dom';

export default function AdminProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user } = useSelector((store) => store.user);

  function handleClick() {
    dispatch(fetchSingleUser(user?._id));
    navigate(`/admin/dashboard/edit/${user?._id}`);
  }

  return (
    <Stack spacing={4}>
      <Typography variant='h4'>Profile</Typography>
      <Stack spacing={2}>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>Name:</span> {user.name}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>Email:</span> {user.email}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>Department:</span>{' '}
          {user.department}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>Date of birth:</span> {user.dob}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>Role:</span> {user.role}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>Address:</span> {user.address}
        </Typography>
        <Typography>
          <span style={{ fontWeight: 'bold' }}>Phone Number:</span>{' '}
          {user.phoneNumber}
        </Typography>
      </Stack>
      <Button
        variant='contained'
        sx={{ width: 'fit-content' }}
        onClick={handleClick}
      >
        Edit Profile
      </Button>
    </Stack>
  );
}
