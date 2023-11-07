import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";


const WineDetails = () => {
    const baseUrl = process.env.REACT_APP_SERVER_URL;
    const { user } = useAuth0();
    const [wine, setWine] = useState([]);
    const params = useParams();
    const wineId = params.wineId;
    const { setFavorites } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${baseUrl}/wines/${wineId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setWine(data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [wineId]);

        const handleClick = (e) => {
            e.preventDefault();
            navigate(`/producers/${wine.producerId}`);
        }

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
                    console.log(data.data);
                })
        }

    return (
        <Wrapper>
            {wine.length !== 0 ? (
                <>
                <Title>DETAILS</Title>
                <Wrapper>
                <Image src={require (`${wine.imageSrc}`)} alt={wine._id} />
                <Image2 src={require (`${wine.imageSrc}`)} alt={wine._id} />
                <Container>
                    <h3>{wine.name}</h3>
                    <Button onClick={handleClick}>{wine.producer}</Button>
                    <>
                    {user === undefined ? <></> :  <Button onClick={() => addToFavorites(wine)}>Add to favorites!</Button> }
                    </>

                    <p> $ {wine.price}</p>
                    <p><Bold>{wine.grapes}</Bold> from {wine.region}</p>
                    <p>{wine.category}</p>


                    <p>{wine.notes}</p>
                    <p>{wine.method}</p>

                    </Container>
                    {/* <Button onClick={handleClick}>{wine.producer}</Button> */}

                    {/* <Button onClick={() => addToFavorites(wine)}>Add to favorites!</Button> */}
                </Wrapper>
                </>
            )
                : (
                    <Wrapper>LOADING!</Wrapper>
                )}
        </Wrapper>

    )
};


const Wrapper = styled.div`

`;
const Image = styled.img`
    width: 200px;
    height: auto;
    margin: auto;
    position: absolute;
`;

const Image2 = styled.img`
    width: 200px;
    height: auto;
    margin: auto;
    position: absolute;
    right: 0;
`;

const Title = styled.h3`
position: absolute;
top: 9px;
left: 340px;
margin: 0;
color: #082A63;
font-size: 16px;
text-decoration: underline;
`;

const Button = styled.button`
    cursor: pointer;
    margin: 15px;
    padding: 10px;
    border: none;

&:hover {
    background-color: #ABAEE9;
}
`;

const Bold = styled.span`
    font-weight: bold;
`;

const Container = styled.div`
width: 50vw;
text-align: justify;
text-justify: inter-word;
border: 1px solid grey;
padding: 10px;
margin: auto;
background-color: #F5F5F5;
text-align: center;
`;

export default WineDetails;
