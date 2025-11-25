'use client'

import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function CustomerPage() {

  
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5'}}>
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2}}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
          <Box
          component="img"
          src="/images/mcdonalds.png"
          sx={{
            width: 40, height: 40}}
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'red'}}>
            McDONALDS
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1, maxWidth: 400}}>
          <TextField
          size="small"
          fullWidth
          placeholder="Search products..."
          />
        </Box>

        <Avatar />
      </Toolbar>
    </AppBar>

    <Container maxWidth="lg" sx={{ mt: 3, mb: 4}}>
      <Paper
        elevation={2}
        sx={{
          mb: 3,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        >
          <Typography variant="h6">Current Weather</Typography>
          <Box sx={{ display: 'flex', gap: 2}}></Box>
        </Paper>

        <CardActions>
          <Button
            fullWidth
            onClick={() => putInCart(item.pname)} variant="outlined"> ADD TO CART </Button>
        </CardActions>
    </Container>
  </Box>
)

}

  //

// function for putting items into the shopping cart.

//

function putInCart(pname){
  console.log("putting in cart: " + pname)
  fetch("http://localhost:3000/api/putInCart?pname="+pname);
}

