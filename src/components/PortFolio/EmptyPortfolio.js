import { Alert } from "@mui/material";
import React from "react";
import Card from 'react-bootstrap/Card';
export default function EmptyPortfolio() {

    return (
        <Alert variant="warning">
            Currently you don't have any Stock in your Watchlist.
        </Alert>
    )
}