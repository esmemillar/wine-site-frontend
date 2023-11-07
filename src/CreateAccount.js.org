import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from "./context/FavoritesContext";

// const { v4: uuidv4, v4 } = require("uuid");


const CreateAccount = ({ setUserId }) => {

    const [userInfo, setUserInfo] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const {state} = useContext(FavoritesContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;

       
        if (value.length === 0){
        
            let newUserInfo = {...userInfo};
            delete newUserInfo[key]
            setUserInfo({
                ...newUserInfo
            })
        } else {
          
            setUserInfo({
                ...userInfo,
                [key]: value
            })
        }
    };


        // const dataBody = {...userInfo};

        const verifyUserInfo = () => {
            if (userInfo.firstName === undefined) {
                throw new Error("Please enter your name")
            } else if(userInfo.lastName === undefined) {
                throw new Error ("Please enter your last name!") 
            } else if (userInfo.email === undefined) {
                throw new Error ("Please enter a valid email address") 
            } else if (userInfo.password !== userInfo.passwordConfirm) {
                throw new Error ("Passwords do not match :(")
            } else {
                setErrorMessage("");
            }
        };


        const handleSubmit = async (e) => {
            e.preventDefault();

            //keep this favorites array 
            const dataBody = {...userInfo, favorites: []}
    
        try {
            await verifyUserInfo();

            const res = await fetch('/signup/create', {
                method: 'POST', 
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({  ...dataBody })
            })
                .then(res => res.json())
                .then((data) => {
                    console.log("new account created")
                    console.log(data.data._id);
                    // window.localStorage.setItem("userId", JSON.stringify(data.data));
                    // setUserId(data.data.insertedId);
                    navigate("/login");
                })

            const data = await res.json()

            navigate("/");

        } catch (err) {
            setErrorMessage(err.message);
        }
    };

        return (
            <Wrapper>
                <div>
                <PageTitle>Create account</PageTitle>
                <Container>
                    <StyledForm onSubmit={(e) => handleSubmit(e)}>
                        <TitleLabel>Create your account</TitleLabel>
                            <Input 
                                type="text" 
                                placeholder="First name"
                                name={"firstName"}
                                required={true}
                                onChange={handleChange} 
                            />
    
                            <Input 
                                type="text" 
                                placeholder="Last name"
                                name={"lastName"}
                                required={true}
                                onChange={handleChange} 
                            />
    
    
                            <Input 
                                type="email" 
                                placeholder="Email"
                                name="email"
                                required={true}
                                onChange={handleChange} 
                            />

                            <Input 
                                type="password" 
                                placeholder="Password"
                                name="password"
                                required={true}
                                onChange={handleChange} 
                            />

                            <Input 
                                type="password" 
                                placeholder="Confirm password"
                                name="passwordConfirm"
                                required={true}
                                onChange={handleChange} 
                            />
                
                        <ButtonContainer>
                            <Submit type="submit">Create account!</Submit>
                            {/* <Submit type="submit" disabled={Object.keys(userInfo).length < 12}>Create account!</Submit> */}
                        </ButtonContainer>
                    </StyledForm>
                    {errorMessage.length > 0 &&
                        <ErrorContainer>
                            <ErrorMessage>Error: {errorMessage}</ErrorMessage>
                        </ErrorContainer>
                    }
                </Container>
                </div>

            </Wrapper>
        )
    };
    
    const Wrapper = styled.div`
        display: flex;
        justify-content: center;
        /* align-items: center; */
        margin: auto;
        width: 80vw;
        gap: 50px;
        flex-wrap: wrap;
    `
    
    const Container = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: auto;
        width: 45vw;
        background: white;
        padding: 50px 0 20px 0;
        box-shadow: 0px 0px 5px 1px lightgrey;
    `
    
    const Input = styled.input`
        width: auto;
        height: 25px;
        display: flex;
        /* flex: 1; */
    `


    const PageTitle = styled.h1`
        margin-bottom: 5px;
    `
    
    const Submit = styled.button`
        width: 100%;
        margin: 10px 0;
        background-color: darkblue;
        color: white;
        border: none;
        cursor: pointer;
    
        &:hover{
            background-color: lightblue;
            color: inherit;
        }
    
        &:disabled{
            background-color: darkgrey;
            border: none;
            color: white;
            cursor: default;
        }
    `
    
    const ButtonContainer = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
    `
    
    const StyledForm = styled.form`
        display: flex;
        gap: 20px;
        flex-direction: column;
        margin: 0;
        width: 80%;
        height: auto;
    `
    
    const TitleLabel = styled.label`
        font-size: 1.3em;
        font-weight: bold;
    `

    
    const ErrorContainer = styled.div`
        display: flex;
        border: 2px solid darkred;
        width: 80%;
        margin-top: 10px;
        margin-bottom: 0;
        height: 50px;
    `
    
    const ErrorMessage = styled.p`
        padding-left: 10px;
        color: darkred;
    `


export default CreateAccount;