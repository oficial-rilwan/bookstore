import React, { useContext, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Topbar from "../../components/topbar/Topbar";
import { LoginContext } from "../../context/AuthContext/Context";
import "./profile.css";
import PersonalImage from "../../personal-info.svg";
import axios from "axios";
import { useEffect } from "react";

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, dispatch } = useContext(LoginContext);

  const { id } = useParams();

  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/user/find/${id}`
      );
      setUserData(data);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
    } catch (error) {
      user && setError(error.response.data.error);
    }
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const newUser = {
      firstName: firstName ? firstName : user.firstName,
      lastName: lastName ? lastName : user.lastName,
      email: email ? email : user.email,
      image: image ? image : user.image,
      password: password ? password : user.password,
      userId: user._id,
    };
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:5000/api/user/${id}`,
        newUser
      );
      setLoading(false);
      console.log(res);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE", payload: error.response.data });
    }
  };

  const uploadImage = (pics) => {
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/webp"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "deedon");

      fetch("https://api.cloudinary.com/v1_1/deedon/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url.toString());
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please select an image");
    }
  };
  return (
    <div>
      <Topbar />
      <Container fluid="xl" className="my-4 ">
        <h3 className="bold-h3">User Profile</h3>
        <Row className="align-items-center user-profile-page">
          <Col lg={5}>
            {error && userData.length < 1 && (
              <Alert variant="danger"> {error}</Alert>
            )}
            <div className="profile-image-container">
              <img
                className="user-profile-image"
                src={
                  userData.image
                    ? userData.image
                    : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                }
                alt={userData.fitstName}
              />
              <div>
                <h4 className="profile-title">
                  {userData.firstName} {userData.lastName}
                </h4>
                <p className="user-email">{userData.email}</p>
              </div>
            </div>
            <form className="auth-form my-4" onSubmit={updateUser}>
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="current-email"
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                />
              </div>
              <div>
                <label>Profile Image</label>
                <input
                  type="file"
                  onChange={(e) => uploadImage(e.target.files[0])}
                />
              </div>
              <button type="submit" className="submit-button">
                {loading && (
                  <Spinner
                    className="submit-loader"
                    animation="border"
                    size="sm"
                  />
                )}
                Update Account
              </button>
            </form>
          </Col>
          <Col lg={7}>
            <img src={PersonalImage} className="profile-banner" alt="profile" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
