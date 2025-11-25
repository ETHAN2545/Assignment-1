'use client'

import { useState, useEffect } from 'react';

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
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Item>size=8</Item>
        </Grid>
        <Grid size={4}>
          <Item>size=4</Item>
        </Grid>
        <Grid size={4}>
          <Item>size=4</Item>
        </Grid>
        <Grid size={8}>
          <Item>size=8</Item>
        </Grid>
      </Grid>
    </Box>
  );

  //

// function for putting items into the shopping cart.

//

function putInCart(pname){
  console.log("putting in cart: " + pname)

  fetch("http://localhost:3000/api/putInCart?pname="+pname);
      <Button onClick={() => putInCart(item.pname)} variant="outlined"> Add to cart </Button>

}

return (
  <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5'}}>
    <AppBar position="static" color="default" elevation={1}>
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
            <Typography variant="caption">Img</Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold'}}>
            McDONALDS
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1, maxWidth: 400}}>
          <TextField
          size="small"
          fullWidth
          placeholder="Search..."
          />
        </Box>

      </Toolbar>
    </AppBar>
  </Box>
)

}