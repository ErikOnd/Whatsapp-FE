import React from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { loginUser } from "../../actions";
import { toast } from "react-toastify";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both email and password");
      return;
    }
    await dispatch(loginUser({ email, password })).unwrap();
    navigate("/home");
  };

  return (
    <Form className=" my-3 mx-2 ">
      <div className="mb-2">
        <Form.Group className="mb-4">
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
      </div>
      <div>
        <Button type="submit" className="mt-2 w-100 " onClick={handleSubmit}>
          Log In
        </Button>
      </div>
    </Form>
  );
};
export default LoginForm;
