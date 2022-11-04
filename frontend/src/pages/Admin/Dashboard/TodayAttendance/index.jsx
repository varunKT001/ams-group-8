import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodayAttendance } from '../../../../api/attendance';
import { capitalize } from '../../../../utils';

export function TodayAttendance() {
  const dispatch = useDispatch();
  const { todayAttendance } = useSelector((store) => store.attendance);

  React.useEffect(() => {
    dispatch(fetchTodayAttendance());
  }, []);

  return (
    <Stack spacing={4}>
      <Typography variant='h4'>Today's Attendance</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Roll Number</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align='right'>Attendance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todayAttendance.length > 0 &&
              todayAttendance.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell>{row.rollNumber}</TableCell>
                  <TableCell>{row.department}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{capitalize(row.role)}</TableCell>
                  <TableCell align='right'>
                    <Typography
                      fontWeight={600}
                      color={`${row.present ? 'green' : 'red'}`}
                    >
                      {row.present ? 'Present' : 'Absent'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
