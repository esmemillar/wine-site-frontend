import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
// import { FavoritesContext } from "./context/FavoritesContext";

import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";



const Wines = () => {

    const baseUrl = process.env.REACT_APP_SERVER_URL;
    const { user } = useAuth0();
    const [allWines, setAllWines] = useState("");
    const { setFavorites, userId } = useContext(UserContext);
    // const {state, addToFavorites } = useContext(FavoritesContext);

    // console.log(favorites);
    // console.log(user);
    console.log(userId);


    let navigate = useNavigate();

    const addToFavorites = ( wine ) => {
        debugger
            fetch(`${baseUrl}/favorites`, {
                method: 'PATCH',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ updatedFavorite: wine, _id: JSON.parse(localStorage.getItem("userId"))._id, user: user })
            })
            .then(res => res.json())
            .then((data) => {
                setFavorites(data.data);
                // console.log(data.data);
            })
    }

    useEffect(() => {
        fetch(`${baseUrl}/wines`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setAllWines(data.data);
            })
            .catch(error => {
                console.log("get wines: " + baseUrl + "/wines")
            })
    }, []);



    return (

        <>
        <Title>WINES </Title>
        <Wrapper>
            {allWines.length > 0 ? (
                allWines.map((wine) => {
                    const handleClick = (e) => {
                        e.preventDefault();

                        navigate(`/wines/${wine._id}`);
                    }
                    return (
                        <Box key ={wine._id}>

                        <TextBox>
                        <p><WineName>{wine.name}</WineName>{wine.producer} $ {wine.price}</p>
                        </TextBox>
                        <Image src={require (`${wine.imageSrc}`)} alt={wine._id} />
                        <ButtonsBox>
                            <ul>
                        <Button onClick={handleClick}>View details</Button>
                        <> {user === undefined ? <></> :  <Button onClick={() => addToFavorites(wine)}>Add to favorites!</Button> }</>
                        </ul>
                        </ButtonsBox>

                    </Box>
                    )
                })
            )
                : (
                    <Wrapper>loading......</Wrapper>
                )}
                </Wrapper>
        </>

    )
};

const Title = styled.h2`
position: absolute;
top: 9px;
left: 340px;
margin: 0;
color: #082A63;
font-size: 16px;
text-decoration: underline;
`;

const Wrapper = styled.div`
    column-count: 3;
    margin-top: 80px;

    display: grid;
    grid-template-columns: 30vw 30vw 30vw;
    margin-left: 5vw;
`;

const WineName = styled.p`
    font-weight: bold;
`;

const TextBox = styled.span`
    text-align: center;
    display: inline;
`;

const Box = styled.div`
display: grid;
grid-template-columns: 30vw 30vw 30vw;
margin: 10px;
border: 1px solid black;
position: relative;
height: 500px;
`;


const Image = styled.img`
    width: 200px;
    height: auto;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
`;

const Button = styled.button`
text-decoration: none;
border: none;
padding: 10px;

height: 40px;
cursor: pointer;

&:hover {
    background-color: #ABAEE9;
}

`;

const ButtonsBox = styled.div`
position: absolute;
left: 68px;
top: 65px;
display: flex-wrap;
`;


export default Wines;
