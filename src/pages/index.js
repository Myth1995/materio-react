// ** MUI Imports
import * as React from 'react';
import { Grid, TextField, Card, CardContent, FormControl, InputLabel, Select, MenuItem, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'


function createData(id, address, amount) {
  return { id, address, amount };
}
const Dashboard = () => {
  const [type, setType] = React.useState('');

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const approveBtn = (
    <Button variant='outlined'>Approve</Button>
  )

  const rows = [
    createData(1, "0x0112112124431232423232321213231564AF2dadd12", approveBtn),
    createData(2, "0x0112112124431232423232321213231564AF2dadd12", approveBtn),
    createData(3, "0x0112112124431232423232321213231564AF2dadd12", approveBtn),
    createData(4, "0x0112112124431232423232321213231564AF2dadd12", approveBtn),
    createData(5, "0x0112112124431232423232321213231564AF2dadd12", approveBtn),
  ];

  return (
    <ApexChartWrapper>
      <Card sx={{ position: 'relative' }}>
        <CardContent>
          <Grid container spacing={6}>
            <Grid item sm={12} md={2} alignItems="center" justifyContent="center">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Select Type"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Mogul</MenuItem>
                  <MenuItem value={20}>Investor</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={12} md={2} alignItems="center" justifyContent="center">
              <TextField fullWidth label='Amount' placeholder='Amount' />
            </Grid>

            <Grid item sm={12} md={6} alignItems="center" justifyContent="center">
              <TextField fullWidth label='Address To' placeholder='Address' />
            </Grid>

            <Grid item sm={12} md={2} sx={{ display: 'flex' }} alignItems="center" justifyContent="center">
              <Button variant='contained'>
                Send
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell algin="left" sx={{ width: "10%" }}>#</TableCell>
              <TableCell align="left">To</TableCell>
              <TableCell align="left" sx={{ width: "15%"}}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left" component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.address}</TableCell>
                <TableCell align="left">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ApexChartWrapper>
  )
}

export default Dashboard
