import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import styled from "styled-components";
import Footer from "./components/Footer";
import ToastWrapper from "./components/ToastWrapper";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

const App = () => {
  return (
    <Container>
      <ToastWrapper />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/* Private/Protected Routes */}
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      <Footer />
    </Container>
  );
}

export default App;

const PrivateRoutes = ({ children, ...rest }) => {
  const auth = localStorage.getItem("accessToken");

  return <>{auth ? <Outlet /> : <Navigate to="/" />}</>;
}
