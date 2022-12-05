import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../components/Header";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 448px;
  width: 100%;
  margin: 0 auto;
  background: #2752e7;
  border-radius: 16px;
  padding: 20px;
  align-self: center;
`;

const From = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const FormChild = styled.div`
  width: 100%;
  margin: 6px 0;
`;
const Input = styled.input`
  width: 100%;
  outline: none;
  border-radius: 6px;
  padding: 8px 8px;
  border: none;
  margin: 4px 0;
  font-size: 18px;
`;
const Label = styled.label`
  color: #ffffff;
  font-weight: 600;
  font-size: 22px;
`;

const Button = styled.button`
  border: none;
  background: #ffffff;
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 16px;
  margin: 8px 0;
  color: #2752e7;
`;

const P = styled.p`
  font-weight: 500;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
`;

const Span = styled.span`
  text-decoration: underline;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
`;

const Main = styled.main`
  min-height: calc(100vh - 94px);
  max-width: 768px;
  margin: 0 auto;
  padding: 10px;
  width: 100%;
  display: flex;
`;

const Upload = styled.div`
  color: #ffffff;
  overflow: hidden;
  width: 100px;
  height: 100px;
  border: 1px solid #ffffff;
  border-radius: 1000px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 10px 0;
`;

const UploadInput = styled.input`
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  cursor: pointer;
  height: 100%;
  width: 100%;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [selectedImage, setSelectedImage] = useState("");

  // Function to change input values
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to run on submit button clicked
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedImage){
      return
    }
    setLoading(true);
    const imgformData = new FormData();
    imgformData.append("file", selectedImage);
    imgformData.append("upload_preset", "x1rxahrq");
    const options = {
      method: "POST",
      body: imgformData,
    };

    // Doing Request to the Cloudinary Image Upload
    fetch("https://api.cloudinary.com/v1_1/ddyloi02j/upload", options)
      .then((response) => response.json())
      .then((responseData) => {
        const { secure_url } = responseData;
        if (!formData.email||!formData.password||!formData.firstName||!formData.lastName){
          return
        }
        const obj = {
          ...formData,
          imgUrl: secure_url,
        };

        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(obj),
        };

        // Doing Request to the server
        fetch("http://localhost:8000/register", options)
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem(
              "accessToken",
              JSON.stringify(data.accessToken)
            );
            navigate("/dashboard");
          })
          .catch(() =>
            toast.error("User Already Exists", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          )
          .finally(() => setLoading(false));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header />
      <Main>
        <Wrapper>
          <From onSubmit={handleSubmit}>
            <div
              style={{
                position: "relative",
                width: "100px",
                height: "100px",
                borderRadius: "100px",
                margin: "15px 0",
              }}
            >
              <Upload>
                {selectedImage ? (
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={window.URL.createObjectURL(selectedImage)}
                    alt="Selected Images"
                  />
                ) : (
                  "Select Image"
                )}{" "}
              </Upload>
              <UploadInput
                type={"file"}
                onChange={(e) => {
                  setSelectedImage(e.target.files[0]);
                }}
              />
            </div>
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <FormChild>
                <Label>First Name</Label>
                <Input
                  type={"text"}
                  name="firstName"
                  onChange={handleChange}
                  placeholder="Some"
                />
              </FormChild>
              <FormChild>
                <Label>Last Name</Label>
                <Input
                  type={"text"}
                  name="lastName"
                  onChange={handleChange}
                  placeholder="One"
                />
              </FormChild>
              <FormChild>
                <Label>Email</Label>
                <Input
                  type={"email"}
                  name="email"
                  onChange={handleChange}
                  placeholder="@"
                />
              </FormChild>
              <FormChild>
                <Label>Password</Label>
                <Input
                  type={"password"}
                  name="password"
                  onChange={handleChange}
                  placeholder="P@ssw0rd"
                />
              </FormChild>
            </div>

            <Button className={`${loading && " loading "}`} type="submit">
              Sign Up
            </Button>
          </From>
          <P>
            Already have an account?{" "}
            <Span>
              <Link to={"/"}>Sign In</Link>
            </Span>
          </P>
        </Wrapper>
      </Main>
    </div>
  );
};

export default SignUp;
