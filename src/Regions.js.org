import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const Regions = () => {
    const [wines, setWines] = useState([]);
    const params = useParams();
    const region = params.region;
    
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`/regions/${region}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setWines(data.data);
            })
            .catch(error => {
                console.log("error")
            })
    }, []);

    console.log(wines);
    
    return (


        <>
        <h1>Browse by regions </h1>
        <Wrapper>
            {wines !== undefined ? (
                wines.map((wine) => {
               
                    return (
                        <ul key ={wine._id}>{wine.region}</ul>
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



export default Regions;