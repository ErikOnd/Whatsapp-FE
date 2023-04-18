import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../css/reg.css";
import googleBtn from "../images/google-btn.svg";
import facebookBtn from "../images/facebook-btn.svg";
import regImage from "../assets/Registration_image.png";
import { useState } from "react";

const Registration = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });
  const [fileForUserPicture, setFileForUserPicture] = useState<File | null>(
    null
  );
  const uploadUserPicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setFileForUserPicture(files[0]);
    } else {
      setFileForUserPicture(null);
    }
  };

  return (
    <div style={{ backgroundColor: "#D3D3D3" }} className="reg">
      <Container fluid>
        <Row>
          <Col xs={12} md={5}>
            <div>
              <img src={regImage} alt="reg" className="regimg" />
            </div>
          </Col>
          <Col xs={12} md={7}>
            <div style={{ backgroundColor: "#D3D3D3" }} className="mt-5 ">
              <span className="text-right  acc ">
                have an account?{" "}
                <a href="http://localhost:3000/" style={{ color: "green" }}>
                  Sign in!
                </a>
              </span>
              <div>
                <h4 className="text-center mt-5 text-bold start">
                  Get satrted with WhatsApp
                </h4>
              </div>
              <p className="text-muted text-center">Getting started is easy</p>
              <div className="d-flex justify-content-center align-items-center ml-auto">
                <div className="d-flex justify-content-center">
                  <a
                    onClick={(e) => e.stopPropagation()}
                    href={`${process.env.REACT_APP_BE_URL}/users/googleLogin`}
                  >
                    {" "}
                    <img
                      src={googleBtn}
                      alt="google button"
                      className="mr-3 cursor-pointer"
                    />
                  </a>

                  <img
                    src={facebookBtn}
                    alt="facebook button"
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <div
                className="d-flex justify-content-center mt-3"
                style={{ gap: "10px" }}
              >
                <div className="left"></div>
                <div>Or contiune with</div>
                <div className="left"> </div>
              </div>

              <div className=" register-form">
                <Form>
                  <div className="form-content">
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            placeholder="Your Name *"
                            className="form-control"
                            value={user.name}
                            onChange={(e) => {
                              setUser({
                                ...user,
                                name: e.target.value,
                              });
                            }}
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Control
                            type="text"
                            placeholder="Email *"
                            className="form-control"
                            value={user.email}
                            onChange={(e) => {
                              setUser({
                                ...user,
                                email: e.target.value,
                              });
                            }}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            placeholder="Your Password *"
                            className="form-control"
                            value={user.password}
                            onChange={(e) => {
                              setUser({
                                ...user,
                                password: e.target.value,
                              });
                            }}
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Control
                            type="text"
                            placeholder="Confirm Password *"
                            className="form-control"
                          />
                        </Form.Group>
                      </Col>
                      <Form.File
                        id="custom-file-translate-scss"
                        label="choose a picture"
                        lang="en"
                        custom
                        style={{ borderRadius: "20px" }}
                        onChange={uploadUserPicture}
                      />
                    </Row>
                    <div className="d-flex justify-content-center align-items-center">
                      <Button
                        variant="success"
                        type="submit"
                        className="btnSubmit mt-5 "
                      >
                        Create Account
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
              <p className="text-muted text-center">
                By continuing you indicate that you read and agreed to the
                Trerms of Use
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Registration;
