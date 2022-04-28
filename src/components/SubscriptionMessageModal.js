import React, { useState, useMemo, useEffect, useCallback } from 'react'
import { useAuth } from './../components/auth/useAuth';

import { Button, Modal} from 'react-bootstrap'

const MessageModal = ({msg=null}) => {
  const [show, setShow] = useState(false)
  const [subMessage, setSubMessage] = useState(msg)
  const { subscription, hasPlan } = useAuth();

  const handleClose = useCallback(() => setShow(false), [setShow]);

    useEffect(() => {
      if(subscription && hasPlan) {
        const endDate = new Date(subscription.current_period_start);
        let msg
        let showMsg = false
        const today = new Date();
        const diffTime = Math.abs(today - endDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log(diffTime + " milliseconds");
        console.log(diffDays + " days");

        if (diffDays <= 31) {
              msg = "less than 30 days"
              showMsg = true
        } else if (diffDays <= 7) {
              msg = "less than a week"
              showMsg = true
              } if (diffDays === 1) {
              msg = "less than 24 hours"
              showMsg = true
              } else {
              showMsg = false
           }
        setSubMessage(msg)
        setShow(showMsg)
      }
    }, [subscription, hasPlan])
  
    const ContentModal = useMemo(() => {
      return <Modal show={show} onHide={handleClose}>
      {/* <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header> */}
      <Modal.Body>{subMessage}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Okay
        </Button>
      </Modal.Footer>
    </Modal>
    }, [show, subMessage, handleClose])
    return (
      <>
        {ContentModal}
      </>
    );
  }

export default MessageModal;
  