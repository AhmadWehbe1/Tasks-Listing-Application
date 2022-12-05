import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  background: #2752e7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 40px;
  color: #ffffff;
`;

const Heading = styled.h1`
  font-weight: bold;
  cursor: pointer;
  font-size: 26px;
  color: #ffffff;
`;

const Avatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 35px;
  background: #ffffff;
  color: #2752e7;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;
const ButtonWrapper = styled.div`
  position: absolute;
  top: 40px;
  right: -25px;
`;

const Button = styled.button`
  border-radius: 8px;
  outline: none;
  border: none;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 16px;
  color: #2752e7;
`;

const Letter = styled.h1`
  font-weight: bold;
  font-size: 26px;
  color: #2752e7;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;
const Header = () => {
  const [userData, setUserData] = useState();

  const [isClicked, setIsClicked] = useState(false);
  // Do backend Request to get the logged in user data
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${JSON.parse(
          localStorage.getItem("accessToken")
        )}`,
      },
    };
    // Doing Request to the server
    fetch("http://localhost:8000/me", options)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => console.log(err));

    return () => {
      setUserData("");
    };
  }, []);

  // Run On Logout Button Click
  const handleLogoutClick = () => {
    localStorage.removeItem("accessToken");
    setUserData("");
    setIsClicked(!isClicked);
    window.location.replace("http://localhost:3000/");
  };

  return (
    <HeaderWrapper>
      <Heading>
        <Link to="/dashboard">Task Lister</Link>
      </Heading>

      {userData && (
        <div style={{ position: "relative" }}>
          <Avatar
            onClick={() => {
              setIsClicked(!isClicked);
            }}
          >
            {userData?.imgUrl ? (
              <Image src={userData?.imgUrl} alt="avatar" />
            ) : (
              <Letter>{userData?.firstName.slice(0, 1).toUpperCase()}</Letter>
            )}
          </Avatar>
          {isClicked && (
            <ButtonWrapper>
              <Button
                onClick={() => {
                  handleLogoutClick();
                }}
              >
                Logout
              </Button>
            </ButtonWrapper>
          )}
        </div>
      )}
    </HeaderWrapper>
  );
};

export default Header;
