import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

//img
import placeholder from '../../../../assets/images/placeholder.jpg'

const PrivacyPolicy = () => {
    return (
        <>
           <div className="iq-breadcrumb-one  iq-bg-over iq-over-dark-50" style={{backgroundImage: `url(${placeholder})`}}>  
                <Container fluid> 
                    <Row className="align-items-center">
                        <Col sm="12">
                            <nav aria-label="breadcrumb" className="text-center iq-breadcrumb-two">
                                <h2 className="title">PAYMENT UNSUCCESSFUL</h2>
                               <h5 className="main-bg">Your payment was NOT successful</h5>
                             </nav>
                        </Col>
                    </Row> 
                </Container>
            </div>
            <main id="main" className="site-main">
                <Container>
                    <Row>
                        <Col lg="12" sm="12" className='text-center'>
                            <div className="iq-privacy-policy">
                                <div className="mb-3">
                                    <h4 className="mb-3">Hello</h4>
                                    <p className="my-3">Thank you for your interest in Biosolids Pro 180. Unfortunately, there has been an issue processing your payment.</p><br/>
                                </div>
                                <div className="mb-3">
                                    <p className="mb-0">To ensure that you are able to access Biosolids Pro 180, you will have to update your credit card information.</p><br/>
                                </div>
                                <div className="mb-0">
                                    <p className="my-3">-CEL Training Staff</p><br/>
                                </div>                                
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}

export default PrivacyPolicy;