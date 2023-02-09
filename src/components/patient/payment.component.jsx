import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function PaymentModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Payment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body class="d-flex justify-content-center">
        <h4>250</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Pay</Button>
      </Modal.Footer>
    </Modal>
  );
}
