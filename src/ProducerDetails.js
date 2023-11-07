import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProducerDetails = () => {
    // const [producerDetail, setProducerDetail] = useState([]);
    // const baseUrl = process.env.REACT_APP_SERVER_URL;
    const [producer, setProducer] = useState([]);
    const [wines, setWines] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const producerId = params.producerId;

    const handleClick = (e, matchingWine) => {
        navigate(`/wines/${matchingWine._id}`)
    };


    useEffect(() => {
        fetch(`/producers/${producerId}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setProducer(data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [producerId]);

    useEffect(() => {
        fetch("/wines")
            .then((res) => res.json())
            .then((data) => {
                setWines(data.data);
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    console.log(producer);
    const producerDetailId = producer._id;

    const matchingWines = [];
    for (let i = 0; i < wines.length; i++) {
        if (wines[i].producerId === producerDetailId) {
            matchingWines.push(wines[i]);
        }
    }

    console.log(producer);

    return (
        <Wrapper>
            {producer !== undefined ? (
                <Wrapper>
                    <Title>DETAILS</Title>
                    <Wrapper>
                        <ProducerInfo>
                            <h3>{producer.name}</h3>
                            <h3>{producer.region}</h3>
                            <Container>
                                <p>{producer.bio}</p>
                            </Container>
                        </ProducerInfo>

                    </Wrapper>

                    <Wrapper>
                        <WinesBox>

                        {matchingWines.length > 0 ? (
                            matchingWines.map((matchingWine) => {
                                return <Wrapper key={matchingWine._id}>
                                    <WinesBox>
                                    <Box>
                                        <TextBox>
                                            <p><WineName>{matchingWine.name}</WineName> {matchingWine.grapes} </p>
                                            <ButtonsBox>
                                            <Button onClick={(e) => handleClick(e, matchingWine)}>View details</Button>
                                            </ButtonsBox>
                                        </TextBox>
                                        <Image src={require(`${matchingWine.imageSrc}`)} alt={matchingWine._id} />
                                    </Box>
                                    </WinesBox>
                                </Wrapper>

                            })
                        )
                            : (
                                <Wrapper>LOOOOOOADING!!!!!!!</Wrapper>
                            )}
                            </WinesBox>
                    </Wrapper>


                </Wrapper>
            )
                : (
                    <Wrapper>LOOOOOOADING!!!!!!!</Wrapper>
                )}
        </Wrapper>

    )
};

const Wrapper = styled.div`
    align-items: center;

`;

const Title = styled.h2`
position: absolute;
top: 9px;
left: 340px;
margin: 0;
color: #082A63;
font-size: 16px;
text-decoration: underline;
`;

const ProducerInfo = styled.div`
width: 90vw;
text-align: justify;
text-justify: inter-word;
border: 1px solid grey;
padding: 10px;
margin: auto;
background-color: #F5F5F5;
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
width: 100px;
margin-top: 30px;
margin: 10px;
height: 40px;

cursor: pointer;


&:active {
    color: #F61BF3;
}

&:hover {
    color: hot-pink;
}

`;

const ButtonsBox = styled.div`
position: absolute;
left: 160px;
top: 80px;
display: flex-wrap;

`;

const TextBox = styled.span`
    text-align: center;
    display: inline;
`;

const WineName = styled.p`
    font-weight: bold;
`;

const WinesBox = styled.div`
column-count: 3;

display: flex;
grid-template-columns: 30vw 30vw 30vw;
justify-content: center;
`;

const Box = styled.div`
display: grid;
margin: 10px;
text-align: left;
border: 1px solid black;
position: relative;
width: 30vw;
height: 500px;
`;

const Container = styled.div`
    width: 90vw;
    text-align: justify;
    text-justify: inter-word;
`;

export default ProducerDetails;
