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
  FormControl,
  ListGroup,
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
  ArrowRight,
} from "react-bootstrap-icons";
import "../styles/mainApp.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IUser } from "../interfaces/IUser";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  fetchAllUserssAction,
  fetchMyProfileAction,
  PostMessageAction,
} from "../actions";

import { IUserChats } from "../interfaces/IUserChats";
import { io } from "socket.io-client";
import { IChat, IMessage } from "../interfaces/IChat";

const socket = io("http://localhost:3001", { transports: ["websocket"] });
let chatToShow: IChat;
const MainApp = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_BE_URL;
  const [showModal, setShowModal] = useState(false);
  const [newImage, setNewImage] = useState<File | undefined>(undefined);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userData, setUserData] = useState<IUser>();
  const [newUserName, setNewUserName] = useState({ username: "" });
  const [contactEmail, setContactEmail] = useState("");
  const [userContacts, setUserContacts] = useState<IUserChats>();
  const [msg, setMsg] = useState({
    messageText: "",
    receiverId: "",
    senderId: "",
  });

  console.log("userContacts", userContacts);
  let profile = useAppSelector((state) => state.myProfile.results);
  console.log("profile", profile);
  let selectedChat = useAppSelector((state) => state.selectChat.selectedChat);
  let allUsers = useAppSelector((state) => state.allUsers.results);
  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (!sessionStorage.getItem("accessToken")) navigate("/");
    if (searchParams.get("accessToken") as string) {
      sessionStorage.setItem(
        "accessToken",
        searchParams.get("accessToken") as string
      );

      navigate("/home");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, searchParams]);

  useEffect(() => {
    dispatch(fetchMyProfileAction(accessToken!));
    dispatch(fetchAllUserssAction(accessToken!));
    getContacts();
    socket.on("welcome", (welcomeMessage) => {
      console.log(welcomeMessage);
    });
    console.log();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChatItemClick = (chatId: number) => {
    dispatch({ type: "SELECT_CHAT", payload: chatId });
  };

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      createNewChat();
    }
  };

  const createNewChat = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const res = await fetch(`${apiUrl}/chat`, {
        method: "POST",
        body: JSON.stringify({
          participants: [contactEmail, profile._id],
        }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      await res.json();
      if (res.ok) {
        console.log(res);
        setContactEmail("");
        getContacts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getContacts = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const res = await fetch(`${apiUrl}/chat/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      setUserContacts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = async () => {
    try {
      const accessToken = sessionStorage.getItem("accessToken");
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
      const accessToken = sessionStorage.getItem("accessToken");
      dispatch(fetchMyProfileAction(accessToken!));
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
    setShowModal(false);
  };

  chatToShow =
    userContacts &&
    Array.isArray(userContacts) &&
    userContacts.find((c: IUserChats) => c._id === selectedChat);
  console.log(chatToShow);

  const handleSubmit = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();

    await dispatch(PostMessageAction(msg, chatToShow._id, accessToken!));
  };

  console.log("chatToShow", chatToShow);

  const renderMessages = () => {
    let prevDate: any | null = null;
    return (
      chatToShow &&
      chatToShow.messages.map((message: IMessage) => {
        let currentDate = new Date(message.timestamp).toLocaleDateString();
        let messageTime = new Date(message.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        let date = null;

        const messageDate = new Date(message.timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        let dateDisplay;
        if (messageDate.toDateString() === today.toDateString()) {
          dateDisplay = "Today";
        } else if (messageDate.toDateString() === yesterday.toDateString()) {
          dateDisplay = "Yesterday";
        } else {
          dateDisplay = messageDate.toLocaleDateString();
        }

        if (currentDate !== prevDate) {
          date = (
            <ListGroup.Item
              className="text-center text-muted border-0 time-item"
              key={message._id}
            >
              {dateDisplay}
            </ListGroup.Item>
          );
          prevDate = currentDate;
        }

        return (
          <React.Fragment key={message._id}>
            {date}
            <ListGroup.Item
              className={
                message.senderId === profile._id
                  ? "sender-message"
                  : "receiver-message"
              }
            >
              <p className="mb-1 msg-font">{message.messageText}</p>
              <p className="text-muted time-span mb-0">{messageTime}</p>
            </ListGroup.Item>
          </React.Fragment>
        );
      })
    );
  };

  return (
    <Container fluid>
      <Row className="main-header no-wrap">
        <Col className="d-flex align-items-center justify-content-end header-left">
          <Image
            src={profile?.avatar}
            alt="user-img"
            className="mr-4 main-img-pointer"
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
        {chatToShow ? (
          <Col className="d-flex align-items-center header-right justify-content-between pl-0">
            <Col className="pl-0 text-left">
              <Image
                src={chatToShow.participants[0].avatar}
                alt="user-img"
                className="mr-4  ml-3 align-self-start main-img"
              ></Image>
              <h6 className="mb-0">{chatToShow.participants[0].username}</h6>
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
              <Search
                color="rgb(84 101 111)"
                size={20}
                className="mr-4"
              ></Search>
              <ChevronDown
                color="rgb(84 101 111)"
                size={20}
                className="mr-2"
              ></ChevronDown>
            </Col>
          </Col>
        ) : (
          <Col className="d-flex align-items-center header-right justify-content-between pl-0">
            <Col className="pl-0 text-left">
              <h6 className="mb-0 pl-5">Select a chat to view messages</h6>
            </Col>
          </Col>
        )}
      </Row>
      <Row>
        <Col className="user-col">
          <Row className="search-newChat align-items-center justify-content-between">
            <Col className="pl-2">
              <Form>
                <Form.Group controlId="formSearch" className="m-0">
                  <FormControl
                    type="text"
                    placeholder="Search or create a new chat"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
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

          {Array.isArray(userContacts) &&
            userContacts.map((contact) => (
              <Row
                key={contact.participants[0]._id}
                className={`chat-item ${
                  contact._id === selectedChat ? "selected" : ""
                }`}
                onClick={() => handleChatItemClick(contact._id)}
              >
                <Image
                  src={contact.participants[0].avatar}
                  className="main-img ml-2"
                ></Image>
                <Col className="contact-info-section">
                  <Row className="justify-content-between">
                    <Col>{contact.participants[0].username}</Col>
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
          {/* MIDDLE AREA: CHAT HISTORY */}
          <ListGroup className="chat-area">{renderMessages()}</ListGroup>
          {/* <ListGroup className="chat-area">
            {chatToShow &&
              chatToShow.messages.map(
                (message: {
                  messageText: string;
                  receiverId: string;
                  senderId: string;
                  timestamp: string;
                  _id: string;
                }) => {
                  const messageDate = new Date(message.timestamp);
                  const today = new Date();
                  const yesterday = new Date(today);
                  yesterday.setDate(yesterday.getDate() - 1);

                  let dateDisplay;
                  if (messageDate.toDateString() === today.toDateString()) {
                    dateDisplay = "Today";
                  } else if (
                    messageDate.toDateString() === yesterday.toDateString()
                  ) {
                    dateDisplay = "Yesterday";
                  } else {
                    dateDisplay = messageDate.toLocaleDateString();
                  }
                  return (
                    <>
                      <ListGroup.Item
                        key={message._id}
                        className={
                          message.senderId === profile._id
                            ? "sender-message"
                            : "receiver-message"
                        }
                      >
                        {message.messageText}
                        <small className="text-muted"> at {dateDisplay}</small>
                      </ListGroup.Item>
                    </>
                  );
                }
              )}
          </ListGroup> */}
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
            <Form className="w-100 ">
              <Row className="no-gutter">
                <Col xs={11}>
                  <Form.Group controlId="formSearch" className="m-0">
                    <Form.Control
                      type="text"
                      disabled={!chatToShow}
                      placeholder="Write a message"
                      className="text-input w-100"
                      onChange={(e) => {
                        setMsg({
                          ...msg,
                          receiverId: chatToShow?.participants[0]._id,
                          senderId: profile._id,
                          messageText: e.target.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col xs={1}>
                  <Button
                    className="whatsapp-send-button"
                    onClick={handleSubmit}
                  >
                    {" "}
                    <ArrowRight />{" "}
                  </Button>
                </Col>
              </Row>
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
