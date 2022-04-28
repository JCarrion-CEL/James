import React, { useMemo, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import { useAuth } from '../../../../components/auth/useAuth'
import LoginModal from '../../../../components/LoginModal'

//img
import placeholder from '../../../../assets/images/placeholder.jpg'

const PrivacyPolicy = () => {
    const [showLogin, setShowLogin] = useState(false)
    const { 
        logout,
        sendSignInLinkToEmail,
        products,
        user,
        checkCurrentPlan, 
        hasPlan,
        subscription
    } = useAuth();
 
     useEffect(() =>{
        if (subscription && products) checkCurrentPlan(products, subscription)
     }, [subscription, products, checkCurrentPlan])

    const handleLoginFormCB = (email) => {
        if (email) {
            handleCloseLogin()
            sendSignInLinkToEmail(email, window.location.origin);
            logout();
        }
    }

    const handleCloseLogin = () => {
        setShowLogin(false)
    }

    const Content = useMemo(() => {
        if (user && hasPlan) {
            sendSignInLinkToEmail(user.email, window.location.origin);
            logout();
        }
        return (
            <>
            <div className="iq-breadcrumb-one  iq-bg-over iq-over-dark-50" style={{backgroundImage: `url(${placeholder})`}}>  
                 <Container fluid> 
                     <Row className="align-items-center">
                         <Col sm="12">
                             <nav aria-label="breadcrumb" className="text-center iq-breadcrumb-two">
                                 <h2 className="title">PAYMENT SUCCESSFUL</h2>
                                 <h5 className="main-bg">Your payment was successful!</h5>
                                 <h6 className="main-bg">We have emailed you the login instructions!</h6>
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
                                    <p className="my-3">Thank you for your purchase of Biosolids Pro 180!</p><br/>
                                </div>
                                <div className="mb-3">
                                    <p className="mb-0">Please carefully read the information below before getting started with the service:</p><br/>
                                </div>
                                <div className="mb-0 purchased-instructions">
                                    <ol class="list-group list-group-numbered text-left">
                                        <li>You have been emailed the login instructions, please do not share this link.</li>
                                        <li>Your six-month access period begins today</li>
                                        <li>When your six-month access period is over, you will have the option to renew the service for a discounted price; we will remind you of this in the weeks prior to the expiration of your link</li>
                                    </ol>
                                </div>
                                <div className="mb-0">
                                    <p className="my-3">We’re here to help. Email us with questions at info@celcertifications.com, and a certified instructor will get back to you within 48-hours.</p><br/>
                                </div>
                                <div className="mb-0">
                                    <p className="my-3">-CEL Training Staff</p><br/>
                                </div>                                
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
         </>)
    }, [user, hasPlan, sendSignInLinkToEmail, logout])

    return (
        <>
            {Content}
            <LoginModal handleSave={handleLoginFormCB} handleClose={handleCloseLogin} show={showLogin} />
        </>
    )
}

export default PrivacyPolicy;