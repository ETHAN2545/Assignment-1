'use client';

import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import NextLink from 'next/link';

export default function ManagerPage() {
  const handleSubmit = (event) => {
  console.log("handling submit");
  event.preventDefault();

  const data = new FormData(event.currentTarget);

   let email = data.get('email')
   let pass = data.get('pass')

   console.log("Sent email:" + email)
   console.log("Sent pass:" + pass)

   runDBCallAsync(`http://localhost:3000/api/login?email=${email}&pass=${pass}`)

 }; // end handle submit


async function runDBCallAsync(url) {

    const res = await fetch(url);
    const data = await res.json();

    if(data.data== "valid"){
      console.log("login is valid!")
    } else {
      console.log("not valid  ")
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5'}}>
      <AppBar position="static" color="yellow" elevation={1}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2}}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                border: '2px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              >
                <img
                  src="/images/mcdonalds.png"
                  style={{ width: 50, height: 60, borderRadius: 8}}
                  />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'red'}}>
                McDONALDS
              </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, maxWidth: 400}}>
            <TextField
              size="small"
              fullWidth
              placeholder="Search orders..."
              />
          </Box>

          <Avatar />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 3, mb: 4}}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRadius: 3,
              }}
              >
                <Typography variant="h6" sx={{ mb: 1}}>
                  Manager Dashboard
                </Typography>

                <Button variant="contained" fullWidth>
                  View Orders
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  component={NextLink}
                  href="/customer"
                  >
                    Return to Home Page
                  </Button>
              </Paper>
          </Grid>

          <Grid item xs={12} sm={8} md={9}>
            <Paper sx={{ p: 2}}>
              <Typography variant="h6" sx={{ mb: 2}}>
                Orders
              </Typography>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Ordered</TableCell>
                    <TableCell>Order Time</TableCell>
                    <TableCell>Order Item</TableCell>
                    <TableCell>Placed By</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>

  ); // end return

}