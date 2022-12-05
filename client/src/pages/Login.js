import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import Header from "../components/Header";

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
  margin: 8px 0;
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

const Main = styled.main`
  min-height: calc(100vh - 94px);
  max-width: 768px;
  margin: 0 auto;
  padding: 10px;
  width: 100%;
  display: flex;
`;
const Span = styled.span`
  text-decoration: underline;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
`;

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
    if (!formData.email||!formData.password){
      return
    }
    setLoading(true);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    // Doing Request to the server
    fetch("http://localhost:8000/login", options)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
        navigate("/dashboard");
      })
      .catch((err) => toast.error("Wrong Credentials!"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <Header />
      <Main>
        <Wrapper>
          <From onSubmit={handleSubmit}>
            <FormChild>
              <Label>Email</Label>
              <Input
                type={"email"}
                name="email"
                onChange={handleChange}
                placeholder=""
              />
            </FormChild>
            <FormChild>
              <Label>Password</Label>
              <Input
                type={"password"}
                name="password"
                onChange={handleChange}
                placeholder=""
              />
            </FormChild>

            <Button className={`${loading && " loading "}`} type="submit">
              Sign In
            </Button>
          </From>
          <P>
            Don't have an account?{" "}
            <Span>
              <Link to={"/signup"}> Sign Up</Link>
            </Span>
          </P>
        </Wrapper>
      </Main>
    </div>
  );
};

export default Login;
