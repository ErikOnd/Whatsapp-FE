import React from "react";
import { Image, Row, Col, Container } from "react-bootstrap";
import Logo from "../../images/Logo.png";
import loginImage from "../../images/login-image.png";
import googleBtn from "../../images/google-btn.svg";
import facebookBtn from "../../images/facebook-btn.svg";
import "./login.css";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm={12} md={8} lg={8}>
          <div className="login-page">
            <div className=" d-flex align-items-center upper-logo">
              <Image src={Logo} alt="logo" />
              <div className="ml-auto">
                <span>Don’t have an account?</span>
                <a href="signup" className="signUp-link">
                  {" "}
                  Sign Up!
                </a>
              </div>
            </div>
            <div className="bottom-block d-flex flex-column justify-content-center text-center">
              <h2>Welcome Back</h2>
              <p>Login into your account</p>
              <div className="d-flex justify-content-center">
                <img
                  src={googleBtn}
                  alt="google button"
                  className="mr-3 cursor-pointer"
                />
                <img
                  src={facebookBtn}
                  alt="facebook button"
                  className="cursor-pointer"
                />
              </div>
              <hr className="w-100" />
              <p>Or</p>
              <LoginForm />
            </div>
          </div>
        </Col>
        <Col sm={12} md={4} lg={4} className="pr-0">
          <img
            // style={{ height: "100vh", width: "100%", }}
            src={loginImage}
            alt="person"
            className="login-image"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
