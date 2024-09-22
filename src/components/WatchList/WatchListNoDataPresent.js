import React from "react";
import Card from 'react-bootstrap/Card';

export default function WatchListNoDataPresent() {
    
    return (
        <Card bg={"warning"} className="justify-content-center align-items-center">
            <p>Current you don't have any stock in your watchlist</p>
        </Card>
    )
}