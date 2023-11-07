import styled from "styled-components";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

{/*
const ghrepo = process.env.REACT_APP_GITHUB_REPO;
                      navigate(`{ ghrepo + /wines/${wine}}`);
*/}

const Home = () => {

    const baseUrl = process.env.REACT_APP_SERVER_URL;
    const [wines, setWines] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        fetch(`${baseUrl}/wines`)
            .then((res) => res.json())
            .then((data) => {
                {/* console.log(data.data); */}
                setWines(data.data);
            })
            .catch(error => {
                console.log(baseUrl);
              })
    }, []);


    return (

        <>
            {wines !== undefined ? (
                <Wrapper>
                    <ul key ={wines._id}></ul>
                    <SearchBar
                    wines={wines}
                    handleSelect={(wine) => {
                      console.log(wine);
                      navigate(`/wines/${wine}`);
                    }}
                    />


                </Wrapper>
            )
                : (
                    <Wrapper>loading......</Wrapper>
                )}
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
    text-align: center;
    margin-top: 20px;
`;



export default Home;
