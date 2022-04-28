import React, { useState, useMemo, useCallback, useEffect } from 'react'

import { Container, Row, Col, Table, Button, Spinner } from 'react-bootstrap'
import { useAuth } from '../../../components/auth/useAuth'
import LoginModal from '../../../components/LoginModal'
import MessageModal from '../../../components/MessageModal'
import LoadingContent from './../../../components/LoadingContent';

const pricingLists = [
    {
        title: 'Latest Bisolids Regulations',
        icon:  'fa fa-times-circle',
        icon1: 'fa fa-check-circle',
        icon2: 'fa fa-times-circle'
    },
    {
       title: 'Biosolids Management Practices',
       icon: 'fa fa-times-circle', 
       icon1: 'fa fa-check-circle',
       icon2: 'fa fa-check-circle'
    },
    {
        title: 'Agricultural Land Application',
        icon: 'fa fa-times-circle',
        icon1: 'fa fa-check-circle',
        icon2: 'fa fa-check-circle'
    },
    {
       title: 'New Biosolids Topics',
       icon: 'fa fa-times-circle',
        icon1: 'fa fa-check-circle',
        icon2: 'fa fa-check-circle'
    },
    {
       title: 'Exceptional Quality (EQ) Biosolids',
       icon:  'fa fa-times-circle',
       icon1: 'fa fa-check-circle',
       icon2: 'fa fa-times-circle'
    }
]


const Pricing = () => { 
    const [pricing] = useState('pricing')
    const [priceId, setPriceId] = useState()
    const [isSubscribing, setisSubscribing ] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [subMessage, setSubMessage] = useState()
    const [showMessageModal, setShowMessageModal] = useState(false)
    const [loadingCheckout, setLoadingCheckout] = useState(false) // -1 0 1 three states

    // const [subscription, setSubscription] = useState(null);
    const { 
        sendSignInLinkToEmail,
        products,
        user,
        loadCheckout,
        createUser,
        hasPlan,
    } = useAuth();


    //  useEffect(() =>{
    //      debugger
    //     if (subscription && products) checkCurrentPlan(products, subscription)
    //  }, [subscription, products, checkCurrentPlan])

    useEffect(() => {
        debugger
       if (user && loadingCheckout) {
         if (user.uid) {
            loadCheckout(priceId, user)
            // .then(s => {
            //     console.log(s)
            //     setLoadingCheckout(false)
            // })
         }
       }

    }, [user, loadingCheckout, setLoadingCheckout, priceId, loadCheckout])
  
    const handleLoginFormCB = async (email) => {
        if (email) {
            let msg
            setLoadingCheckout(true)
            setShowLogin(false)
           createUser(email)
           .then(u => {
               debugger
               setisSubscribing(false)
           })
           .catch((error) => {
                setisSubscribing(false)
                if (error.code === "auth/email-already-in-use") {
                console.log("The email address is already in use");
                sendSignInLinkToEmail(email, window.location.origin);
                msg = `You already have an account with us. We emailed you the login instructions to ${email}`
                setSubMessage(msg)
                setShowMessageModal(true)
                } else if (error.code === "auth/invalid-email") {
                    setShowLogin(false)
                    console.log("The email address is not valid.");
                    msg = "The email address is not valid."
                    setSubMessage(msg)
                    setShowMessageModal(true)
                }
            //  else if (error.code == "auth/operation-not-allowed") {
            //   console.log("Operation not allowed.");
            // } else if (error.code == "auth/weak-password") {
            //   console.log("The password is too weak.");
            // }
          });
        }
    }

    const handleCloseLogin = () => {
        setShowLogin(false)
        setisSubscribing(false)
    }

    const startSubscription = useCallback(async (priceId) => {
      // 1. Trigger stripe(request email)
      // 2. Automatic generate 
      try {
        setisSubscribing(true)
        setShowLogin(true)
        setPriceId(priceId)
      }
      catch (e) {
        console.log(e)
      }
    }, [setisSubscribing, setShowLogin, setPriceId])
    
    const renewSubscription = async (priceId) => {
        try {
            setisSubscribing(true)
            setPriceId(priceId)
          }
          catch (e) {
            console.log(e)
          }
    }

    // useMemo(() => {
    //     debugger
    //     if (isSubscribing && !isAuthenticating && user) {
    //         setLoadingCheckout(true)
    //         loadCheckout(priceId, user).then(() => {
    //             setLoadingCheckout(false)
    //         })
    //     }

    // }, [user, isAuthenticating, isSubscribing, setisSubscribing, loadCheckout, priceId])

    const SubscribeButton = useMemo(() => {
        if (hasPlan) {
            // change text to Renew Subscription
            return  <Button disabled={hasPlan} className="btn btn-hover iq-button" onClick={() => renewSubscription(products.prices.priceId)}>Subscribed</Button>
        } else if (products) {
            return  <Button className='btn btn-hover iq-button' onClick={() => startSubscription(products.prices.priceId)}>Subscribe</Button>
        } 
    }, [products, hasPlan, startSubscription])

    const handleCloseMessageModal = () => {
        setShowMessageModal(false)
    }

    return (
        <>
            {loadingCheckout && <LoadingContent />}
            <LoginModal handleSave={handleLoginFormCB} handleClose={handleCloseLogin} show={showLogin} />
            <MessageModal msg={subMessage} handleClose={handleCloseMessageModal} show={showMessageModal} />           
            { !loadingCheckout && <main id="main" className="site-main">
                <Container>
                    <Row>
                        <Col lg="12" sm="12">
                            <div className="iq-pricing-card">
                                <div className="table-responsive iq-pricing pt-2">
                                    <Table id="my-table" className="table" data-active="premium">
                                        <thead>
                                            <tr>
                                                <th className="text-center iq-price-head"></th>
                                                {/* <th className="text-center iq-price-head free">
                                                    <div className={`iq-price-box ${pricing === 'Basic' ? 'active' : ''} `} onClick={() =>setPricing('Basic')}>
                                                        <h3 className="iq-price-rate text-white">$0<small> / Month</small></h3>
                                                        <span className="type">Free</span>
                                                    </div>
                                                </th> */}
                                                <th className="text-center iq-price-head premium">
                                                    <div className={`iq-price-box  ${pricing === 'pricing' ? 'active' : ''}`}>
                                                        <h3 className="iq-price-rate text-white" >$300<small> / 3 Months</small></h3>
                                                        <span className="type">Premium</span>
                                                    </div>
                                                </th>
                                                {/* <th className="text-center iq-price-head basic">
                                                    <div className={`iq-price-box ${pricing === 'Platinum' ? 'active' : ''}`} onClick={() =>setPricing('Platinum')}>
                                                        <h3 className="iq-price-rate text-white" >$19<small> / Month</small></h3>
                                                        <span className="type">Basic</span>
                                                    </div>
                                                </th> */}
                                            </tr>
                                        </thead>
                                        <tbody> 
                                            {pricingLists.map((item) => (               
                                                <tr key={item.title}>
                                                    <th className="text-center pricing-title" scope="row"> {item.title}</th>
                                                    {/* <td className={`text-center iq-child-cell ${pricing === 'Basic' ? 'active' : ''}`}>
                                                        <i className={`${item.icon}`}></i>
                                                    </td> */}
                                                    <td className={`text-center iq-child-cell ${pricing === 'pricing' ? 'active' : ''}`}>
                                                        <i className={`${item.icon1}`}></i>
                                                    </td>
                                                    {/* <td className={`text-center iq-child-cell ${pricing === 'Platinum' ? 'active' : ''}`}>
                                                        <i className={`${item.icon2}`}></i>
                                                    </td> */}
                                                </tr>
                                            ))}
                                            <tr>
                                 <th className="text-center iq-price-footer"></th>
                                 {/* <td className="text-center iq-price-footer">
                                    <div className="align-items-center r-mb-23" data-animation-in="fadeInUp" data-delay-in="1.3">
                                       <Link to="/extra-pages/sign-up" className="btn btn-hover iq-button">Subscribe</Link>
                                    </div>
                                 </td> */}
                                 <td className="text-center iq-price-footer active">
                                    <div className="align-items-center r-mb-23" data-animation-in="fadeInUp" data-delay-in="1.3">
                                       {/* <Link to="/extra-pages/sign-up" className="btn btn-hover iq-button">Subscribe</Link> */}
                                     <div className="plans">
                                        <div>
                                        </div>
                                            {SubscribeButton}
                                            { (!SubscribeButton || isSubscribing) && <Button variant="dark" disabled>
                                                <Spinner
                                                as="span"
                                                variant="light"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                animation="border"/>
                                                Loading...
                                            </Button> }
                                        </div>
                                    </div>
                                 </td>
                                 {/* <td className="text-center iq-price-footer">
                                    <div className="align-items-center r-mb-23" data-animation-in="fadeInUp" data-delay-in="1.3">
                                       <Link to="/extra-pages/sign-up" className="btn btn-hover iq-button">Subscribe</Link>
                                    </div>
                                 </td> */}
                              </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </Col>
                    </Row>   
                </Container>
            </main> }
        </>
    )
}
export default Pricing;