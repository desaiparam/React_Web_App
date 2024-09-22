import React from "react";
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';

export default function SellAlert({selectedTicker}) {
    
    return (
        <Container  style={{margin:'2%'}}>
        <Alert variant={'danger'} dismissible className="text-center">
          {selectedTicker} sold successfully
        </Alert>
    </Container>
    )
}