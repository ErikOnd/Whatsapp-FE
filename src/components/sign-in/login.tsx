import React from "react";
import { Image, Row, Col, Container } from "react-bootstrap";
import Logo from "../../images/Logo.png";
import loginImage from "../../images/login-image.png";
import googleBtn from "../../images/google-btn.svg";
import facebookBtn from "../../images/facebook-btn.svg";
import "../../css/reg.css";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

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
                <Link to={`/signup`} className="signUp-link">
                  {" "}
                  Sign Up!
                </Link>
              </div>
            </div>
            <div className="bottom-block d-flex flex-column justify-content-center text-center">
              <h2 className=" text-bold start">Welcome Back</h2>
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
              <div
                className="d-flex justify-content-center mt-3"
                style={{ gap: "10px" }}
              >
                <div className="left"></div>
                <div>Or</div>
                <div className="left"> </div>
              </div>
              <LoginForm />
            </div>
          </div>
        </Col>
        <Col sm={12} md={4} lg={4} className="pr-0">
          <img src={loginImage} alt="person" className="login-image" />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
