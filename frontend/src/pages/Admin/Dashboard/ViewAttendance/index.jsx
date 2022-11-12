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
import { fetchMonthlyAttendance } from '../../../../api/attendance';
import { capitalize } from '../../../../utils';

export function ViewAttendance() {
  const dispatch = useDispatch();
  const { monthlyAttendance } = useSelector((store) => store.attendance);

  React.useEffect(() => {
    dispatch(fetchMonthlyAttendance());
  }, []);

  return (
    <Stack spacing={4}>
      <Typography variant='h4'>Monthly Attendance</Typography>
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
              <TableCell align='right'>Attendance (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {monthlyAttendance.length > 0 &&
              monthlyAttendance.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='row'>
                    {row.user.name}
                  </TableCell>
                  <TableCell>{row.user.rollNumber}</TableCell>
                  <TableCell>{row.user.department}</TableCell>
                  <TableCell>{row.user.email}</TableCell>
                  <TableCell>{row.user.phoneNumber}</TableCell>
                  <TableCell>{capitalize(row.user.role)}</TableCell>
                  <TableCell align='right'>
                    <Typography
                      fontWeight={600}
                      color={`${row.average > 75 ? 'green' : 'red'}`}
                    >
                      {Math.floor(row.average)}
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
