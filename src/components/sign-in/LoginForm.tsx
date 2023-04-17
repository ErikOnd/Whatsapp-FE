import React from "react";
import { Button, Form } from "react-bootstrap";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  return (
    <div className=" my-3 mx-2">
      <div className="mb-2">
        <Form.Group className="mb-4">
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </div>
      <div>
        <Button className="mt-2 w-100 ">Log In</Button>
      </div>
    </div>
  );
};
export default LoginForm;
