'use client';

import { useState, useEffect } from 'react'
import Image from 'next/image'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent';
import NextLink from 'next/link';

export default function CheckoutPage() {
  const [items, setItems] = useState(null)
  const [confirmingOrder, setConfirmingOrder] = useState(false)

  function loadCart() {
    fetch('/api/cart')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error('Checkout cart error:', err))
  }

  useEffect(() => {
    loadCart()
  }, [])

  async function handleConfirmation() {
    try {
      setConfirmingOrder(true)
      const res = await fetch('/api/checkout')
      const data = await res.json()
      console.log('Checkout API response:', data)

      if (data.data == 'ok') {
        alert('Order placed successfully!')
        window.location.href = '/customer'
      } else if ( data.data == 'empty') {
        alert('Your cart is empty!')
      } 
    } finally {
      setConfirmingOrder(false)
    }
  }

  if (!items) return <p>Loading...</p>

  const total = items.reduce((sum, item) => sum + Number(item.price || 0), 0)

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
            sx={{ width: 45, height: 45}}
            />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: 'center'}}>
          Checkout
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {items.map((item) => (
            <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: '12px',
                  boxShadow: 2,
                  textAlign: 'center'
                }}
                >
                  <Box sx={{ position: 'relative', height: 120, pt: 1}}>
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.pname}
                        fill
                        style={{ objectFit: 'contain', padding: '8px'}}
                        />
                    )}
                  </Box>

                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold'}}>
                      {item.pname}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                    <Typography sx={{ mt: 1, fontWeight: 'bold'}}>
                      Price: €{Number(item.price).toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: 1
                    </Typography>
                  </CardContent>
                </Card>
            </Grid>
          ))}

          {items.length == 0 && (
            <Grid item xs={12}>
              <Typography align="center">Your cart is empty!</Typography>
            </Grid>
          )}
          </Grid>

          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
            >
              <Box
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: '12px',
                  bgcolor: 'white',
                  boxShadow: 1,
                  minWidth: 220,
                }}
                >
                  <Typography variant="h6">Total: €{total.toFixed(2)}</Typography>
                </Box>

                <Button
                  variant="contained"
                  sx={{ minWidth: 160, borderRadius: '24px'}}
                  disabled={confirmingOrder || items.length == 0}
                  onClick={handleConfirmation}
                  >
                    {confirmingOrder ? 'Confirming...' : 'Confirm'}
                  </Button>
            </Box>
      </Container>
    </Box>
  )
}