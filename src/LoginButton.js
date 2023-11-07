import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
  <Button onClick={() => loginWithRedirect()}>LOG IN</Button>
  )
};

const Button = styled.button`
    text-decoration: none;
    padding: 10px;
    background: none;
    border: none;
    font-weight: bold;
    color: #082A63;

    &:active {
        color: #474C8C;
    }

    &:hover {
        color: #474C8C;
    }
`;

export default LoginButton;
