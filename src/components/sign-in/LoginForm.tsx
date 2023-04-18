import React from "react";
import { Button, Form } from "react-bootstrap";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { IUser } from "../../interfaces/IUser";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_BE_URL;
      const response = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        toast("Login successfull! 💪", { autoClose: 1000 });
        const data = await response.json();
        console.log("logindata", data);
        // console.log("accessToken", data.accessToken);
        localStorage.setItem("accessToken", data.accessToken);
        // localStorage.setItem("refreshToken", data.refreshToken);
        navigate("/home");
        // window.location.href = "/home";
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
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
