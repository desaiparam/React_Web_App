import React from "react";
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

export default function AddWatchlist({selectedTicker}) {
    return (
        <Container style={{margin:'2%'}}>
        <Alert variant={'success'} dismissible className="text-center">
          {selectedTicker} added  to Watchlist
        </Alert>
    </Container>
    )
}