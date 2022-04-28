import React, { useMemo } from 'react'

import { Button, Modal } from 'react-bootstrap'

const MessageModal = ({msg, handleClose, show}) => {
    const ContentModal = useMemo(() => {
      return <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>{msg}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    }, [show, handleClose, msg])
    return (
      <>
        {ContentModal}
      </>
    );
  }

export default MessageModal;
  