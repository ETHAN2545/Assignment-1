'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import NextLink from "next/link"

export default function CartPage() {
  const[items, setItems] = useState(null)

  function loadCart() {
    fetch('/api/cart')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Cart error:", err))
  }

  useEffect(() => {
    loadCart()
  }, [])

  async function removeItem(id) {
    try {
      await fetch(`/api/cart?id=${id}`, { method: `DELETE`})
      loadCart()
    } catch (err) {
      console.error('Remove error:', err)
    }
  }

  if (!items) return <p>Loading...</p>

  const total = items.reduce((sum, item) => sum + Number(item.price || 0), 0)

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5"}}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 3}}>
          <Stack direction="row" spacing={1} alignItems="center">
           <NextLink href="/customer">
          <Image src="/images/mcdonalds.png" width={45} height={45} alt="McDonalds logo" style={{ cursor: "pointer"}} />
          </NextLink>
              <Typography variant="h5" sx={{ color: "red", fontWeight: "bold"}}>
                McDONALDS
              </Typography>
          </Stack>

          <Avatar
            alt="Profile"
            sx={{ width: 45,height: 45}}
            />
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4}}>
        <Typography variant="h5" sx={{ mb: 2}}>
          Cart
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Product</TableCell>
                <TableCell align="right">Price (€)</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    {item.image && (
                      <Box sx={{ width: 60, height: 60, position: "relative"}}>
                        <Image
                          src={item.image}
                          alt={item.pname}
                          fill
                          style={{ objectFit: "contain"}}
                          />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography>{item.pname}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    €{Number(item.price).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeItem(item._id)}
                      >
                        Remove
                      </Button>
                  </TableCell>
                </TableRow>
              ))}

              {items.length == 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Your cart is empty.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 3}}
          >

            <Grid item>
              <Typography variant="h6">
                Total: €{total.toFixed(2)}
              </Typography>
            </Grid>

            <Grid item>
              <Button
                variant="contained"
                color="primary"
                component={NextLink}
                href="/checkout"
                >
                  Checkout
                </Button>
            </Grid>
          </Grid>
      </Container>
    </Box>
  )
}