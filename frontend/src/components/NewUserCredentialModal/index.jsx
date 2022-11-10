import React, { useEffect, useState } from 'react';
import { Typography, Stack, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeNewUserModal } from '../../redux/slices/userSlice';
import { SimpleDialog } from '../SimpleDialog';

export function NewUserCredentialModal() {
  const dispatch = useDispatch();
  const { newUser, isNewUserModalOpen } = useSelector((store) => store.user);
  const [qrCode, setQRcode] = useState('');

  useEffect(() => {
    setQRcode(
      `https://api.qrserver.com/v1/create-qr-code/?data=${newUser?._id}&size=128x128&bgcolor=ffffff`
    );
  }, [newUser]);

  return (
    <SimpleDialog
      title={`${newUser?.name}'s credentials`}
      open={isNewUserModalOpen}
      onClose={() => dispatch(closeNewUserModal())}
    >
      <Stack
        spacing={3}
        sx={{ paddingLeft: 3, paddingRight: 3, paddingBottom: 3 }}
      >
        <Typography>Password: {newUser?.password}</Typography>
        <img src={qrCode} alt='qrcode' />
        <Button variant='contained'>
          <a
            style={{ color: '#ffffff', textDecoration: 'none' }}
            href={qrCode}
            download={`${newUser?.name}-QR.png`}
          >
            Download
          </a>
        </Button>
      </Stack>
    </SimpleDialog>
  );
}
