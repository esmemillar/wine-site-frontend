import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";





const Producers = () => {
    const baseUrl = process.env.REACT_APP_SERVER_URL;
    const [allProducers, setAllProducers] = useState("");


    let navigate = useNavigate();

    useEffect(() => {
        fetch(`${baseUrl}/producers`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setAllProducers(data.data);
            })
            .catch(error => {
                console.log("error")
            })
    }, []);

    return (

        <>
        <Title>PRODUCERS </Title>
        <Wrapper>
            {allProducers.length > 0 ? (
                allProducers.map((producer) => {
                    const handleClick = (e) => {
                        e.preventDefault();

                        navigate(`/producers/${producer._id}`);
                    }
                    // const regionHandleClick = (e) => {
                    //     e.preventDefault();

                    //     navigate(`/regions/${producer.region}`);
                    // }
                    return (
                        <ul key ={producer._id}>
                        <Container>
                        <Button onClick={handleClick}>{producer.name} {producer.region}</Button>

                        <p>{producer.bio}</p>
                        </Container>

                    </ul>
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


const Wrapper = styled.div`
    align-items: center;
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

const Container = styled.div`
    width: 90vw;
    text-align: justify;
    text-justify: inter-word;
    border: 1px solid grey;
    padding: 10px;
    margin: auto;
    background-color: #F5F5F5;
`;

const Button = styled.button`
text-decoration: none;
background: transparent;
border: none;
margin-top: 30px;

height: 40px;
font-size: 25px;
font-weight: bold;

cursor: pointer;


&:active {
    color: #F61BF3;
}

&:hover {
    color: #F61BF3;
}
`;




export default Producers;
