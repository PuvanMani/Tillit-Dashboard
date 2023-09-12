import * as React from 'react';
import { Card, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
// import { CommonPriButton, CommonSecButton } from '../utils/Button';

export default function ProductCard({ data }) {
    const { Stock, MarketPrice, YourPrice, ImageURL, Shop, Name, Rati } = data;
    return (
        <Card sx={{ maxWidth: "100%", boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;", p: 1 }}>
            <CardMedia
                sx={{ height: "150px", width: "100%", objectFit: "cover", borderRadius: "12px" }}
                image={ImageURL[0]}
                title="green iguana"
            />
            <CardContent>
                {/* <Typography variant="body1" color="text.secondary" sx={{ fontSize: "11px" }}>
                    {Shop}
                </Typography> */}
                <Link to='/product-view' style={{ textDecoration: "none" }}>
                    <Typography gutterBottom variant="h5" component="h6" sx={{ fontSize: "12px", color: "#000", my: 0, width: "100%", textOverflow: "ellipsis" }}>
                        {Name}
                    </Typography>
                </Link>
                <Typography gutterBottom variant="h5" component="h5" sx={{ fontSize: "11px", mb: 0 }}>
                    <Typography variant='h6' sx={{ fontWeight: "400", fontSize: "13px" }}>Market Price : ₹ <span style={{ textDecoration: "line-through", fontWeight: "400", fontSize: "13px" }}>{MarketPrice}</span></Typography>
                    <Typography variant='h6' component='h6' sx={{ fontSize: "13px", color: "#000", my: .4 }}>Price : ₹{YourPrice} <Typography component='span' variant='span' sx={{ color: "red", fontSize: { xs: "9px", sm: "12px" }, textOverflow: "ellipsis" }}>{Math.round((((MarketPrice - YourPrice) / MarketPrice) * 100))}% off</Typography></Typography>
                    {/* <Rating defaultValue={Rati} readOnly size='small' /> */}
                </Typography>
            </CardContent>
        </Card>
    );
}