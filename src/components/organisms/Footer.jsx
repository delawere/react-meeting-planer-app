import React from "react";
import styled from "styled-components";

const Container = styled.footer`
  background: inherit;
  display: flex;
  justify-content: start;
  justify-self: flex-end;
  flex: 1;
`;

const IconContainer = styled.div`
  height: 35px;
  align-self: flex-end;
`;

const Icon = styled.svg`
  fill: rgba(72, 72, 72, 0.7);
  width: 25px;
  height: 25px;
  margin: 4px;

  &:hover {
    fill: rgb(37, 37, 37);
  }
`;

const Footer = () => (
  <Container>
    <IconContainer>
      <a href="https://t.me/dmitriyZhiganov">
        <Icon id="icon-telegram" viewBox="0 0 28 28">
          <title>telegram</title>
          <path d="M18.578 20.422l2.297-10.828c0.203-0.953-0.344-1.328-0.969-1.094l-13.5 5.203c-0.922 0.359-0.906 0.875-0.156 1.109l3.453 1.078 8.016-5.047c0.375-0.25 0.719-0.109 0.438 0.141l-6.484 5.859-0.25 3.563c0.359 0 0.516-0.156 0.703-0.344l1.687-1.625 3.5 2.578c0.641 0.359 1.094 0.172 1.266-0.594zM28 14c0 7.734-6.266 14-14 14s-14-6.266-14-14 6.266-14 14-14 14 6.266 14 14z" />
        </Icon>
      </a>
      <a href="https://github.com/delawere">
        <Icon id="icon-github" viewBox="0 0 32 32">
          <title>github</title>
          <path d="M16 0.395c-8.836 0-16 7.163-16 16 0 7.069 4.585 13.067 10.942 15.182 0.8 0.148 1.094-0.347 1.094-0.77 0-0.381-0.015-1.642-0.022-2.979-4.452 0.968-5.391-1.888-5.391-1.888-0.728-1.849-1.776-2.341-1.776-2.341-1.452-0.993 0.11-0.973 0.11-0.973 1.606 0.113 2.452 1.649 2.452 1.649 1.427 2.446 3.743 1.739 4.656 1.33 0.143-1.034 0.558-1.74 1.016-2.14-3.554-0.404-7.29-1.777-7.29-7.907 0-1.747 0.625-3.174 1.649-4.295-0.166-0.403-0.714-2.030 0.155-4.234 0 0 1.344-0.43 4.401 1.64 1.276-0.355 2.645-0.532 4.005-0.539 1.359 0.006 2.729 0.184 4.008 0.539 3.054-2.070 4.395-1.64 4.395-1.64 0.871 2.204 0.323 3.831 0.157 4.234 1.026 1.12 1.647 2.548 1.647 4.295 0 6.145-3.743 7.498-7.306 7.895 0.574 0.497 1.085 1.47 1.085 2.963 0 2.141-0.019 3.864-0.019 4.391 0 0.426 0.288 0.925 1.099 0.768 6.354-2.118 10.933-8.113 10.933-15.18 0-8.837-7.164-16-16-16z" />
        </Icon>
      </a>
    </IconContainer>
  </Container>
);

export default Footer;
