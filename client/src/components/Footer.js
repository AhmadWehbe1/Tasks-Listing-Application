import styled from "styled-components";

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: #2752e7;
  font-size: 15px;
  margin-bottom: 3px;
`;
const Heart = styled.span`
  color: red;
  margin-left: 5px;
  margin-right: 5px;
`;
const AhmadText = styled.span`
  font-weight: 700;
  font-style: italic;
  margin-left: 5px;
  text-decoration: underline;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      Made with <Heart>&#10084; </Heart> by <AhmadText> Ahmad </AhmadText>{" "}
    </FooterWrapper>
  );
};

export default Footer;