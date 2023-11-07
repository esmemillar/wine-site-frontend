import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "./context/FavoritesContext";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import FavoritesDetails from "./FavoritesDetails";

import { useAuth0 } from "@auth0/auth0-react";

const Favorites = () => {

    const baseUrl = process.env.REACT_APP_SERVER_URL;
    const navigate = useNavigate();
    const params = useParams();
    const userId = params.userId;
    const { user } = useAuth0();

    let currentUser = window.localStorage.getItem("userId");


    const [favorites, setFavorites] = useState([])

    const [userNote, setUserNote] = useState("")
    // const [visible, setVisible] = useState(false);

    const fetchFavorites = () => {
        fetch(`${baseUrl}/favorites/${userId}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.data);
                setFavorites(data.data);
            })
            .catch(error => {
                console.log(error)
            })
        }

    const addNote = (userNote, favoriteId) => {
        // debugger
        fetch(`${baseUrl}/favorites/notes`, {
            method: 'PATCH',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ addNote: userNote, _id: JSON.parse(localStorage.getItem("userId"))._id, user: user, favoriteId })
        })
            .then(res => res.json())
            .then((data) => {
                setUserNote(data.data);
                // console.log(data.data);
            })
    }


    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

        setUserNote(value)

    };

    // const showNotesBox = () => {
    //     setVisible(current => !current);
    // };

    let justFavorites = favorites.favorites;
    console.log(justFavorites)

    return (
        <>
        <Wrapper>
        <FavoritesDetails fetchFavorites={fetchFavorites} favorites={favorites} setFavorites={setFavorites}/>
         {/* <Button onClick={showNotesBox}>Leave a note</Button>
                                    {visible && (
                                        <NotesBox>
                                            <Input
                                                type="text"
                                                placeholder=""
                                                name={"note"}
                                                required={false}
                                                onChange={handleChange}
                                            />
                                            <Submit onClick={() => addNote(userNote, wine._id)}>Submit note</Submit>
                                        </NotesBox>
                                    )}  */}
        </Wrapper>

            {/* <Wrapper> */}

                {/* <FavoritesDetails /> */}
                {/* {justFavorites !== undefined ? (
                    justFavorites.map((wine) => {
                        const handleClick = (e) => {
                            e.preventDefault();

                            navigate(`/wines/${wine._id}`);
                        }
                        const handleClickProducer = (e) => {
                            e.preventDefault();

                            navigate(`/producers/${wine.producerId}`)
                        }
                        return (
                            <Box key={wine._id}>
                            <TextBox>
                                <Name onClick={handleClickProducer}>{wine.producer}</Name>
                                <p>{wine.name}  ${wine.price}</p>
                            </TextBox>
                            <Image src={require(`${wine.imageSrc}`)} alt={wine._id} />
                            <ButtonsBox>
                                <Button onClick={handleClick}>View details</Button>
                                <Button onClick={showNotesBox}>Leave a note</Button>
                                <Button onClick={showNotesBox}>See notes</Button>

                                    <NotesBox>
                                        <Input
                                            type="text"
                                            placeholder=""
                                            name={"note"}
                                            required={false}
                                            onChange={handleChange}
                                        />
                                        <Submit onClick={() => addNote(userNote, wine._id)}>Submit note</Submit>
                                    </NotesBox>
                                    {visible && (
                                        <>{wine.userNotes}</>
                                        // wine.map((notes) => {
                                        //     <>{notes}</>
                                        // })
                                )}

                            </ButtonsBox>
                        </Box> */}

                        {/* )
                    })
                )
                    : (
                        <Wrapper>loading.....</Wrapper>
                    )}
            </Wrapper> */}
        </>

    )

};

const Wrapper = styled.div`
column-count: 3;
margin-top: 80px;

display: grid;
grid-template-columns: 30vw 30vw 30vw;
margin-left: 5vw;
`
const TextBox = styled.span`
    text-align: center;
    display: inline;
`;


const Producer = styled.p`
`;

const Name = styled.button`
text-decoration: none;
padding-top: 15px;
font-weight: bold;
font-size: 16px;
border: none;
background-color: transparent;

&:hover {
    color: #474C8C;
}
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

const NotesBox = styled.form`
`;

const Input = styled.input`
    border: none;
    position: absolute;
    background: pink;
`;

const ButtonsBox = styled.div`
position: absolute;
left: 115px;
top: 84px;
display: flex-wrap;

`;

const Submit = styled.button`
text-decoration: none;
border: none;
padding: 10px;

height: 40px;
cursor: pointer;

&:hover {
    background-color: #ABAEE9;
}

`

export default Favorites;
