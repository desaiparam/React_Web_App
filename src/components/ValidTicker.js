import React from "react";
import { Container } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';

export default function ValidTicker() {

    return (
        <Container style={{margin:"5%"}}>
            <Alert variant={'danger'}  className="text-center">
                Please enter a valid ticker
            </Alert>
        </Container>
    )
}