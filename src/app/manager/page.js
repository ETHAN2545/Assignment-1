'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import NextLink from 'next/link';

export default function ManagerPage() {
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    fetch('/api/manager')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data)
      })
      .catch((err) => {
        console.error('Manager orders error:', err)
        setOrders([])
      })
  }, [])

  if (!orders) return <p>Loading...</p>

  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0)

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
                overflow: 'hidden',
              }}
              >
                <img
                  src="/images/mcdonalds.png"
                  style={{ width: 50, height: 60}}
                  alt="McDonalds logo"
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
        <Grid
         container
          spacing={3}
          alignItems="flex-start"
          >
          <Grid item xs={12} md={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRadius: 3,
                minHeight: 300,
              }}
              >
                <Typography variant="h6">
                  Manager Dashboard
                </Typography>

                <Button
                  variant="outlined"
                  fullWidth
                  component={NextLink}
                  href="/customer"
                  >
                    Return to Home Page
                  </Button>

                <Box sx={{ mt: 3}}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>
                    Summary
                  </Typography>
                <Typography variant="body2">
                  Total Orders: <strong>{totalOrders}</strong>
                </Typography>

                <Typography variant="body2">
                  Total Revenue: <strong>€{totalRevenue.toFixed(2)}</strong>
                </Typography>
                </Box>
              </Paper>
          </Grid>

          <Grid item xs={12} md={9}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
              >
            <Paper 
              sx={{ 
                p: 2,
                borderRadius: 3,
                width: '100%',
            }}
            >
              <Typography variant="h6" sx={{ mb: 2}}>
                Orders
              </Typography>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Ordered Products</TableCell>
                    <TableCell>Order Time</TableCell>
                    <TableCell>Total (€)</TableCell>
                    <TableCell>Placed By</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>{order._id}</TableCell>

                      <TableCell>
                        {order.items?.length
                          ? order.items.map(i => i.pname).join(', ')
                          : 'No items'}
                      </TableCell>

                      <TableCell>
                        {order.order_time &&
                          new Date(order.order_time).toLocaleString()}
                      </TableCell>

                      <TableCell>
                        €{(+order.total).toFixed(2)}
                      </TableCell>

                      <TableCell>{order.username}</TableCell>
                    </TableRow>
                  ))}

                  {orders.length == 0 && (
                    <TableRow>
                    <TableCell colSpan={5} align="center">
                      No orders found!
                    </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>

  ); // end return

}