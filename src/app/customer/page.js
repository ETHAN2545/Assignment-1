'use client'

import * as React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NextLink from 'next/link';

function putInCart(pname) {
  console.log("putting in cart: " + pname)
  fetch(`/api/putInCart?pname=${encodeURIComponent(pname)}`)
}

export default function CustomerPage() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    fetch('/api/products')
    .then((res) => res.json())
    .then((data) => setProducts(data))
    }, [])

    if (!products) return <p>Loading...</p>

  
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5'}}>
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 3}}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Image src="/images/mcdonalds.png" width={45} height={45} alt="McDonalds logo" />
          <Typography variant="h5" sx={{ color: 'red', fontWeight: 'bold'}}>
            McDONALDS
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton
            component={NextLink}
            href="/cart"
            size="large"
            aria-label="view cart"
            >
              <ShoppingCartIcon />
            </IconButton>

        <Avatar
        alt="Profile"
        sx={{ width: 45, height: 45, cursor: "pointer"}}
        />
        </Stack>
        </Toolbar>
        </AppBar>

          <Container maxWidth="lg" sx={{ mt: 4}}>
            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="flex-start"
              >

          {products.map((item, i) => (
            <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', textAlign: "center", borderRadius: "12px", boxShadow: 2,}}>
                {item.image && (
                  <CardMedia sx={{ position: 'relative', height: 180}}>
                    <Image
                    src={item.image}
                    alt={item.pname}
                    fill
                    style={{ 
                      objectFit: 'contain',
                      padding: "10px",
                    }}
                    />
                  </CardMedia>
                )}

                <CardContent sx={{ flexGrow: 1}}>
                  <Typography gutterBottom variant="h6">
                    {item.pname}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>

                  <Typography sx={{ mt: 1, fontWeight: "bold", fontSize: "18px"}}>
                    €{item.price}
                  </Typography>
                </CardContent>

                <CardActions sx={{ p: 2 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => putInCart(item.pname)}
                    sx={{ fontWeight: "bold"}}
                    >
                      ADD TO CART
                    </Button>
                </CardActions>
              </Card>
              </Grid>
          ))}
        </Grid>
        </Container>
        </Box>
  )
}
        



  


