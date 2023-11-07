import React from 'react';

import styled from "styled-components";



const ErrorScreen = () => {

    return (
        <Error>
            <h1>An unknown error has occurred.</h1>
            <p>Ppppplease try refreshing the page, or contact support if the problem persists.</p>
        </Error>
    );
}

const Error = styled.div`
    width: 600px;
    height: 600px;
    margin-left: 200px;
    margin-right: 200px;
    text-align: center;

`;

export default ErrorScreen;