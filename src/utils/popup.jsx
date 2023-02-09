import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function PopupModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body class="d-flex justify-content-center">
        <h4>{props.msg}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
}
