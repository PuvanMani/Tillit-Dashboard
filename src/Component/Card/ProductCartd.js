import * as React from 'react';
import { Card, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
// import { CommonPriButton, CommonSecButton } from '../utils/Button';

export default function ProductCard({ data }) {
    const { Stock, OriginalPrice, OfferPrice, Image, Shop, Title, Rati } = data;
    return (
        <Card sx={{ maxWidth: "100%", boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;", p: 1 }}>
            <CardMedia
                sx={{ height: "150px", width: "100%", objectFit: "cover", borderRadius: "12px" }}
                image={Image}
                title="green iguana"
            />
            <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: "11px" }}>
                    {Shop}
                </Typography>
                <Link to='/product-view' style={{ textDecoration: "none" }}>
                    <Typography gutterBottom variant="h5" component="h6" sx={{ fontSize: "12px", color: "#000", my: 0, width: "100%", textOverflow: "ellipsis" }}>
                        {Title}
                    </Typography>
                </Link>
                <Typography gutterBottom variant="h5" component="h5" sx={{ fontSize: "11px", mb: 0 }}>
                    <Typography variant='h6' sx={{ fontWeight: "400", fontSize: "13px" }}>MRP : ₹ <span style={{ textDecoration: "line-through", fontWeight: "400", fontSize: "13px" }}>{OriginalPrice.toLocaleString()}</span></Typography>
                    <Typography variant='h6' component='h6' sx={{ fontSize: "13px", color: "#000", my: .4 }}> ₹{OfferPrice.toLocaleString()} <Typography component='span' variant='span' sx={{ color: "red", fontSize: { xs: "9px", sm: "12px" }, textOverflow: "ellipsis" }}>{Math.round((((OriginalPrice - OfferPrice) / OriginalPrice) * 100))}% off</Typography></Typography>
                    <Rating defaultValue={Rati} readOnly size='small' />
                    {Stock < 2 ? <Typography variant='h6' component='h6' sx={{ fontSize: "10px", color: "red", fontWeight: "500", }}> (Only {Stock} Stock left)</Typography> : ""}
                </Typography>
            </CardContent>
        </Card>
    );
}