import React,{useState, useEffect, useMemo} from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {rtlModeAction, getRtlMode} from '../../../../store/mode/rtlmode'
import { useAuth } from './../../../../components/auth/useAuth';
import MessageModal from './../../../../components/MessageModal';

const mapStateToProps = (state) => {
    return {
        rtlMode: getRtlMode(state)
    };


}
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        {
            rtlModeAction
        },
        dispatch
    )
})

const Login = (props) => {

    const [show] = useState(false);
    const { 
        signInWithEmailLink,
        sendSignInLinkToEmail
    } = useAuth();
    let history = useHistory()
    const [email, setEmail] = useState()
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [signingInError, setSigningInError] = useState(null)
    const [subMessage, setSubMessage] = useState()
    const [showMessageModal, setShowMessageModal] = useState()
    const [sentLoginInstructions, setSentLoginInstructions] = useState()

    useEffect(() => {
        const rtlMode = sessionStorage.getItem('rtl-mode');
            if(rtlMode===null){
                props.rtlModeAction(props.rtlMode)
            }
            else{
                props.rtlModeAction(rtlMode);
            }
                })
    // const [subscription, setSubscription] = useState(null);

    const handleCloseMessageModal = () => {
        if(sentLoginInstructions) {
            setSentLoginInstructions(null)
            setShowMessageModal(false)
            setSubMessage(null)
            history.push('/')
        }
    }

    const emailValidation = async () => {
        //eslint-disable-next-line
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        debugger
        if(!email || regex.test(email) === false){
            return false;
        }
        return true;
    }

    const handleEmailChange = (event) => {
        let fleldVal = event.target.value;
        setEmail(fleldVal)
    }

    const EmailInput = useMemo(() => {
        const err = invalidEmail ? 'Invalid Email :('
            : (signingInError) ? signingInError : null;
        const errors = err?
            <Alert variant="danger" onClose={() => setInvalidEmail(false)} dismissible>
                <Alert.Heading>{err}</Alert.Heading>
            </Alert>
            :
            null
        return (<Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" className="form-control mb-0" id="exampleInputEmail1" placeholder="Enter email" autoComplete="off" required onChange={handleEmailChange} />
            {errors}
        </Form.Group>)
    }, [invalidEmail, signingInError])

    
    const handleLogin = async() => {
        try {
            const val = await emailValidation()
            if (!val) setInvalidEmail(true)
            else setInvalidEmail(false)
            debugger
            const urlCode = window.location.href
            debugger
            if(urlCode.search('apiKey=') > 0) { 
                await signInWithEmailLink(email, urlCode);
                setSigningInError(null)
                history.push('/');
            }
            else {
                debugger

                sendSignInLinkToEmail(email, window.location.origin);
                console.log('Check your email') 
                setSentLoginInstructions(true)
                setShowMessageModal(true)
                setSubMessage('Check your email address for additional login instructions')
            }
        } catch (error) {
            setSigningInError(error)
        }
    }

    // const MessagePopup = useMemo(() => {
    //     debugger
    //     return <MessageModal msg={subMessage} handleClose={handleCloseMessageModal} show={showMessageModal} />
    // }, [subMessage, handleCloseMessageModal, showMessageModal])


    return (
        <>
            <MessageModal msg={subMessage} handleClose={handleCloseMessageModal} show={showMessageModal} />
           <div className={`rtl-box ${show===true?'show':''}`} >
                {/* <button type="button" className="btn btn-light rtl-btn">
                        <svg onClick={()=>setShow(!show)} xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 20 20" fill="white">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                </button> */}
                <div className="rtl-panel">
                    <ul className="modes">
                        <li className="dir-btn" data-mode="rtl" data-active="false" onClick={() => {props.rtlModeAction('ltl')}}   data-value="ltr"><Link to="#">LTR</Link></li>
                        <li className="dir-btn" data-mode="rtl" data-active="true" onClick={() => {props.rtlModeAction('rtl')}}  data-value="rtl"><Link to="#">RTL</Link></li>
                    </ul>
                </div>
            </div>
            <section className="sign-in-page">
                <Container>
                    <Row className="justify-content-center align-items-center height-self-center">
                        <Col lg="5" md="12" className="align-self-center">
                            <div className="sign-user_card ">                    
                                <div className="sign-in-page-data">
                                    <div className="sign-in-from w-100 m-auto">
                                        <h3 className="mb-3 text-center">Sign in</h3>
                                        <Form className="mt-4">
                                            <Form.Group>
                                                {EmailInput}                              
                                            </Form.Group>
                                            {/* <Form.Group>                                 
                                                <Form.Control type="password" className="form-control mb-0" id="exampleInputPassword2" placeholder="Password" required/>
                                            </Form.Group> */}
                                            <div className="sign-info">
                                                <Button className="btn btn-hover btn-primary1" onClick={handleLogin}>Sign in</Button>
                                                <div className="custom-control custom-checkbox d-inline-block">
                                                    {/* <input type="checkbox" className="custom-control-input" id="customCheck"/> */}
                                                    {/* <label className="custom-control-label" htmlFor="customCheck">Remember Me</label> */}
                                                    <Link to="/terms-of-service" className="text-primary ml-2">Terms of Use</Link>
                                                </div>                                
                                            </div>                                    
                                        </Form>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="d-flex justify-content-center links">
                                        Don't have a subscription? 
                                        <Link to="/pricing-plan" className="text-primary ml-2">Subscribe</Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default  connect(mapStateToProps, mapDispatchToProps)(Login)