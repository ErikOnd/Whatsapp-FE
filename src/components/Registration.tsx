import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../css/reg.css";
import GoogleButton from "react-google-button";
import regImage from "../assets/Registration_image.png";

const Registration = () => {
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
                <span style={{ color: "green" }}>Sign in!</span>
              </span>
              <div>
                <h4 className="text-center mt-5 text-bold start">
                  Get satrted with WhatsApp
                </h4>
              </div>
              <p className="text-muted text-center">Getting started is easy</p>
              <div className="d-flex justify-content-center align-items-center ml-auto">
                {/* <div className=" d-flex " style={{ gap: "10px" }}> */}
                <GoogleButton type="light" />
                {/* <Button>Facebook</Button> */}
                {/* </div> */}
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
                          />
                        </Form.Group>

                        <Form.Group>
                          <Form.Control
                            type="text"
                            placeholder="Email *"
                            className="form-control"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            placeholder="Your Password *"
                            className="form-control"
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
                      />
                    </Row>

                    <Button
                      variant="primary"
                      type="submit"
                      className="btnSubmit mt-5 "
                    >
                      Create Account
                    </Button>
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
