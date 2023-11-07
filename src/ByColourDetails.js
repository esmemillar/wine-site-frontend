import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";




// TO DO - FINISH THIS COMPONENT - ADD ENDPOINTS    
const ByColourDetails = () => {
    const [allWines, setAllWines] = useState("");
    
    let navigate = useNavigate();

    useEffect(() => {
        fetch("/wines")
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data);
                setAllWines(data.data);
            })
            .catch(error => {
                console.log("error")
            })
    }, []);

    // const wine = allWines.map((wine) => {
    //             return {
    //                 name: wine.name, 
    //                 _id: wine._id, 
    //                 grapes: wine.grapes, 
    //                 year: wine.year, 
    //                 producer: wine.producer, 
    //                 category: wine.category,
    //                 notes: wine.notes,
    //                 region: wine.region, 
    //                 method: wine.method
    //             }
    //         });

    return (

        <>
        <h1>Browse by color </h1>
        <Wrapper>
            {allWines.length > 0 ? (
                allWines.map((wine) => {
                    return (
                        <ul key ={wine._id}>{wine.category}
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



export default ByColourDetails;