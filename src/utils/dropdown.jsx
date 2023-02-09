import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'


function DropDown(props) {
  return (
    <DropdownButton id="dropdown-basic-button" title={props.title}>
         <Dropdown.Item>
            <Link className="nav-link" to={props.sin}>
                    Doctor
            </Link>
         </Dropdown.Item>
          <Dropdown.Item>
            <Link className="nav-link" to={props.sup}>
                    Patient
            </Link>
          </Dropdown.Item>
    </DropdownButton>
  );
}

export default DropDown;