'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Image from 'next/image';
import NextLink from 'next/link';

export default function MyLineChart() {

      const [products, setProducts] = useState(null)

      useEffect(() => {
        fetch('/api/getOrdersTotal')
        .then((res) => res.json())
        .then((data) => setProducts(data.total))
        }, [])

   return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5'}}>
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 3}}>

        <Stack direction="row" spacing={1} alignItems="center">
          <NextLink href="/customer">
          <Image src="/images/mcdonalds.png" width={45} height={45} alt="McDonalds logo" style={{ cursor: "pointer"}} />
          </NextLink>
          
          <Typography variant="h5" sx={{ color: 'red', fontWeight: 'bold'}}>
            McDONALDS
          </Typography>
        </Stack>

        <Avatar
        alt="Profile"
        sx={{ width: 45, height: 45, cursor: "pointer"}}/>
        </Toolbar>
        </AppBar>

        <Box sx={{ p: 4 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold"}}>
            Graph Data (Total Orders & Revenue)
          </Typography>

      <BarChart
      xAxis={[{ data: ['Orders'] }]}
      series={[{ data: [products] }]}
      height={300}
    />
  </Box>
  </Box>
   )
  }