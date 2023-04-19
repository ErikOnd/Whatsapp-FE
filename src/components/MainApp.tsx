import React, { useEffect, useState } from "react";

import {
  Row,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Button,
  InputGroup,
} from "react-bootstrap";
import {
  Filter,
  PeopleFill,
  Circle,
  PencilSquare,
  ChevronDown,
  CameraVideo,
  Telephone,
  Search,
  EmojiSmile,
  Paperclip,
  Mic,
} from "react-bootstrap-icons";
import "../styles/mainApp.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IUser } from "../interfaces/IUser";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchMyProfileAction } from "../actions";

const MainApp = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_BE_URL;
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) navigate("/");
    if (searchParams.get("accessToken") as string) {
      localStorage.setItem(
        "accessToken",
        searchParams.get("accessToken") as string
      );
      navigate("/home");
    }
  }, [navigate, searchParams]);
  const [showModal, setShowModal] = useState(false);
  const [newImage, setNewImage] = useState<File | undefined>(undefined);
  const [userData, setUserData] = useState<IUser>();
  const [newUserName, setNewUserName] = useState({ username: "" });

  let profile = useAppSelector((state) => state.myProfile.results);
  console.log("profile", profile);
  // setUserData(profile);

  // const getUser = async () => {
  //   try {
  //     const accessToken = localStorage.getItem("accessToken");
  //     const res = await fetch(`${apiUrl}/users/me`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     const userData = await res.json();
  //     if (res.ok) {
  //       setUserData(userData);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const editUser = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log("JSON.stringify(newUserName):", JSON.stringify(newUserName));
      const res = await fetch(`${apiUrl}/users/me`, {
        method: "PUT",
        body: JSON.stringify(newUserName),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const userData = await res.json();
      if (res.ok) {
        setUserData(userData);
      }
    } catch (error) {
      console.log(error);
    }
    updateImage();
  };

  const updateImage = async () => {
    try {
      const data = new FormData();
      if (newImage !== undefined) {
        data.append("avatar", newImage);
      }
      await fetch(`${apiUrl}/users/image/${profile?._id}`, {
        method: "PUT",
        body: data,
      });
      const accessToken = localStorage.getItem("accessToken");
      dispatch(fetchMyProfileAction(accessToken!));
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
    setShowModal(false);
  };

  const getContacts = async () => {
    // How are we getting all the contacts from one user ???
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    dispatch(fetchMyProfileAction(accessToken!));
    getContacts();
  }, []);

  const contacts = [
    {
      name: "JohnDoe",
      avatar:
        "https://servnettech.com/wp-content/uploads/2022/08/c293b66e546446e8a0fa6f258c28b219.jpg",
      email: "JohnDoe.de",
    },
    {
      name: "JaneDoe",
      avatar:
        "https://servnettech.com/wp-content/uploads/2022/08/c293b66e546446e8a0fa6f258c28b219.jpg",
      email: "JaneDoe.de",
    },

    {
      name: "BobSmith",
      avatar:
        "https://servnettech.com/wp-content/uploads/2022/08/c293b66e546446e8a0fa6f258c28b219.jpg",
      email: "BobSmith.de",
    },
  ];

  const handleImageClick = () => {
    setShowModal(true);
  };

  return (
    <Container fluid>
      <Row className="main-header no-wrap">
        <Col className="d-flex align-items-center justify-content-end header-left">
          <Image
            src={profile?.avatar}
            alt="user-img"
            className="mr-4 main-img"
            onClick={handleImageClick}
          ></Image>
          <PeopleFill
            color="rgb(84 101 111)"
            size={20}
            className="mr-4"
          ></PeopleFill>
          <Circle color="rgb(84 101 111)" size={20} className="mr-4"></Circle>
          <PencilSquare
            color="rgb(84 101 111)"
            size={20}
            className="mr-4"
          ></PencilSquare>
          <ChevronDown
            color="rgb(84 101 111)"
            size={20}
            className="mr-2"
          ></ChevronDown>
        </Col>
        <Col className="d-flex align-items-center header-right justify-content-between pl-0">
          <Col className="pl-0 text-left">
            <Image
              src="https://servnettech.com/wp-content/uploads/2022/08/c293b66e546446e8a0fa6f258c28b219.jpg"
              alt="user-img"
              className="mr-4  ml-3 align-self-start main-img"
            ></Image>
            <h6 className="mb-0">John Doe</h6>
          </Col>
          <Col className="text-right pb-2">
            <CameraVideo
              color="rgb(84 101 111)"
              size={20}
              className="mr-4"
            ></CameraVideo>
            <Telephone
              color="rgb(84 101 111)"
              size={20}
              className="mr-4"
            ></Telephone>
            <span className="mr-4 header-seperator">|</span>
            <Search color="rgb(84 101 111)" size={20} className="mr-4"></Search>
            <ChevronDown
              color="rgb(84 101 111)"
              size={20}
              className="mr-2"
            ></ChevronDown>
          </Col>
        </Col>
      </Row>
      <Row>
        <Col className="user-col">
          <Row className="search-newChat align-items-center justify-content-between mb-2">
            <Col className="pl-2">
              <Form>
                <Form.Group controlId="formSearch" className="m-0">
                  <Form.Control
                    type="text"
                    placeholder="Search or start a new chat"
                    className="search-input"
                  />
                </Form.Group>
              </Form>
            </Col>
            <Filter
              color="rgb(134 150 160)"
              size={25}
              className="mr-3"
            ></Filter>
          </Row>
          {contacts.map((contact) => (
            <Row className="mb-3" key={contact.email}>
              <Image src={contact.avatar} className="main-img ml-2"></Image>
              <Col className="contact-info-section">
                <Row className="justify-content-between">
                  <Col>{contact.name}</Col>
                  <Col className="text-right secondary">Friday</Col>
                </Row>
                <Row>
                  <Col className="secondary">Last Message</Col>
                </Row>
              </Col>
            </Row>
          ))}
        </Col>
        <Col className="chat-col p-0">
          <Col className="chat-window ml-auto d-flex align-items-center justify-content-between">
            <EmojiSmile
              color="rgb(84 101 111)"
              size={25}
              className="mr-2 ml-2"
            ></EmojiSmile>
            <Paperclip
              color="rgb(84 101 111)"
              size={25}
              className="mr-3 ml-2"
            ></Paperclip>
            <Form className="w-100">
              <Form.Group controlId="formSearch" className="m-0">
                <Form.Control
                  type="text"
                  placeholder="Write a message"
                  className="text-input w-100"
                />
              </Form.Group>
            </Form>
            <Mic color="rgb(84 101 111)" size={25} className="mr-2 ml-3"></Mic>
          </Col>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Body>
          <Row className="justify-content-center">
            <Image src={profile?.avatar} fluid className="main-img-big" />
          </Row>

          <div className="text-center">
            <div className="my-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setNewImage(file);
                  }
                }}
              />
            </div>
            <div className="my-3">
              <InputGroup hasValidation>
                <InputGroup.Text>Username:</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder={profile?.username}
                  onChange={(e) => {
                    setNewUserName({ username: e.target.value });
                  }}
                />
              </InputGroup>
            </div>
            <div className="my-3">
              <InputGroup className="d-flex flex-column text-left">
                <span>Status:</span>
                <Form.Check
                  inline
                  type="radio"
                  name="status"
                  label="Offline"
                  value="offline"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="status"
                  label="Online"
                  value="online"
                />
                <Form.Check
                  inline
                  type="radio"
                  name="status"
                  label="Busy"
                  value="busy"
                />
              </InputGroup>
            </div>

            <Button variant="primary" onClick={editUser}>
              Save Changes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MainApp;
