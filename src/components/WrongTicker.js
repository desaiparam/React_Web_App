import React from "react";
import { Container } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';

export default function WrongTicker() {

    return (
        <Container style={{margin:"5%"}}>
            <Alert variant={'danger'} dismissible className="text-center">
                No data found. Please enter a valid ticker
            </Alert>
        </Container>
    )
}