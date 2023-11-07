import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "./context/FavoritesContext";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

const Favorites = ({fetchFavorites, favorites, setFavorites}) => {

    const baseUrl = process.env.REACT_APP_SERVER_URL;

    const navigate = useNavigate();
    const params = useParams();
    const userId = params.userId;
    const { user } = useAuth0();

    let currentUser = window.localStorage.getItem("userId");

    const [userNote, setUserNote] = useState("")
    const [visible, setVisible] = useState(false);
    const [visibleNotes, setVisibleNotes] = useState(false);
    const [visibilityId, setVisibilityId] = useState("");
    const [seeNotesVisibilityId, setSeeNotesVisibilityId] = useState("");


    useEffect(() => {
        fetchFavorites();
        // fetch(`/favorites/${userId}`)
        //     .then((res) => res.json())
        //     .then((data) => {
        //         // console.log(data.data);
        //         setFavorites(data.data);
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }, [userId]);

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

    const showNotesBox = (e) => {
        e.stopPropagation();
        setVisibleNotes(false);
        setVisible(current => !current);
        setVisibilityId(e.currentTarget.id);
    };
    const showUserNotes = (e) => {
        e.stopPropagation();
        setVisible(false);
        setVisibleNotes(current => !current);
        setSeeNotesVisibilityId(e.currentTarget.id);
    };

    let justFavorites = favorites.favorites;
    console.log(justFavorites)

    return (
        <>

            <>
                {justFavorites !== undefined ? (
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
                                    <p>{wine.name}  $ {wine.price}</p>
                                </TextBox>
                                <Image src={require(`${wine.imageSrc}`)} alt={wine._id} />
                                <ButtonsBox>
                                    <Button onClick={handleClick}>View details</Button>
                                    <Button id={wine._id} onClick={showUserNotes}>See notes</Button>
                                    {visibleNotes && seeNotesVisibilityId === `${wine._id}` && visible === false && (
                                     <UserNotes>{wine.userNotes}</UserNotes>
                                    )}
                                {/* </ButtonsBox> */}
                                    <Button id={wine._id} onClick={showNotesBox}>Leave a note</Button>
                                    {visible && visibilityId === `${wine._id}` && visibleNotes === false && (
                                        <NotesContainer>
                                        <NotesBox>
                                            <Input
                                                type="text"
                                                placeholder=""
                                                name={wine._id}
                                                required={false}
                                                onChange={handleChange}
                                            />
                                            <Submit onClick={() => addNote(userNote, wine._id)}>Submit note</Submit>
                                        </NotesBox>
                                        </NotesContainer>
                                    )}
                                    {/* <Button id={wine._id} onClick={showUserNotes}>See notes</Button>
                                    {visibleNotes && seeNotesVisibilityId === `${wine._id}` && visible === false && (
                                     <UserNotes>{wine.userNotes}</UserNotes>
                                    )} */}
                                </ButtonsBox>


                            </Box>
                        )
                    })
                )
                    : (
                        <Wrapper>loading.....</Wrapper>
                    )}
            </>
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
border: none;
background-color: transparent;
text-decoration: none;
padding: 10px;
font-weight: bold;
color: #082A63;

&:active {
    color: #474C8C;
    text-decoration: underline;
}

&:hover {
    color: #474C8C;
}

`;

const NotesBox = styled.form`
border: none;
top: 130px;
left: -65px;
width: 400px;
height: 100px;
position: absolute;
z-index: 40;
background: #F5F5F5;
text-align: center;
padding-top: 20px;
border: 1px solid black;
`;

const UserNotes = styled.div`
border: none;
top: 80px;
left: -65px;
width: 400px;
height: 150px;
position: absolute;
z-index: 40;
background: #F5F5F5;
text-align: center;
padding-top: 20px;
border: 1px solid black;
`;

const NotesContainer = styled.div`

`;

const Input = styled.input`
    border: none;
    top: -49px;
    left: -5px;
    width: 400px;
    height: 163px;
    position: absolute;
    z-index: 40;
    background: #F5F5F5;
    border: 3px solid pink;
`;

const ButtonsBox = styled.div`
position: absolute;
left: 70px;
top: 84px;
display: flex-wrap;

`;

const Submit = styled.button`
text-decoration: none;
border: none;
padding: 10px;
width: 200px;
height: 40px;
position: absolute;
top: 180px;
left: 100px;
border: 2px solid pink;


cursor: pointer;


&:active {
    color: #F61BF3;
}

&:hover {
    color: hot-pink;
}


`

export default Favorites;
