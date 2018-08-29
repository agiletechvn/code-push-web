import React from 'react';
import {
  ControlLabel,
  Form,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';
import Link from '../../Link';

function StepDone() {
  return (
    <Form style={{ maxWidth: 350, marginLeft: 'auto', marginRight: 'auto' }}>
      <FormGroup style={{ textAlign: 'center' }}>
        <div>
          <span>Congratulation, you have registered successfully!</span>
          <Link to="/login">Login</Link>
          <span>Yes</span>
        </div>
      </FormGroup>
    </Form>
  );
}
export default StepDone;
