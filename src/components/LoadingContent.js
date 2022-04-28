import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';

//img
const Loading = ({msg=null}) => {
    return (
        <div className="iq-breadcrumb-one  iq-bg-over iq-over-dark-50">  
            <Container fluid> 
                <Row className="align-items-center">
                    <Col sm="12">
                        <nav aria-label="breadcrumb" className="text-center iq-breadcrumb-two">
                            <h2 className="title">Loading Content</h2>
                        </nav>
                    </Col>
                </Row>
                <Row className="align-items-center">
                    <Col sm="12">
                        <nav aria-label="breadcrumb" className="text-center iq-breadcrumb-two">
                        <Spinner animation="border" size="sm" variant="danger"><span className="visually-hidden">Loading...</span></Spinner>
                        <Spinner animation="border" variant="primary" />
                        <Spinner animation="grow" size="sm" variant="danger"/>
                        <Spinner animation="grow" variant="primary" />                                 
                    </nav>
                    </Col>
                </Row>
            </Container>
    </div>
    )
}

export default Loading;