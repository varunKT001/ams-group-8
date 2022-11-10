import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import QRScanner from 'react-qr-scanner';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { markAttendance } from '../../api/attendance';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Scanner() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [id, setId] = useState('');

  function handleScan(data) {
    if (data) setId(data.text);
  }

  function handleError(error) {
    toast.error(error);
  }

  useEffect(() => {
    let timeout = null;
    if (id) {
      dispatch(markAttendance(id));
      timeout = setTimeout(() => window.location.reload(), 2000);
    }
    return () => clearTimeout(timeout);
  }, [id]);

  if (!user.data) {
    return (
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <Stack spacing={3}>
          <Typography>
            Login as an Admin to activate the QR Code Scanner
          </Typography>
          <Link
            to='/admin/login'
            style={{ width: '100%', display: 'grid', placeItems: 'center' }}
          >
            <Button variant='contained' sx={{ width: 'fit-content' }}>
              Login
            </Button>
          </Link>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'
    >
      <Typography variant='h3'>Scan your QR Code</Typography>
      <Stack spacing={2}>
        <QRScanner
          delay={1000}
          style={{ height: 512, width: 512 }}
          onError={handleError}
          onScan={handleScan}
        />
        <Stack alignItems={'flex-start'} sx={{ width: '100%' }}>
          <Link to='/admin/login' style={{ width: '100%' }}>
            <Button variant='contained' sx={{ width: '100%' }}>
              Login
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}
