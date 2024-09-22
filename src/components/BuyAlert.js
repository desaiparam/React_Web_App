import React from "react";
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

export default function BuyAlert({selectedTicker}) {
    return (
        <Container  style={{margin:'2%'}}>
        <Alert variant={'success'} dismissible className="text-center">
          {selectedTicker} bought successfully
        </Alert>
    </Container>
    )
}