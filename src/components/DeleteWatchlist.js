import React from "react";
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

export default function DeleteWatchlist({selectedTicker}) {
    
    return (
      
        <Container  style={{margin:'2%'}}>
        <Alert variant={'danger'} dismissible className="text-center">
          {selectedTicker} removed  from Watchlist
        </Alert>

    </Container>
    )
}