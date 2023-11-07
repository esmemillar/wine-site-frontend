import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const BrowseByStyle = () => {


    let navigate = useNavigate();


    return (

        // TO DO figure out preventDefault for links and add endpoints to return correct wines for ByColourDetails component
        <>
            <h1>Browse by color </h1>
            <Wrapper>

                <ul>
                    <Link onClick={navigate("/colour/red")}>Red</Link>
                    <Link onClick={navigate("/colour/rose")}>Rose</Link>
                    <Link onClick={navigate("/colour/maceration")}>Maceration</Link>
                    <Link onClick={navigate("/colour/white")}>White</Link>
                    <Link onClick={navigate("/colour/frizzante")}>Frizzante</Link>
                </ul>

            </Wrapper>
        </>

    )
};

const Wrapper = styled.div`
    margin-top: 80px;
    column-count: 5;
    row-count: 2;
`;



const Button = styled.button`
text-decoration: none;
padding: 10px;
font-weight: bold;
color: #082A63;

&:active {
    color: #3C73CF;
}

&:hover {
    color: #3C73CF;
}
`;

const Link = styled(NavLink)`
    text-decoration: none;
    padding: 10px;
    font-weight: bold;
    color: #082A63;

    &:active {
        color: #3C73CF;
    }

    &:hover {
        color: #3C73CF;
    }
`;


export default BrowseByStyle;